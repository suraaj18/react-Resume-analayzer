import { ShieldCheck } from 'lucide-react';

type ConsentModalProps = {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
};

export function ConsentModal({ isOpen, onAccept, onDecline }: ConsentModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/60 p-4" role="presentation">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="consent-title"
        className="w-full max-w-lg rounded-md bg-white p-6 shadow-xl"
      >
        <div className="flex items-start gap-3">
          <ShieldCheck aria-hidden="true" className="mt-1 text-brand" />
          <div>
            <h2 id="consent-title" className="text-xl font-bold">Consent required</h2>
            <p className="mt-3 text-slate-700">
              Resume files can contain personal data. Continue only if you have permission to upload and analyze this resume.
            </p>
          </div>
        </div>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button type="button" onClick={onDecline} className="rounded-md border border-slate-300 px-4 py-2 font-semibold hover:bg-slate-50">
            Cancel
          </button>
          <button type="button" onClick={onAccept} className="rounded-md bg-brand px-4 py-2 font-semibold text-white hover:bg-teal-900">
            I have consent
          </button>
        </div>
      </section>
    </div>
  );
}
