import { Link } from 'react-router-dom';
import { demoAnalysis } from '../lib/demoData';
import { ScoreCard } from '../components/ScoreCard';

const recent = [demoAnalysis];

export default function Dashboard() {
  return (
    <div className="grid gap-6">
      <section>
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <p className="mt-2 text-slate-700">Recent resume analyses and score trends stay in backend-backed views, not browser storage.</p>
      </section>

      <section aria-label="Dashboard score summary" className="grid gap-4 md:grid-cols-4">
        <ScoreCard label="Average" score={82} />
        <ScoreCard label="Best ATS" score={76} />
        <ScoreCard label="Best Impact" score={79} />
        <ScoreCard label="Keyword Fit" score={84} />
      </section>

      <section className="rounded-md border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-5">
          <h3 className="text-xl font-bold">Recent analyses</h3>
        </div>
        <div className="divide-y divide-slate-200">
          {recent.map((item) => (
            <article key={item.id} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h4 className="font-semibold">{item.targetRole}</h4>
                <p className="text-sm text-slate-600">{item.fileName} · Score {item.overallScore}</p>
              </div>
              <Link to={`/analysis/${item.id}`} className="rounded-md border border-brand px-4 py-2 text-center font-semibold text-brand hover:bg-teal-50">
                Open analysis
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
