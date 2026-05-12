import { useState } from 'react';
import type { RewriteSuggestion } from '../types';

type RewriteEditorProps = {
  suggestions: RewriteSuggestion[];
  onChange?: (values: Record<string, string>) => void;
};

export function RewriteEditor({ suggestions, onChange }: RewriteEditorProps) {
  const [values, setValues] = useState(() => Object.fromEntries(suggestions.map((item) => [item.id, item.rewritten])));

  function updateValue(id: string, value: string) {
    const next = { ...values, [id]: value };
    setValues(next);
    onChange?.(next);
  }

  return (
    <section aria-labelledby="rewrite-title" className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
      <h2 id="rewrite-title" className="text-xl font-bold">Rewrite editor</h2>
      <div className="mt-4 grid gap-4">
        {suggestions.map((suggestion) => (
          <div key={suggestion.id} className="grid gap-2 rounded-md border border-slate-200 p-4">
            <p className="text-sm font-semibold text-slate-600">Original</p>
            <p className="text-slate-800">{suggestion.original}</p>
            <label className="text-sm font-semibold text-slate-700" htmlFor={`rewrite-${suggestion.id}`}>
              Suggested rewrite
            </label>
            <textarea
              id={`rewrite-${suggestion.id}`}
              rows={3}
              value={values[suggestion.id]}
              onChange={(event) => updateValue(suggestion.id, event.target.value)}
              className="rounded-md border border-slate-300 p-3 text-slate-900"
            />
            <p className="text-sm text-slate-600">{suggestion.rationale}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
