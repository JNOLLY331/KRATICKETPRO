import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaBuilding, FaIdCard, FaSpinner, FaExclamationCircle, FaEye, FaEyeSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        full_name: '',
        staff_number: '',
        department: '',
        role: 'END_USER',
    });
    const [departments, setDepartments] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const res = await api.get('/users/departments/');
                setDepartments(res.data);
            } catch (err) {
                console.error("Failed to fetch departments", err);
            }
        };
        fetchDepartments();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await api.post('/users/register/', formData);
            toast.success('Account created successfully! Please sign in.');
            navigate('/login');
        } catch (err) {
            const errMsg = Object.values(err.response?.data || {}).flat()[0] || 'Registration failed';
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
                    scale: [1, 1.1, 1],
                    opacity: [0.03, 0.06, 0.03]
                }}
                transition={{ duration: 15, repeat: Infinity }}
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(circle at 70% 30%, #C8102E 0%, transparent 60%)' }}
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-2xl relative z-10"
            >
                <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-8 md:p-12">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-10"
                    >
                        <h1 className="text-3xl font-black text-slate-900 mb-2 font-oswald uppercase tracking-tight">Create Account</h1>
                        <p className="text-slate-500 font-medium">Join the KRA ICT Support network</p>
                    </motion.div>

                    {/* Progress Bar */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mb-10"
                    >
                        <div className="flex justify-between items-end mb-2">
                            <div>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Registration Progress</span>
                                <span className="text-[10px] font-bold text-slate-400">
                                    {Math.round((Object.values(formData).filter(v => v !== '').length / Object.keys(formData).length) * 100) < 100
                                        ? "Complete all fields to finish"
                                        : "You're all set!"}
                                </span>
                            </div>
                            <span className="text-sm font-black text-primary font-oswald flex flex-col items-end">
                                <span>{Math.round((Object.values(formData).filter(v => v !== '').length / Object.keys(formData).length) * 100)}%</span>
                            </span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50 p-[2px]">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(Object.values(formData).filter(v => v !== '').length / Object.keys(formData).length) * 100}%` }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="h-full bg-gradient-to-r from-primary to-primary-dark rounded-full shadow-[0_0_12px_rgba(255,0,0,0.3)]"
                            />
                        </div>
                    </motion.div>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {error && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                className="md:col-span-2 flex items-center gap-3 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm overflow-hidden"
                            >
                                <FaExclamationCircle size={18} />
                                <p>{error}</p>
                            </motion.div>
                        )}

                        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                                    <FaUser size={16} />
                                </div>
                                <motion.input
                                    whileFocus={{ scale: 1.01 }}
                                    type="text"
                                    required
                                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-primary focus:bg-white transition-all font-bold text-slate-800"
                                    placeholder="John Doe"
                                    value={formData.full_name}
                                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                />
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address (Optional)</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                                    <FaEnvelope size={16} />
                                </div>
                                <motion.input
                                    whileFocus={{ scale: 1.01 }}
                                    type="email"
                                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-primary focus:bg-white transition-all font-bold text-slate-800"
                                    placeholder="name@kra.go.ke"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Staff Number</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                                    <FaIdCard size={16} />
                                </div>
                                <motion.input
                                    whileFocus={{ scale: 1.01 }}
                                    type="text"
                                    required
                                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-primary focus:bg-white transition-all font-bold text-slate-800"
                                    placeholder="KRA-0000"
                                    value={formData.staff_number}
                                    onChange={(e) => setFormData({ ...formData, staff_number: e.target.value })}
                                />
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 }}>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Department</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                                    <FaBuilding size={16} />
                                </div>
                                <select
                                    required
                                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-primary focus:bg-white transition-all font-bold text-slate-800 appearance-none cursor-pointer"
                                    value={formData.department}
                                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                >
                                    <option value="">Select Department</option>
                                    {departments.map(dept => (
                                        <option key={dept.id} value={dept.id}>{dept.name}</option>
                                    ))}
                                    {departments.length === 0 && (
                                        <>
                                            <option value="1">ICT Department</option>
                                            <option value="2">Human Resources</option>
                                            <option value="3">Finance</option>
                                        </>
                                    )}
                                </select>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Role</label>
                            <select
                                required
                                className="w-full px-5 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-primary focus:bg-white transition-all font-bold text-slate-800 appearance-none cursor-pointer"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            >
                                <option value="END_USER">End User (Staff)</option>
                                <option value="ICT_STAFF">ICT Support Staff</option>
                                <option value="ADMIN">Main Admin</option>
                            </select>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.55 }}>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                                    <FaLock size={16} />
                                </div>
                                <motion.input
                                    whileFocus={{ scale: 1.01 }}
                                    type={showPassword ? "text" : "password"}
                                    required
                                    className="w-full pl-11 pr-11 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-primary focus:bg-white transition-all font-bold text-slate-800"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-primary transition-colors"
                                >
                                    {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                                </button>
                            </div>
                        </motion.div>

                        <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={loading}
                            className="md:col-span-2 btn-primary py-4 font-black text-lg flex items-center justify-center gap-2 mt-4 font-oswald uppercase tracking-widest shadow-xl shadow-primary/20"
                        >
                            {loading ? <FaSpinner className="animate-spin" size={20} /> : 'Create Account'}
                        </motion.button>
                    </form>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="mt-8 text-center text-slate-500 text-sm"
                    >
                        Already have an account? <Link to="/login" className="font-bold text-primary hover:text-primary-dark transition-colors">Sign in</Link>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
