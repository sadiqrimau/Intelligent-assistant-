-- ============================================================
-- MIGRATION: Fix vector dimension from 1536 → 768
-- Gemini gemini-embedding-001 outputs 768-dim vectors.
-- Run this in Supabase SQL Editor BEFORE running populate-embeddings.js
-- ============================================================

-- 1. Drop the old index
DROP INDEX IF EXISTS document_embeddings_ivfflat_idx;

-- 2. Drop and recreate table with correct dimension
--    Safe now — no embeddings inserted yet
DROP TABLE IF EXISTS document_embeddings;

CREATE TABLE document_embeddings (
  id          UUID    DEFAULT gen_random_uuid() PRIMARY KEY,
  document_id UUID    NOT NULL REFERENCES knowledge_documents(id) ON DELETE CASCADE,
  embedding   vector(768) NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Recreate index for fast cosine search
CREATE INDEX document_embeddings_ivfflat_idx
  ON document_embeddings
  USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 10);

-- 4. Recreate match_documents with correct dimension
DROP FUNCTION IF EXISTS match_documents(vector(1536), float, int, text);

CREATE OR REPLACE FUNCTION match_documents (
  query_embedding vector(768),
  match_threshold FLOAT DEFAULT 0.5,
  match_count     INT   DEFAULT 3,
  filter_dept     TEXT  DEFAULT NULL
)
RETURNS TABLE (
  id         UUID,
  title      TEXT,
  content    TEXT,
  department TEXT,
  category   TEXT,
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    kd.id,
    kd.title,
    kd.content,
    kd.department,
    kd.category,
    1 - (de.embedding <=> query_embedding) AS similarity
  FROM document_embeddings de
  JOIN knowledge_documents kd ON kd.id = de.document_id
  WHERE
    kd.is_active = TRUE
    AND (filter_dept IS NULL OR kd.department = filter_dept)
    AND 1 - (de.embedding <=> query_embedding) > match_threshold
  ORDER BY de.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

SELECT 'Migration complete — document_embeddings now uses vector(768)' AS status;
