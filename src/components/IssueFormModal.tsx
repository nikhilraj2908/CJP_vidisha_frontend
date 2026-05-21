import { useEffect, useState } from "react";
import { CATEGORIES, createIssue, type IssueCategory } from "@/lib/issues-store";

export function IssueFormModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [locality, setLocality] = useState("");
  const [ward, setWard] = useState("");
  const [category, setCategory] = useState<IssueCategory>("Roads");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [contact, setContact] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) {
      setSubmitted(false);
      setName(""); setAnonymous(false); setLocality(""); setWard("");
      setCategory("Roads"); setTitle(""); setDescription(""); setImage(""); setContact("");
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Please upload an image under 2MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setImage(typeof reader.result === "string" ? reader.result : "");
    reader.readAsDataURL(file);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!locality.trim() || !title.trim() || !description.trim()) return;
    createIssue({
      name: anonymous ? "" : name.trim().slice(0, 80),
      anonymous,
      locality: locality.trim().slice(0, 80),
      ward: ward.trim().slice(0, 20),
      category,
      title: title.trim().slice(0, 120),
      description: description.trim().slice(0, 1200),
      image,
      contact: contact.trim().slice(0, 120),
    });
    setSubmitted(true);
    setTimeout(() => onClose(), 1800);
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start md:items-center justify-center overflow-y-auto bg-ink/70 p-4"
      onClick={onClose}
    >
      <div
        className="brutal-card relative w-full max-w-2xl my-8 p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 font-mono text-xs uppercase tracking-widest border-2 border-ink px-2 py-1 bg-paper hover:bg-ink hover:text-paper transition-colors"
          aria-label="Close"
        >
          ✕ Close
        </button>

        {submitted ? (
          <div className="py-10 text-center">
            <div className="stamp bg-green text-paper border-paper inline-block">Submitted</div>
            <h3 className="font-display text-2xl md:text-3xl mt-4">Your concern has been submitted</h3>
            <p className="mt-2 font-mono text-sm text-ink/80">Awaiting approval. Thank you for raising your voice.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <span className="stamp bg-alert text-paper border-paper">Raise an Issue</span>
              <h3 className="font-display text-2xl md:text-3xl mt-3 leading-tight">Tell Vidisha what's broken.</h3>
              <p className="font-mono text-xs text-ink/70 mt-1">All fields with * are required.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Name">
                <input
                  value={name}
                  disabled={anonymous}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={80}
                  className="brutal-input"
                  placeholder="Your name (optional)"
                />
              </Field>
              <Field label="Anonymous">
                <label className="flex items-center gap-3 h-[44px] px-3 border-[3px] border-ink bg-paper cursor-pointer">
                  <input
                    type="checkbox"
                    checked={anonymous}
                    onChange={(e) => setAnonymous(e.target.checked)}
                    className="w-5 h-5 accent-alert"
                  />
                  <span className="font-mono text-xs uppercase tracking-widest">Submit anonymously</span>
                </label>
              </Field>

              <Field label="Area / Locality *">
                <input
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  maxLength={80}
                  required
                  className="brutal-input"
                  placeholder="e.g. Patel Nagar"
                />
              </Field>
              <Field label="Ward No.">
                <input
                  value={ward}
                  onChange={(e) => setWard(e.target.value)}
                  maxLength={20}
                  className="brutal-input"
                  placeholder="e.g. 12"
                />
              </Field>

              <Field label="Category *">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as IssueCategory)}
                  className="brutal-input"
                >
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="Email / Phone">
                <input
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  maxLength={120}
                  className="brutal-input"
                  placeholder="So we can follow up (optional)"
                />
              </Field>
            </div>

            <Field label="Issue Title *">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={120}
                required
                className="brutal-input"
                placeholder="One-line summary"
              />
            </Field>

            <Field label="Detailed Description *">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={1200}
                required
                rows={4}
                className="brutal-input resize-y"
                placeholder="Where, when, how bad, and who's affected."
              />
            </Field>

            <Field label="Upload Image">
              <input
                type="file"
                accept="image/*"
                onChange={handleFile}
                className="font-mono text-xs file:brutal-btn file:bg-ink file:text-paper file:mr-3 file:text-xs file:py-2 file:px-3"
              />
              {image && (
                <img src={image} alt="preview" className="mt-3 max-h-40 border-[3px] border-ink object-cover" />
              )}
            </Field>

            <div className="pt-2 flex flex-wrap gap-3 items-center justify-between">
              <p className="font-mono text-[11px] text-ink/60 uppercase tracking-widest">
                Your issue will go live after admin approval.
              </p>
              <button type="submit" className="brutal-btn bg-alert text-paper text-base">
                Raise Issue →
              </button>
            </div>
          </form>
        )}
      </div>

      <style>{`
        .brutal-input {
          width: 100%;
          background: var(--paper);
          border: 3px solid var(--ink);
          padding: 0.6rem 0.75rem;
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: var(--ink);
          outline: none;
        }
        .brutal-input:focus { box-shadow: 4px 4px 0 var(--saffron); }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block font-mono text-[10px] uppercase tracking-widest text-ink/70 mb-1">{label}</span>
      {children}
    </label>
  );
}
