import type { Analysis, AnalyzeRequest, ApiErrorBody, ExportRequest, ExportResult, UploadResponse } from '../types';

const defaultHeaders = {
  Accept: 'application/json'
};

export class ApiClientError extends Error {
  status: number;
  code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = 'ApiClientError';
    this.status = status;
    this.code = code;
  }
}

async function parseJson<T>(response: Response): Promise<T> {
  const body = (await response.json().catch(() => ({}))) as T & ApiErrorBody;

  if (!response.ok) {
    throw new ApiClientError(body.message ?? 'Something went wrong. Please try again.', response.status, body.code);
  }

  return body;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    credentials: 'same-origin',
    cache: 'no-store',
    ...init,
    headers: {
      ...defaultHeaders,
      ...(init?.headers ?? {})
    }
  });

  return parseJson<T>(response);
}

export const apiClient = {
  uploadResume(file: File): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    return request<UploadResponse>('/api/upload', {
      method: 'POST',
      body: formData
    });
  },

  analyzeResume(payload: AnalyzeRequest): Promise<Analysis> {
    return request<Analysis>('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
  },

  getAnalysis(id: string): Promise<Analysis> {
    return request<Analysis>(`/api/analysis/${encodeURIComponent(id)}`);
  },

  exportAnalysis(analysisId: string, payload: ExportRequest): Promise<ExportResult> {
    return request<ExportResult>(`/api/export/${encodeURIComponent(analysisId)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
  }
};
