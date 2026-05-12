type ScoreCardProps = {
  label: string;
  score: number;
  description?: string;
};

export function ScoreCard({ label, score, description }: ScoreCardProps) {
  const safeScore = Math.max(0, Math.min(100, score));
  const color = safeScore >= 80 ? 'bg-success' : safeScore >= 60 ? 'bg-accent' : 'bg-danger';

  return (
    <article className="rounded-md border border-slate-200 bg-white p-5 shadow-sm" aria-label={`${label} score ${safeScore} out of 100`}>
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-semibold text-slate-900">{label}</h3>
        <span className="text-2xl font-bold">{safeScore}</span>
      </div>
      <div className="mt-4 h-3 rounded-full bg-slate-200" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={safeScore} aria-label={label}>
        <div className={`h-3 rounded-full ${color}`} style={{ width: `${safeScore}%` }} />
      </div>
      {description ? <p className="mt-3 text-sm text-slate-600">{description}</p> : null}
    </article>
  );
}
