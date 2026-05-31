import { FaBell, FaSearch, FaBars, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const TopBar = ({ onMenuToggle }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        toast.success('Signed out successfully');
        navigate('/login');
    };

    return (
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 sm:px-6 py-3 flex items-center justify-between gap-4 h-16 md:h-20 transition-all">
            {/* Mobile menu toggle */}
            <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={onMenuToggle}
                className="flex items-center gap-2 p-2 sm:px-4 text-slate-700 hover:bg-slate-50 rounded-lg transition-all border border-slate-200 shadow-sm active:shadow-inner group"
            >
                <FaBars size={18} className="text-primary group-hover:rotate-90 transition-transform duration-300" />
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] font-oswald hidden xs:block">System Menu</span>
            </motion.button>

            {/* Search - Hidden on very small screens */}
            <div className="flex-1 max-w-md hidden md:block">
                <div className="relative group">
                    <FaSearch size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Search tickets, IDs…"
                        className="w-full pl-11 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white transition-all shadow-sm"
                    />
                </div>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2 sm:gap-4">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative p-2.5 text-slate-500 hover:bg-primary/5 hover:text-primary rounded-xl transition-all"
                >
                    <FaBell size={18} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-white shadow-sm" />
                </motion.button>

                <div className="h-8 w-px bg-slate-100 hidden xs:block" />

                <div className="flex items-center gap-2 sm:gap-3">
                    <div className="text-right hidden sm:block">
                        <p className="text-[12px] font-black text-slate-900 uppercase tracking-tight leading-none whitespace-nowrap">{user?.full_name}</p>
                        <p className="text-[9px] font-bold text-primary uppercase tracking-widest mt-1">{user?.role?.replace('_', ' ')}</p>
                    </div>
                    <motion.div
                        whileHover={{ y: -2 }}
                        className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg bg-slate-900 flex items-center justify-center text-white shadow-lg overflow-hidden border-2 border-white"
                    >
                        {user?.profile_image ? (
                            <img src={user.profile_image} alt="" className="w-full h-full object-cover" />
                        ) : (
                            <FaUserCircle size={20} className="sm:size-24" />
                        )}
                    </motion.div>
                </div>

                <div className="h-8 w-px bg-slate-100 hidden sm:block" />

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="flex items-center justify-center sm:justify-start gap-2.5 w-10 h-10 sm:w-auto sm:px-4 sm:py-2.5 bg-red-50 text-primary hover:bg-primary hover:text-white rounded-lg transition-all font-black text-[10px] uppercase tracking-widest border border-red-100 shadow-sm"
                    title="Sign Out"
                >
                    <FaSignOutAlt size={14} />
                    <span className="hidden lg:inline">Sign Out</span>
                </motion.button>
            </div>
        </header>
    );
};

export default TopBar;
