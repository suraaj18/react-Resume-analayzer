import { FormEvent, useState } from 'react';
import { UploadCloud } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from './ToastManager';
import { ConsentModal } from './ConsentModal';

const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

export function UploadForm() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [targetRole, setTargetRole] = useState('');
  const [isConsentOpen, setConsentOpen] = useState(false);

  function validate(): boolean {
    if (!file) {
      showToast('Choose a PDF or DOCX resume before analyzing.', 'error');
      return false;
    }
    if (!allowedTypes.includes(file.type)) {
      showToast('Only PDF and DOCX resumes are supported.', 'error');
      return false;
    }
    if (!targetRole.trim()) {
      showToast('Enter a target role for better feedback.', 'error');
      return false;
    }
    return true;
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (validate()) setConsentOpen(true);
  }

  function acceptConsent() {
    setConsentOpen(false);
    showToast('Demo analysis loaded. No file was uploaded.', 'success');
    navigate('/analysis/demo-analysis');
  }

  return (
    <>
      <form onSubmit={submit} className="grid gap-5 rounded-md border border-slate-200 bg-white p-6 shadow-sm" aria-label="Resume upload form">
        <div>
          <label htmlFor="resume-file" className="block text-sm font-semibold text-slate-700">
            Resume file
          </label>
          <div className="mt-2 rounded-md border-2 border-dashed border-slate-300 bg-slate-50 p-6">
            <UploadCloud aria-hidden="true" className="mb-3 text-brand" />
            <input
              id="resume-file"
              name="resume"
              type="file"
              accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
              className="block w-full text-sm"
            />
            <p className="mt-2 text-sm text-slate-600">PDF or DOCX, analyzed only after consent.</p>
          </div>
        </div>

        <div>
          <label htmlFor="target-role" className="block text-sm font-semibold text-slate-700">
            Target role
          </label>
          <input
            id="target-role"
            value={targetRole}
            onChange={(event) => setTargetRole(event.target.value)}
            autoComplete="organization-title"
            className="mt-2 w-full rounded-md border border-slate-300 p-3"
            placeholder="Senior Product Designer"
          />
        </div>

        <button type="submit" className="rounded-md bg-brand px-5 py-3 font-bold text-white hover:bg-teal-900 disabled:cursor-not-allowed disabled:opacity-60">
          Analyze resume
        </button>
      </form>
      <ConsentModal isOpen={isConsentOpen} onAccept={acceptConsent} onDecline={() => setConsentOpen(false)} />
    </>
  );
}