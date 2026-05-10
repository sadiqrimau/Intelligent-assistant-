import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/lib/supabase";
import {
  FileText, ChevronRight, ChevronLeft, Copy, Check,
  GraduationCap, BookOpen, Award, ClipboardList, PlusCircle, PenLine
} from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────

interface FieldDef {
  key: string;
  label: string;
  type: "text" | "textarea" | "date" | "number";
}

interface Template {
  id: string;
  request_type: string;
  display_name: string;
  recipient_office: string;
  recipient_title: string;
  required_fields: FieldDef[];
  template_structure: string;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

const ICONS: Record<string, React.ReactNode> = {
  leave_of_absence: <GraduationCap className="w-6 h-6" />,
  transcript_request: <BookOpen className="w-6 h-6" />,
  attestation: <ClipboardList className="w-6 h-6" />,
  good_standing: <Award className="w-6 h-6" />,
  extra_credit_request: <PlusCircle className="w-6 h-6" />,
  supplementary_exam_request: <PenLine className="w-6 h-6" />,
};

const DESCRIPTIONS: Record<string, string> = {
  leave_of_absence: "Apply for a temporary break from your studies.",
  transcript_request: "Request official academic transcript copies.",
  attestation: "Obtain a letter confirming your studentship.",
  good_standing: "Get confirmation of your good academic standing.",
  extra_credit_request: "Request approval for an additional credit unit.",
  supplementary_exam_request: "Request approval to write a supplementary exam.",
};

function fillTemplate(template: string, data: Record<string, string>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => data[key] || `[${key}]`);
}

// ── Main Component ────────────────────────────────────────────────────────────

