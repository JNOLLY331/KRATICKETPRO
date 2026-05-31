import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md"
        >
            <div className="text-9xl font-black text-slate-100 mb-4 select-none">404</div>
            <div className="w-16 h-1 bg-primary rounded-full mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-slate-900 mb-3">Page Not Found</h1>
            <p className="text-slate-500 mb-8 leading-relaxed">
                The page you're looking for doesn't exist or you don't have permission to access it.
            </p>
            <div className="flex items-center justify-center gap-3">
                <button onClick={() => window.history.back()} className="btn-secondary flex items-center gap-2">
                    <ArrowLeft size={16} /> Go Back
                </button>
                <Link to="/dashboard" className="btn-primary flex items-center gap-2">
                    <Home size={16} /> Dashboard
                </Link>
            </div>
            <p className="text-xs text-slate-400 mt-8">KRATicketPro · ICT Helpdesk System</p>
        </motion.div>
    </div>
);

export default NotFound;
