import type { ResumeHighlight } from '../types';

type HighlightedResumeProps = {
  highlights: ResumeHighlight[];
};

const severityStyles = {
  info: 'border-blue-300 bg-blue-50 text-blue-950',
  warning: 'border-amber-300 bg-amber-50 text-amber-950',
  critical: 'border-red-300 bg-red-50 text-red-950'
};

export function HighlightedResume({ highlights }: HighlightedResumeProps) {
  return (
    <section aria-labelledby="highlighted-resume-title" className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
      <h2 id="highlighted-resume-title" className="text-xl font-bold">Highlighted resume feedback</h2>
      <div className="mt-4 grid gap-3">
        {highlights.length === 0 ? (
          <p className="text-slate-600">No flagged resume highlights yet.</p>
        ) : (
          highlights.map((highlight) => (
            <article key={highlight.id} className={`rounded-md border p-4 ${severityStyles[highlight.severity]}`}>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-semibold">{highlight.section}</h3>
                <span className="rounded-sm bg-white/70 px-2 py-1 text-xs font-bold uppercase">{highlight.severity}</span>
              </div>
              <p className="mt-3 font-medium">{highlight.text}</p>
              <p className="mt-2 text-sm">{highlight.suggestion}</p>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
