/**
 * populate-embeddings.js
 * Fetches all knowledge_documents from Supabase, generates a 768-dim
 * Gemini embedding for each one, and inserts into document_embeddings.
 *
 * Run ONCE after migrate-to-768.sql:
 *   node populate-embeddings.js
 *
 * Reads credentials from .env in the project root.
 */

const fs = require("fs");
const path = require("path");

// Read .env manually (no extra dependencies needed)
function loadEnv() {
  const envPath = path.join(__dirname, ".env");
  if (!fs.existsSync(envPath)) throw new Error(".env file not found");
  const lines = fs.readFileSync(envPath, "utf-8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const [key, ...rest] = trimmed.split("=");
    if (key && rest.length) process.env[key.trim()] = rest.join("=").trim();
  }
}

loadEnv();

const SUPABASE_URL       = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const GEMINI_API_KEY     = process.env.VITE_GEMINI_API_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY || !GEMINI_API_KEY) {
  console.error("Missing required env vars. Check your .env file.");
  process.exit(1);
}

const GEMINI_EMBED_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent?key=${GEMINI_API_KEY}`;

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

    await new Promise(r => setTimeout(r, 300));
  }

  console.log("\nAll done! Knowledge base is ready.");
}

main().catch(err => {
  console.error("Fatal error:", err.message);
  process.exit(1);
});
