import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
// Components
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import LandingPage from './pages/LandingPage';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import TicketList from './pages/TicketList';
import TicketDetail from './pages/TicketDetail';
import CreateTicket from './pages/CreateTicket';
import Reports from './pages/Reports';
import AdminUsers from './pages/AdminUsers';
import KnowledgeBase from './pages/KnowledgeBase';
import NotFound from './pages/NotFound';

// ── Shared Layout for all pages ──────────────────────────────────────────────
const PageLayout = ({ children, hideNavbar = false }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {!hideNavbar && <Navbar />}
      <motion.main
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-1"
      >
        {children}
      </motion.main>
    </div>
  );
};

// ── App shell for authenticated pages (sidebar layout) ──────────────────────
const AppShell = ({ children }) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] relative">
      {/* Sidebar Overlay (visible when sidebar is open) */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity duration-200"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Drawer */}
      <div className={`
        fixed left-0 top-0 h-full z-50 transition-transform duration-500 ease-in-out
        ${mobileSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
      `}>
        <Sidebar onNavClick={() => setMobileSidebarOpen(false)} />
      </div>

      {/* Main content - Full width */}
      <div className="flex-1 flex flex-col min-h-screen w-full">
        <TopBar onMenuToggle={() => setMobileSidebarOpen(o => !o)} />
        <main className="flex-1 overflow-auto bg-slate-50">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

// ── Protected route guard ────────────────────────────────────────────────────
const ProtectedRoute = ({ children, roles }) => {
  const { user, loading } = useAuth();
  const toastShown = useRef(false);

  useEffect(() => {
    if (!loading && !user && !toastShown.current) {
      toast.error('Sign in required to access this page');
      toastShown.current = true;
    }
  }, [user, loading]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-slate-500 font-medium">Authenticating…</p>
      </div>
    </div>
  );

  if (!user) return <Navigate to="/login" replace />;

  if (roles && !roles.includes(user.role)) {
    return <Navigate to={user.role === 'END_USER' ? "/tickets/new" : "/dashboard"} replace />;
  }

  return <AppShell>{children}</AppShell>;
};

// ── Public route guard ───────────────────────────────────────────────────────
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) return <Navigate to="/dashboard" replace />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
            },
            success: { iconTheme: { primary: '#10B981', secondary: 'white' } },
            error: { iconTheme: { primary: '#EF4444', secondary: 'white' } },
          }}
        />
        <Routes>
          {/* Public */}
          <Route path="/" element={<PageLayout><LandingPage /></PageLayout>} />
          <Route path="/about" element={<PageLayout><About /></PageLayout>} />
          <Route path="/login" element={<PublicRoute><PageLayout><Login /></PageLayout></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><PageLayout><Register /></PageLayout></PublicRoute>} />

          {/* Protected — Role Restricted */}
          <Route path="/dashboard" element={
            <ProtectedRoute roles={['ADMIN', 'ICT_STAFF']}>
              <Dashboard />
            </ProtectedRoute>
          } />

          <Route path="/tickets" element={<ProtectedRoute><TicketList /></ProtectedRoute>} />
          <Route path="/tickets/new" element={<ProtectedRoute><CreateTicket /></ProtectedRoute>} />
          <Route path="/tickets/:id" element={<ProtectedRoute><TicketDetail /></ProtectedRoute>} />
          <Route path="/knowledge-base" element={<ProtectedRoute><KnowledgeBase /></ProtectedRoute>} />

          {/* ICT + Admin only */}
          <Route path="/reports" element={
            <ProtectedRoute roles={['ADMIN', 'ICT_STAFF']}>
              <Reports />
            </ProtectedRoute>
          } />

          {/* Admin only */}
          <Route path="/admin/users" element={
            <ProtectedRoute roles={['ADMIN']}>
              <AdminUsers />
            </ProtectedRoute>
          } />

          {/* 404 */}
          <Route path="*" element={<PageLayout><NotFound /></PageLayout>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
