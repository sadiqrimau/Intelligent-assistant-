/**
 * populate-embeddings.js
 * Fetches all knowledge_documents from Supabase, generates a 768-dim
 * Gemini embedding for each one, and inserts into document_embeddings.
 *
 * Run ONCE after migrate-to-768.sql:
 *   node populate-embeddings.js
 */

const SUPABASE_URL      = "https://gwhogvzmkdbfrqljldsf.supabase.co";
const SUPABASE_SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3aG9ndnpta2RiZnJxbGpsZHNmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjIzNDgwMCwiZXhwIjoyMDkxODEwODAwfQ.G2PUlAOYxWKH7MVdIsOPzjFnEJa_d9o1UxaCgN1pUTQ";
const GEMINI_API_KEY    = "AIzaSyAcg23CSOb_1jBrcc_20HEwZHbsNy5u75g";
const GEMINI_EMBED_URL  = `https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent?key=${GEMINI_API_KEY}`;

async function supabaseGet(path) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: {
      "apikey": SUPABASE_SERVICE_KEY,
      "Authorization": `Bearer ${SUPABASE_SERVICE_KEY}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error(`Supabase GET failed: ${res.status} ${await res.text()}`);
  return res.json();
}

async function supabasePost(path, body) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    method: "POST",
    headers: {
      "apikey": SUPABASE_SERVICE_KEY,
      "Authorization": `Bearer ${SUPABASE_SERVICE_KEY}`,
      "Content-Type": "application/json",
      "Prefer": "return=minimal",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Supabase POST failed: ${res.status} ${await res.text()}`);
}

async function getEmbedding(text) {
  const res = await fetch(GEMINI_EMBED_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "models/gemini-embedding-001",
      content: { parts: [{ text }] },
      outputDimensionality: 768,
    }),
  });
  if (!res.ok) throw new Error(`Gemini embed failed: ${res.status} ${await res.text()}`);
  const data = await res.json();
  return data.embedding.values;
}

async function main() {
  console.log("Fetching knowledge documents...");
  const docs = await supabaseGet("knowledge_documents?is_active=eq.true&select=id,title,content");
  console.log(`Found ${docs.length} documents.\n`);

  for (const doc of docs) {
    process.stdout.write(`  Embedding: "${doc.title}" ... `);
    try {
      // Combine title + content for richer embedding
      const text = `${doc.title}\n\n${doc.content}`;
      const embedding = await getEmbedding(text);

      await supabasePost("document_embeddings", {
        document_id: doc.id,
        embedding: `[${embedding.join(",")}]`,
      });

      console.log("done");
    } catch (err) {
      console.log(`FAILED — ${err.message}`);
    }

    // Small delay to avoid rate-limiting
    await new Promise(r => setTimeout(r, 300));
  }

  console.log("\nAll done! Knowledge base is ready.");
}

main().catch(err => {
  console.error("Fatal error:", err.message);
  process.exit(1);
});