const LetterAssistant = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [step, setStep] = useState<"select" | "fill" | "preview">("select");
  const [selected, setSelected] = useState<Template | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [generatedLetter, setGeneratedLetter] = useState("");
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchTemplates = async () => {
      const { data, error } = await supabase
        .from("letter_templates")
        .select("*")
        .eq("is_active", true)
        .order("display_name");

      if (error) {
        setFetchError(error.message);
      } else {
        setTemplates(data as Template[]);
      }
      setLoading(false);
    };
    fetchTemplates();
  }, []);

  const handleSelectTemplate = (t: Template) => {
    setSelected(t);
    setFormData({});
    setErrors({});
    setStep("fill");
  };

  const validate = (): boolean => {
    if (!selected) return false;
    const newErrors: Record<string, string> = {};
    for (const field of selected.required_fields) {
      if (!formData[field.key]?.trim()) {
        newErrors[field.key] = `${field.label} is required`;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGenerate = async () => {
    if (!validate() || !selected) return;

    const today = new Date().toLocaleDateString("en-GB", {
      day: "numeric", month: "long", year: "numeric",
    });

    const enriched = { ...formData, recipient_title: selected.recipient_title, today };
    const letter = fillTemplate(selected.template_structure, enriched);
    setGeneratedLetter(letter);

    // Save to Supabase
    await supabase.from("letter_requests").insert({
      template_id: selected.id,
      request_type: selected.request_type,
      student_data: formData,
      generated_letter: letter,
      status: "draft",
    });

    setStep("preview");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleReset = () => {
    setStep("select");
    setSelected(null);
    setFormData({});
    setGeneratedLetter("");
    setErrors({});
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] bg-muted/30 py-10 px-4">
        <div className="max-w-3xl mx-auto">

          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold font-serif text-foreground">
                  Letter Writing Assistant
                </h1>
                <p className="text-sm text-muted-foreground">
                  Generate formal letters for university administrative requests
                </p>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center gap-2 mt-5">
              {(["select", "fill", "preview"] as const).map((s, i) => (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-colors ${
                      step === s
                        ? "bg-primary text-primary-foreground"
                        : (step === "fill" && s === "select") || step === "preview"
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <span className={`text-sm hidden sm:inline ${step === s ? "font-medium text-foreground" : "text-muted-foreground"}`}>
                    {s === "select" ? "Choose Type" : s === "fill" ? "Fill Details" : "Preview"}
                  </span>
                  {i < 2 && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                </div>
              ))}
            </div>
          </div>

          {/* ── STEP 1: Select Template ── */}
          {step === "select" && (
            <div>
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-32 bg-card rounded-xl border border-border animate-pulse" />
                  ))}
                </div>
              ) : fetchError ? (
                <div className="bg-destructive/10 border border-destructive/30 text-destructive text-sm rounded-xl px-5 py-4">
                  Could not load letter templates: {fetchError}. Please check your Supabase RLS policies.
                </div>
              ) : templates.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground text-sm">
                  No letter templates found. Please run the schema SQL in Supabase to seed the templates.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {templates.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => handleSelectTemplate(t)}
                      className="group text-left bg-card border border-border rounded-xl p-5 hover:border-primary hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-11 h-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          {ICONS[t.request_type] ?? <FileText className="w-6 h-6" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground mb-1">{t.display_name}</h3>
                          <p className="text-sm text-muted-foreground leading-snug">
                            {DESCRIPTIONS[t.request_type] ?? `Submit to ${t.recipient_office}`}
                          </p>
                          <p className="text-xs text-primary mt-2 font-medium">
                            To: {t.recipient_office}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── STEP 2: Fill Form ── */}
          {step === "fill" && selected && (
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="gradient-hero px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary-foreground/20 flex items-center justify-center text-primary-foreground">
                    {ICONS[selected.request_type] ?? <FileText className="w-5 h-5" />}
                  </div>
                  <div>
                    <h2 className="font-bold text-primary-foreground">{selected.display_name}</h2>
                    <p className="text-xs text-primary-foreground/70">To: {selected.recipient_office}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-5">
                {selected.required_fields.map((field) => (
                  <div key={field.key} className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">
                      {field.label}
                      <span className="text-destructive ml-0.5">*</span>
                    </label>

                    {field.type === "textarea" ? (
                      <textarea
                        rows={4}
                        value={formData[field.key] || ""}
                        onChange={(e) => {
                          setFormData({ ...formData, [field.key]: e.target.value });
                          if (errors[field.key]) setErrors({ ...errors, [field.key]: "" });
                        }}
                        placeholder={`Enter ${field.label.toLowerCase()}...`}
                        className={`w-full px-3 py-2 rounded-lg border bg-background text-foreground text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors ${
                          errors[field.key] ? "border-destructive" : "border-border"
                        }`}
                      />
                    ) : (
                      <input
                        type={field.type}
                        value={formData[field.key] || ""}
                        onChange={(e) => {
                          setFormData({ ...formData, [field.key]: e.target.value });
                          if (errors[field.key]) setErrors({ ...errors, [field.key]: "" });
                        }}
                        placeholder={field.type === "date" ? "" : `Enter ${field.label.toLowerCase()}...`}
                        className={`w-full px-3 py-2 rounded-lg border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors ${
                          errors[field.key] ? "border-destructive" : "border-border"
                        }`}
                      />
                    )}

                    {errors[field.key] && (
                      <p className="text-xs text-destructive">{errors[field.key]}</p>
                    )}
                  </div>
                ))}

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setStep("select")}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    onClick={handleGenerate}
                    className="flex-1 bg-primary text-primary-foreground py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg"
                  >
                    Generate Letter
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 3: Preview ── */}
          {step === "preview" && generatedLetter && (
            <div className="space-y-4">
              {/* Action bar */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setStep("fill")}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Edit Details
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors shadow-md"
                  >
                    {copied ? (
                      <><Check className="w-4 h-4" /> Copied!</>
                    ) : (
                      <><Copy className="w-4 h-4" /> Copy Letter</>
                    )}
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                  >
                    New Letter
                  </button>
                </div>
              </div>

              {/* Letter preview */}
              <div className="bg-white dark:bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                <div className="bg-muted/50 border-b border-border px-6 py-3 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="ml-3 text-xs text-muted-foreground font-medium">
                    {selected?.display_name} — Draft
                  </span>
                </div>

                <div className="p-8">
                  {/* University letterhead */}
                  <div className="text-center mb-8 pb-6 border-b border-border">
                    <p className="font-bold text-lg text-foreground tracking-wide">
                      AL-HIKMAH UNIVERSITY
                    </p>
                    <p className="text-sm text-muted-foreground">Ilorin, Kwara State, Nigeria</p>
                  </div>

                  {/* Date */}
                  <p className="text-sm text-foreground mb-6">
                    {new Date().toLocaleDateString("en-GB", {
                      day: "numeric", month: "long", year: "numeric",
                    })}
                  </p>

                  {/* Letter body */}
                  <pre className="whitespace-pre-wrap font-sans text-sm text-foreground leading-7">
                    {generatedLetter}
                  </pre>
                </div>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                Copy this letter, paste into Microsoft Word, add your signature, and submit to the relevant office.
              </p>
            </div>
          )}

        </div>
      </div>
    </Layout>
  );
};

export default LetterAssistant;
