import { lazy, Suspense } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import { BrainCircuit, LayoutDashboard, UserRound, Upload } from 'lucide-react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ToastManager } from './components/ToastManager';

const Home = lazy(() => import('./pages/Home'));
const Analysis = lazy(() => import('./pages/Analysis'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));

const navItems = [
  { to: '/', label: 'Home', icon: Upload },
  { to: '/analysis/demo-analysis', label: 'Analysis', icon: BrainCircuit },
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/profile', label: 'Profile', icon: UserRound }
];

export function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-surface text-ink">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:p-3">
          Skip to content
        </a>
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-brand">AI Resume Analyzer</p>
              <h1 className="text-2xl font-bold">Resume readiness workspace</h1>
            </div>
            <nav aria-label="Primary navigation" className="flex flex-wrap gap-2">
              {navItems.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }: { isActive: boolean }) =>
                    `inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold ${
                      isActive ? 'bg-brand text-white' : 'text-slate-700 hover:bg-slate-100'
                    }`
                  }
                  end={to === '/'}
                >
                  <Icon aria-hidden="true" size={18} />
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>
        </header>

        <main id="main" className="mx-auto max-w-6xl px-4 py-8">
          <Suspense fallback={<div role="status" className="rounded-md bg-white p-6 shadow-sm">Loading workspace...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/analysis/:id" element={<Analysis />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Suspense>
        </main>
        <ToastManager />
      </div>
    </ErrorBoundary>
  );
}
