import { Component, ErrorInfo, ReactNode } from 'react';

type State = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(_error: Error, _errorInfo: ErrorInfo) {
    // Intentionally avoid logging resume content or request payloads from the client.
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-screen bg-surface p-6 text-ink">
          <div role="alert" className="mx-auto max-w-xl rounded-md border border-red-200 bg-white p-6 shadow-sm">
            <h1 className="text-2xl font-bold">We could not load this workspace</h1>
            <p className="mt-3 text-slate-700">Refresh the page and try again. Your resume content was not saved by the browser.</p>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}
