import { ArrowRight } from "lucide-react";

interface Props {
  onCTA: () => void;
}

export default function LeadMagnet({ onCTA }: Props) {
  return (
    <div className="bg-[var(--color-navy)] rounded-2xl p-5 text-white">
      <h3 className="text-lg font-bold mb-1">Nie wiesz, czy leasing się opłaca?</h3>
      <p className="text-sm text-white/70 mb-4 leading-relaxed">
        Sprawdzimy za darmo. Porównamy dostępne opcje i&nbsp;pokażemy, co się bardziej opłaca — leasing, kredyt czy gotówka.
      </p>
      <button
        type="button"
        onClick={onCTA}
        className="flex items-center gap-2 px-5 py-3 bg-[var(--color-gold)] text-[var(--color-navy)] rounded-xl text-sm font-bold hover:opacity-90 transition-opacity"
      >
        Przelicz moją ofertę
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
