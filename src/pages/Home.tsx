import { UploadForm } from '../components/UploadForm';

export default function Home() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-start">
      <section>
        <h2 className="text-3xl font-bold tracking-normal">Analyze a resume against a target role</h2>
        <p className="mt-4 max-w-2xl text-lg text-slate-700">
          Upload a PDF or DOCX, confirm consent, and get scorecards, highlighted feedback, rewrite suggestions, and export-ready output.
        </p>
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {['ATS fit', 'Keyword coverage', 'Impact clarity'].map((item) => (
            <div key={item} className="rounded-md border border-slate-200 bg-white p-4 font-semibold shadow-sm">
              {item}
            </div>
          ))}
        </div>
      </section>
      <UploadForm />
    </div>
  );
}
