import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { formatPLN } from "../lib/calculations";

interface Props {
  financedAmount: number;
  itemType: string;
}

interface FormData {
  name: string;
  phone: string;
  email: string;
  nip: string;
  itemType: string;
  amount: string;
  message: string;
  consent: boolean;
}

export default function ContactForm({ financedAmount, itemType }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    nip: "",
    itemType: itemType,
    amount: formatPLN(financedAmount),
    message: "",
    consent: false,
  });

  const update = (key: keyof FormData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): boolean => {
    const errs: Partial<Record<keyof FormData, string>> = {};
    if (!form.name.trim()) errs.name = "Podaj imię i nazwisko";
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 9) errs.phone = "Podaj poprawny numer telefonu";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Podaj poprawny email";
    if (!form.consent) errs.consent = "Wymagana zgoda na kontakt";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // TODO: Send to API / webhook / CRM
    console.log("Lead submitted:", { ...form, financedAmount, itemType });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-card rounded-2xl shadow-sm border border-border p-6 text-center">
        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-7 h-7 text-green-600" />
        </div>
        <h3 className="text-lg font-bold text-foreground mb-2">Dziękujemy!</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Skontaktujemy się z Tobą w sprawie finansowania. Porównamy oferty kilku firm leasingowych i przedstawimy najlepsze warunki.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl shadow-sm border border-border p-5">
      <h3 className="text-lg font-bold text-foreground mb-1">Chcesz realną ofertę?</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Zostaw kontakt — porównamy dostępne opcje finansowania.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <Field
          label="Imię i nazwisko *"
          value={form.name}
          onChange={(v) => update("name", v)}
          error={errors.name}
          autoComplete="name"
        />
        <Field
          label="Telefon *"
          value={form.phone}
          onChange={(v) => update("phone", v)}
          error={errors.phone}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
        />
        <Field
          label="Email *"
          value={form.email}
          onChange={(v) => update("email", v)}
          error={errors.email}
          type="email"
          inputMode="email"
          autoComplete="email"
        />
        <Field
          label="NIP firmy (opcjonalnie)"
          value={form.nip}
          onChange={(v) => update("nip", v)}
        />

        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">Przedmiot</label>
          <input
            type="text"
            readOnly
            value={`${itemType} — ${formatPLN(financedAmount)}`}
            className="w-full bg-[var(--color-muted)] border border-border rounded-xl px-4 py-2.5 text-sm text-muted-foreground"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">Wiadomość (opcjonalnie)</label>
          <textarea
            rows={2}
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            className="w-full bg-white border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:ring-2 focus:ring-[var(--color-navy)] focus:border-transparent resize-none"
          />
        </div>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(e) => update("consent", e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded border-border text-[var(--color-navy)] focus:ring-[var(--color-navy)]"
          />
          <span className="text-xs text-muted-foreground leading-relaxed">
            Wyrażam zgodę na kontakt w celu przedstawienia oferty finansowania.
          </span>
        </label>
        {errors.consent && (
          <p className="text-xs text-red-500">{errors.consent}</p>
        )}

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[var(--color-gold)] text-[var(--color-navy)] rounded-xl text-sm font-bold hover:opacity-90 transition-opacity"
        >
          <Send className="w-4 h-4" />
          Chcę najlepszą ofertę leasingu
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  type = "text",
  inputMode,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  inputMode?: "tel" | "email" | "numeric";
  autoComplete?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-muted-foreground mb-1">{label}</label>
      <input
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full bg-white border rounded-xl px-4 py-2.5 text-sm text-foreground focus:ring-2 focus:ring-[var(--color-navy)] focus:border-transparent ${
          error ? "border-red-400" : "border-border"
        }`}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
