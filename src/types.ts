export type UploadResponse = {
  uploadId: string;
  fileName: string;
  pageCount?: number;
};

export type AnalyzeRequest = {
  uploadId: string;
  targetRole: string;
  consentAccepted: boolean;
};

export type ResumeHighlight = {
  id: string;
  section: string;
  text: string;
  severity: 'info' | 'warning' | 'critical';
  suggestion: string;
};

export type RewriteSuggestion = {
  id: string;
  original: string;
  rewritten: string;
  rationale: string;
};

export type Analysis = {
  id: string;
  createdAt: string;
  fileName: string;
  targetRole: string;
  overallScore: number;
  atsScore: number;
  clarityScore: number;
  impactScore: number;
  keywordScore: number;
  summary: string;
  highlights: ResumeHighlight[];
  rewrites: RewriteSuggestion[];
};

export type ExportRequest = {
  format: 'pdf' | 'docx' | 'json';
  includeHighlights: boolean;
  includeRewrite: boolean;
};

export type ExportResult = {
  analysisId: string;
  downloadUrl: string;
  expiresAt: string;
};

export type ApiErrorBody = {
  message?: string;
  code?: string;
};
