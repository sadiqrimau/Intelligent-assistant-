-- ============================================================
-- Al-Hikmah Intelligent Assistant — Supabase Schema
-- Run this entire file in the Supabase SQL Editor
-- ============================================================

-- 1. Enable pgvector extension (required for semantic search)
CREATE EXTENSION IF NOT EXISTS vector;


-- ============================================================
-- 2. KNOWLEDGE BASE DOCUMENTS
--    Stores all verified university information as text chunks.
--    Each row is one retrievable piece of knowledge.
-- ============================================================
CREATE TABLE IF NOT EXISTS knowledge_documents (
  id                      UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  department              TEXT        NOT NULL,  -- 'student_affairs' | 'registry' | 'bursary' | 'general'
  category                TEXT        NOT NULL,  -- 'fees' | 'deadlines' | 'procedures' | 'documents' | 'contacts' | 'programs'
  content_type            TEXT        NOT NULL,  -- 'factual' | 'procedural' | 'template' | 'contact'
  title                   TEXT        NOT NULL,
  content                 TEXT        NOT NULL,  -- the actual knowledge text
  source_document         TEXT,                  -- e.g. "Student Handbook 2024"
  effective_date          DATE,
  representative_questions TEXT[],               -- sample questions this entry answers
  metadata                JSONB       DEFAULT '{}',
  is_active               BOOLEAN     DEFAULT TRUE,
  created_at              TIMESTAMPTZ DEFAULT NOW(),
  updated_at              TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================================
-- 3. DOCUMENT EMBEDDINGS
--    Stores the vector embedding for each knowledge document.
--    Used for semantic similarity search via pgvector.
--    Dimension 1536 = OpenAI text-embedding-ada-002 compatible.
-- ============================================================
CREATE TABLE IF NOT EXISTS document_embeddings (
  id          UUID    DEFAULT gen_random_uuid() PRIMARY KEY,
  document_id UUID    NOT NULL REFERENCES knowledge_documents(id) ON DELETE CASCADE,
  embedding   vector(1536) NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast cosine similarity search
CREATE INDEX IF NOT EXISTS document_embeddings_ivfflat_idx
  ON document_embeddings
  USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);


-- ============================================================
-- 4. SEMANTIC SEARCH FUNCTION
--    Called by n8n to retrieve the top-k most relevant docs
--    for a given query embedding.
-- ============================================================
CREATE OR REPLACE FUNCTION match_documents (
  query_embedding vector(1536),
  match_threshold FLOAT DEFAULT 0.7,
  match_count     INT   DEFAULT 5,
  filter_dept     TEXT  DEFAULT NULL
)
RETURNS TABLE (
  id        UUID,
  title     TEXT,
  content   TEXT,
  department TEXT,
  category  TEXT,
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


-- ============================================================
-- 5. CONVERSATION LOGS
--    Every message in and out is logged here.
--    session_id ties a conversation together (set by frontend).
-- ============================================================
CREATE TABLE IF NOT EXISTS conversation_logs (
  id                     UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id             TEXT        NOT NULL,
  role                   TEXT        NOT NULL CHECK (role IN ('user', 'assistant')),
  content                TEXT        NOT NULL,
  department_classified  TEXT,                  -- which dept n8n classified this query to
  retrieved_doc_ids      UUID[],                -- which knowledge docs were used
  tokens_used            INT,
  escalated              BOOLEAN     DEFAULT FALSE,
  created_at             TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS conversation_logs_session_idx
  ON conversation_logs (session_id, created_at);


-- ============================================================
-- 6. LETTER TEMPLATES
--    Structured templates for each type of formal letter.
--    Used by the letter-writing assistant.
-- ============================================================
CREATE TABLE IF NOT EXISTS letter_templates (
  id                  UUID  DEFAULT gen_random_uuid() PRIMARY KEY,
  request_type        TEXT  NOT NULL UNIQUE, -- 'leave_of_absence' | 'transcript_request' | 'deferral' | 'attestation' | 'good_standing'
  display_name        TEXT  NOT NULL,        -- human-readable: "Leave of Absence"
  recipient_office    TEXT  NOT NULL,
  recipient_title     TEXT  NOT NULL,
  required_fields     JSONB NOT NULL,        -- [{ "key": "matric_no", "label": "Matric Number", "type": "text" }]
  template_structure  TEXT  NOT NULL,        -- letter body with {{placeholder}} slots
  validation_criteria JSONB DEFAULT '[]',
  is_active           BOOLEAN DEFAULT TRUE,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================================
-- 7. LETTER REQUESTS
--    Each time a student generates a letter, it's stored here.
-- ============================================================
CREATE TABLE IF NOT EXISTS letter_requests (
  id               UUID  DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id       TEXT,
  template_id      UUID  REFERENCES letter_templates(id),
  request_type     TEXT  NOT NULL,
  student_data     JSONB NOT NULL,   -- the filled-in field values
  generated_letter TEXT  NOT NULL,   -- final rendered letter text
  status           TEXT  DEFAULT 'draft' CHECK (status IN ('draft', 'finalized', 'submitted')),
  created_at       TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================================
-- 8. SEED — Letter Templates (initial data)
-- ============================================================
INSERT INTO letter_templates (request_type, display_name, recipient_office, recipient_title, required_fields, template_structure) VALUES

('leave_of_absence',
 'Leave of Absence',
 'Student Affairs Division',
 'Dean of Student Affairs',
 '[
   {"key":"student_name","label":"Full Name","type":"text"},
   {"key":"matric_no","label":"Matric Number","type":"text"},
   {"key":"department","label":"Department","type":"text"},
   {"key":"level","label":"Current Level","type":"text"},
   {"key":"reason","label":"Reason for Leave","type":"textarea"},
   {"key":"start_date","label":"Leave Start Date","type":"date"},
   {"key":"end_date","label":"Expected Return Date","type":"date"}
 ]',
 'Dear {{recipient_title}},

RE: APPLICATION FOR LEAVE OF ABSENCE

I, {{student_name}}, a {{level}}-level student in the Department of {{department}} with Matric Number {{matric_no}}, write to respectfully apply for a leave of absence from {{start_date}} to {{end_date}}.

The reason for this request is as follows:

{{reason}}

I assure you that I will resume my studies promptly upon the expiration of the requested leave period. I trust that my application will receive your kind consideration.

Yours faithfully,
{{student_name}}
{{matric_no}}
{{department}}'
),

('transcript_request',
 'Transcript Request',
 'Registry',
 'Registrar',
 '[
   {"key":"student_name","label":"Full Name","type":"text"},
   {"key":"matric_no","label":"Matric Number","type":"text"},
   {"key":"department","label":"Department","type":"text"},
   {"key":"graduation_year","label":"Year of Graduation / Current Level","type":"text"},
   {"key":"purpose","label":"Purpose of Transcript","type":"text"},
   {"key":"destination","label":"Destination Institution / Organisation","type":"text"},
   {"key":"copies","label":"Number of Copies Required","type":"number"}
 ]',
 'Dear {{recipient_title}},

RE: REQUEST FOR OFFICIAL ACADEMIC TRANSCRIPT

I, {{student_name}}, a student of Al-Hikmah University with Matric Number {{matric_no}}, Department of {{department}} ({{graduation_year}}), write to formally request {{copies}} official academic transcript(s).

The transcript(s) are required for the purpose of {{purpose}}, to be sent to {{destination}}.

I have attached the required payment receipt and consent form as specified by the Registry. I kindly request that this be processed at your earliest convenience.

Yours faithfully,
{{student_name}}
{{matric_no}}
{{department}}'
),

('attestation',
 'Attestation Letter',
 'Registry',
 'Registrar',
 '[
   {"key":"student_name","label":"Full Name","type":"text"},
   {"key":"matric_no","label":"Matric Number","type":"text"},
   {"key":"department","label":"Department","type":"text"},
   {"key":"level","label":"Current Level","type":"text"},
   {"key":"purpose","label":"Purpose of Attestation","type":"text"}
 ]',
 'Dear {{recipient_title}},

RE: REQUEST FOR ATTESTATION LETTER

I, {{student_name}}, a {{level}}-level student in the Department of {{department}} with Matric Number {{matric_no}}, respectfully request an attestation letter confirming my studentship at Al-Hikmah University.

This letter is required for the purpose of {{purpose}}.

I would be grateful if this request could be processed promptly.

Yours faithfully,
{{student_name}}
{{matric_no}}
{{department}}'
),

('good_standing',
 'Letter of Good Standing',
 'Registry',
 'Registrar',
 '[
   {"key":"student_name","label":"Full Name","type":"text"},
   {"key":"matric_no","label":"Matric Number","type":"text"},
   {"key":"department","label":"Department","type":"text"},
   {"key":"level","label":"Current Level","type":"text"},
   {"key":"destination","label":"Destination Institution","type":"text"},
   {"key":"purpose","label":"Purpose","type":"text"}
 ]',
 'Dear {{recipient_title}},

RE: REQUEST FOR LETTER OF GOOD STANDING

I, {{student_name}}, currently enrolled as a {{level}}-level student in the Department of {{department}} with Matric Number {{matric_no}}, hereby request a letter of good standing from Al-Hikmah University.

This letter is required by {{destination}} for the purpose of {{purpose}}.

I confirm that I have no outstanding disciplinary issues and am in good academic standing.

Yours faithfully,
{{student_name}}
{{matric_no}}
{{department}}'
)

ON CONFLICT (request_type) DO NOTHING;


-- ============================================================
-- 9. SEED — Sample Knowledge Documents
--    Add your real content later; these are starter entries.
-- ============================================================
INSERT INTO knowledge_documents (department, category, content_type, title, content, representative_questions) VALUES

('bursary', 'fees', 'factual',
 'Undergraduate Fee Structure',
 'Sciences and Engineering fresh students pay between ₦350,000 and ₦450,000 per session. Returning Sciences and Engineering students pay ₦280,000 to ₦380,000. Arts and Social Sciences fresh students pay ₦250,000 to ₦350,000, while returning students pay ₦200,000 to ₦280,000. Postgraduate programs cost ₦400,000 to ₦600,000 for all categories. Fees are subject to annual review.',
 ARRAY['How much are the school fees?', 'What is the fee for sciences?', 'How much do I pay as a fresh student?']),

('bursary', 'deadlines', 'factual',
 'Fee Payment Deadlines',
 'School fees are due at the start of each semester. First semester fees must be paid before registration. Second semester fees are due before mid-semester. The regular deadline is 2 weeks after resumption. Late payment with penalty is allowed up to 4 weeks after resumption. The penalty is ₦10,000 for the first week and ₦5,000 for each additional week.',
 ARRAY['When is the deadline for fee payment?', 'What happens if I pay late?', 'Is there a penalty for late payment?']),

('bursary', 'procedures', 'procedural',
 'Payment Methods',
 'The university accepts bank transfer to designated university accounts, online payment through the student portal using debit or credit cards, bank drafts in favour of Al-Hikmah University, and POS payment available at the Bursary office during working hours. Always use your matriculation number as the payment reference. Keep your payment receipt as it is required for registration.',
 ARRAY['How can I pay my fees?', 'Can I pay online?', 'What payment methods are accepted?']),

('registry', 'procedures', 'procedural',
 'Undergraduate Admission Requirements',
 'Candidates must have a minimum of five O''Level credits including English Language and Mathematics in WAEC, NECO, or equivalent. A valid JAMB UTME result with Al-Hikmah University as first choice is required. Candidates must complete the Post-UTME screening exercise and meet specific departmental requirements. Original and photocopies of relevant certificates must be submitted.',
 ARRAY['What are the admission requirements?', 'How do I apply for admission?', 'What O''level subjects do I need?']),

('registry', 'procedures', 'procedural',
 'Course Registration Steps',
 'Course registration is done at the beginning of each semester through the student portal. Step 1: Login to the student portal with your credentials. Step 2: Complete fee payment or confirm payment status. Step 3: Select courses for the current semester. Step 4: Submit course form for departmental approval. Step 5: Print the approved course registration form. Step 6: Submit a copy to your department. Late registration attracts a penalty fee.',
 ARRAY['How do I register my courses?', 'What is the course registration process?', 'Can I register late?']),

('registry', 'documents', 'procedural',
 'Transcript Request Process',
 'Transcript requests are made at the Registry Office. Complete the transcript request form, pay the applicable fee at the Bursary, and submit your receipt to the Registry. Processing takes 2–3 weeks for local requests and 3–4 weeks for international requests. Available documents include official academic transcripts, statements of result, original degree certificates (collected in person), letters of good standing, and attestation letters.',
 ARRAY['How do I request my transcript?', 'How long does transcript processing take?', 'How much does a transcript cost?']),

('student_affairs', 'procedures', 'factual',
 'Campus Policies',
 'Students must dress modestly and appropriately at all times on campus. A minimum 75% attendance is required for all courses. Students must carry their ID cards at all times on campus. Hostel residents must observe curfew times as outlined in the Student Handbook. Violation of campus policies may result in disciplinary action.',
 ARRAY['What is the dress code?', 'What is the attendance requirement?', 'What are the campus rules?']),

('general', 'contacts', 'contact',
 'Key Department Contacts',
 'Registry: Extension 101, registry@alhikmah.edu.ng. Bursary: Extension 102, bursary@alhikmah.edu.ng. Student Affairs: Extension 103. ICT Support: Extension 104, ict@alhikmah.edu.ng. Library: Extension 105. Main office: info@alhikmah.edu.ng, +234 (0) 803 123 4567. Office hours are Monday to Friday 8:00 AM to 5:00 PM, Saturday 9:00 AM to 1:00 PM.',
 ARRAY['How do I contact the registry?', 'What is the bursary phone number?', 'How do I reach ICT support?'])

ON CONFLICT DO NOTHING;
