import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "Czy kalkulator pokazuje finalną ofertę?",
    a: "Nie. Kalkulator służy do orientacyjnego wyliczenia raty. Finalna oferta zależy od zdolności finansowej, przedmiotu leasingu i warunków firmy leasingowej. Zostaw kontakt, a przygotujemy realną propozycję.",
  },
  {
    q: "Czy mogę sfinansować auto używane?",
    a: "Tak. Leasing i pożyczka leasingowa są dostępne zarówno dla nowych, jak i używanych pojazdów. Warunki mogą się różnić w zależności od wieku i stanu pojazdu.",
  },
  {
    q: "Ile trwa uzyskanie leasingu?",
    a: "W wielu przypadkach decyzja leasingowa zapada w ciągu 24–48 godzin. Czas realizacji zależy od kompletności dokumentów i specyfiki przedmiotu finansowania.",
  },
  {
    q: "Czy mogę dostać ofertę bez zobowiązań?",
    a: "Oczywiście. Wycena i porównanie ofert są bezpłatne i niezobowiązujące. Decyzję o podpisaniu umowy podejmujesz wyłącznie Ty.",
  },
  {
    q: "Czy leasing można dobrać do kosztów firmy?",
    a: "Tak. Raty leasingu operacyjnego stanowią koszt uzyskania przychodu, co może optymalizować Twoje zobowiązania podatkowe. Szczegóły zależą od formy opodatkowania.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="bg-card rounded-2xl shadow-sm border border-border p-5">
      <h2 className="text-lg font-bold text-foreground mb-4">Najczęściej zadawane pytania</h2>
      <div className="space-y-0 divide-y divide-border">
        {FAQS.map((faq, i) => (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between py-3.5 text-left"
            >
              <span className="text-sm font-medium text-foreground pr-4">{faq.q}</span>
              <ChevronDown
                className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${
                  open === i ? "rotate-180" : ""
                }`}
              />
            </button>
            {open === i && (
              <div className="pb-3.5 text-sm text-muted-foreground leading-relaxed">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
