import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    FaTachometerAlt, FaTicketAlt, FaUsers, FaChartBar,
    FaCog, FaSignOutAlt, FaBook, FaShieldAlt,
    FaChevronRight, FaHeadset, FaTimes
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import kraLogo from '../assets/kra_logo.png';

const NAV_END_USER = [
    { to: '/tickets/new', icon: FaHeadset, label: 'Create Ticket' },
    { to: '/tickets', icon: FaTicketAlt, label: 'My Tickets' },
    { to: '/knowledge-base', icon: FaBook, label: 'Knowledge Base' },
];

const NAV_ICT = [
    { to: '/dashboard', icon: FaTachometerAlt, label: 'Dashboard' },
    { to: '/tickets', icon: FaTicketAlt, label: 'All Tickets' },
    { to: '/reports', icon: FaChartBar, label: 'Reports' },
    { to: '/knowledge-base', icon: FaBook, label: 'Knowledge Base' },
];

const NAV_ADMIN = [
    { to: '/dashboard', icon: FaTachometerAlt, label: 'Dashboard' },
    { to: '/tickets', icon: FaTicketAlt, label: 'All Tickets' },
    { to: '/admin/users', icon: FaUsers, label: 'User Management' },
    { to: '/reports', icon: FaChartBar, label: 'Reports & Analytics' },
    { to: '/knowledge-base', icon: FaBook, label: 'Knowledge Base' },
    { to: '/admin/settings', icon: FaCog, label: 'System Settings' },
];

const Sidebar = ({ onNavClick }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const navItems =
        user?.role === 'ADMIN' ? NAV_ADMIN :
            user?.role === 'ICT_STAFF' ? NAV_ICT :
                NAV_END_USER;

    const handleLogout = () => {
        logout();
        toast.success('Signed out successfully');
        onNavClick?.();
    };

    const roleLabel = {
        ADMIN: 'System Administrator',
        ICT_STAFF: 'ICT Support Staff',
        END_USER: 'Staff Member',
    }[user?.role] || 'User';

    const roleColor = {
        ADMIN: 'bg-purple-100 text-purple-700',
        ICT_STAFF: 'bg-blue-100 text-blue-700',
        END_USER: 'bg-emerald-100 text-emerald-700',
    }[user?.role] || 'bg-slate-100 text-slate-600';

    return (
        <aside className="sidebar shadow-sm h-full flex flex-col relative">
            {/* Close Button - Priority positioning */}
            <button
                onClick={onNavClick}
                className="absolute top-4 right-4 p-4 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-full transition-all z-[100] group"
                aria-label="Close Sidebar"
            >
                <FaTimes size={24} className="group-hover:scale-110 transition-transform" />
            </button>

            {/* KRA Brand Header */}
            <div className="bg-white px-5 py-6 border-b border-slate-100 mb-2">
                <div className="flex items-center gap-3">
                    <img
                        src={kraLogo}
                        alt="Logo"
                        className="w-10 h-10 object-contain"
                    />
                    <div>
                        <p className="text-slate-900 font-black text-sm leading-tight font-oswald uppercase tracking-tighter">KRA <span className="text-primary">ICT</span></p>
                        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Helpdesk Pro</p>
                    </div>
                </div>
            </div>

            {/* User Profile Pill */}
            <div className="px-4 py-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                        {user?.full_name?.charAt(0) || 'U'}
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-800 truncate">{user?.full_name}</p>
                        <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mt-0.5 ${roleColor}`}>
                            {roleLabel}
                        </span>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-3">
                    Navigation
                </p>
                {navItems.map(({ to, icon: Icon, label }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end={to === '/dashboard'}
                        onClick={onNavClick}
                        className={({ isActive }) =>
                            isActive ? 'nav-link-active' : 'nav-link'
                        }
                    >
                        <Icon size={18} />
                        <span className="flex-1 font-bold">{label}</span>
                        <FaChevronRight size={14} className="opacity-30" />
                    </NavLink>
                ))}
            </nav>

            {/* Footer */}
            <div className="px-3 py-4 border-t border-slate-100 space-y-1">
                <p className="text-[10px] text-slate-400 text-center mb-4 font-bold uppercase tracking-widest">
                    v1.2.0 · KRA ICT · 2026
                </p>
                <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-3 w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all font-black uppercase tracking-widest text-[11px] shadow-lg shadow-red-200"
                >
                    <FaSignOutAlt size={16} />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
