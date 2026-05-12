import { Download } from 'lucide-react';
import type { Analysis, ExportRequest } from '../types';

type ExportPreviewProps = {
  analysis: Analysis;
  isExporting: boolean;
  onExport: (request: ExportRequest) => void;
};

export function ExportPreview({ analysis, isExporting, onExport }: ExportPreviewProps) {
  return (
    <section aria-labelledby="export-title" className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
      <h2 id="export-title" className="text-xl font-bold">Export preview</h2>
      <div className="mt-4 rounded-md border border-slate-200 bg-slate-50 p-4">
        <p className="text-sm font-semibold text-slate-600">Analysis summary</p>
        <p className="mt-2 text-slate-800">{analysis.summary}</p>
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        {(['pdf', 'docx', 'json'] as const).map((format) => (
          <button
            key={format}
            type="button"
            disabled={isExporting}
            onClick={() => onExport({ format, includeHighlights: true, includeRewrite: true })}
            className="inline-flex items-center gap-2 rounded-md bg-brand px-4 py-2 font-semibold uppercase text-white hover:bg-teal-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Download aria-hidden="true" size={18} />
            {isExporting ? 'Exporting' : format}
          </button>
        ))}
      </div>
    </section>
  );
}
