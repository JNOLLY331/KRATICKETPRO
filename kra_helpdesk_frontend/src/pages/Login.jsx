import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FaUserCircle, FaLock, FaExclamationCircle, FaSpinner, FaEye, FaEyeSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Login = () => {
    const [staffNumber, setStaffNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const userData = await login(staffNumber, password);
            toast.success(`Welcome back, ${userData.full_name || 'Staff'}`);
            if (userData.role === 'END_USER') {
                navigate('/tickets/new');
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            const errMsg = err.response?.data?.detail || 'Invalid staff number or password';
            setError(errMsg);
            toast.error(errMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6 bg-slate-50 relative overflow-hidden">
            {/* Subtle Interactive Background Component */}
            <motion.div
                animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.03, 0.05, 0.03]
                }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(circle at 50% 50%, #C8102E 0%, transparent 70%)' }}
            />

            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-md relative z-10"
            >
                <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 sm:p-10 w-full overflow-hidden">
                    <div className="text-center mb-8 md:mb-10">
                        <motion.h1
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-2xl sm:text-3xl font-black text-slate-900 mb-2 font-oswald uppercase tracking-tight"
                        >
                            Institutional Access
                        </motion.h1>
                        <p className="text-slate-500 text-sm sm:text-base font-medium">Log in using your KRA Staff Number</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                className="flex items-center gap-3 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm overflow-hidden"
                            >
                                <FaExclamationCircle size={18} className="shrink-0" />
                                <p>{error}</p>
                            </motion.div>
                        )}

                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">Staff Number</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                                    <FaUserCircle size={16} />
                                </div>
                                <motion.input
                                    whileFocus={{ scale: 1.01, boxShadow: "0 0 0 4px rgba(200, 16, 46, 0.05)" }}
                                    type="text"
                                    value={staffNumber}
                                    onChange={(e) => setStaffNumber(e.target.value)}
                                    className="w-full pl-11 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-primary focus:bg-white transition-all font-bold text-slate-800"
                                    placeholder="e.g. 30011111"
                                    required
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <div className="flex items-center justify-between mb-2 ml-1">
                                <label className="text-sm font-semibold text-slate-700">Password</label>
                                <Link to="#" className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors">Forgot?</Link>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                                    <FaLock size={16} />
                                </div>
                                <motion.input
                                    whileFocus={{ scale: 1.01, boxShadow: "0 0 0 4px rgba(200, 16, 46, 0.05)" }}
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-11 pr-11 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-primary focus:bg-white transition-all font-bold text-slate-800"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-primary transition-all"
                                >
                                    {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                                </button>
                            </div>
                        </motion.div>

                        <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full py-4 font-black text-lg flex items-center justify-center gap-2 uppercase tracking-widest font-oswald shadow-xl shadow-primary/20"
                        >
                            {loading ? <FaSpinner className="animate-spin" size={20} /> : 'Sign In'}
                        </motion.button>
                    </form>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mt-8 text-center text-slate-500 text-sm"
                    >
                        Don't have an account? <Link to="/register" className="font-bold text-primary hover:text-primary-dark transition-colors">Create one</Link>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
