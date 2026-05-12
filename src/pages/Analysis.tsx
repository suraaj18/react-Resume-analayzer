import { useMutation, useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { apiClient } from '../lib/apiClient';
import { demoAnalysis } from '../lib/demoData';
import { ExportPreview } from '../components/ExportPreview';
import { HighlightedResume } from '../components/HighlightedResume';
import { RewriteEditor } from '../components/RewriteEditor';
import { ScoreCard } from '../components/ScoreCard';
import { useToast } from '../components/ToastManager';
import type { ExportRequest } from '../types';

export default function Analysis() {
  const { id = 'demo-analysis' } = useParams();
  const { showToast } = useToast();
  const isDemo = id === 'demo-analysis';

  const analysisQuery = useQuery({
    queryKey: ['analysis', id],
    queryFn: () => (isDemo ? Promise.resolve(demoAnalysis) : apiClient.getAnalysis(id)),
    enabled: Boolean(id)
  });

  const exportMutation = useMutation({
    mutationFn: (payload: ExportRequest) => apiClient.exportAnalysis(id, payload),
    onSuccess: (result) => {
      showToast('Export is ready.', 'success');
      window.location.assign(result.downloadUrl);
    },
    onError: () => showToast('Export failed. Please try again.', 'error')
  });

  if (analysisQuery.isLoading) {
    return <div role="status" className="rounded-md bg-white p-6 shadow-sm">Loading analysis...</div>;
  }

  if (analysisQuery.isError || !analysisQuery.data) {
    return (
      <section role="alert" className="rounded-md border border-red-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold">Analysis unavailable</h2>
        <p className="mt-2 text-slate-700">We could not retrieve this analysis. Resume details were not saved in the browser.</p>
        <Link to="/" className="mt-4 inline-block rounded-md bg-brand px-4 py-2 font-semibold text-white">Start over</Link>
      </section>
    );
  }

  const analysis = analysisQuery.data;

  return (
    <div className="grid gap-6">
      <section className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">{analysis.fileName}</p>
        <h2 className="mt-1 text-3xl font-bold">Analysis for {analysis.targetRole}</h2>
        <p className="mt-3 max-w-3xl text-slate-700">{analysis.summary}</p>
      </section>

      <section aria-label="Resume scores" className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <ScoreCard label="Overall" score={analysis.overallScore} description="Composite readiness score" />
        <ScoreCard label="ATS" score={analysis.atsScore} description="Parsing and structure fit" />
        <ScoreCard label="Clarity" score={analysis.clarityScore} description="Readable, direct content" />
        <ScoreCard label="Impact" score={analysis.impactScore} description="Evidence of outcomes" />
        <ScoreCard label="Keywords" score={analysis.keywordScore} description="Role-aligned terms" />
      </section>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
        <HighlightedResume highlights={analysis.highlights} />
        <RewriteEditor suggestions={analysis.rewrites} />
      </div>

      <ExportPreview analysis={analysis} isExporting={exportMutation.isPending} onExport={(request) => exportMutation.mutate(request)} />
    </div>
  );
}
