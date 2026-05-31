import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import kraLogo from '../assets/kra_logo.png';
import {
    FaTicketAlt,
    FaTachometerAlt,
    FaUserCircle,
    FaBell,
    FaChevronDown,
    FaSignOutAlt,
    FaBars,
    FaTimes,
    FaFileAlt,
    FaCog,
    FaGlobe,
    FaHome
} from 'react-icons/fa';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    const handleLogout = () => {
        logout();
        navigate('/login');
        setMobileMenuOpen(false);
    };

    const navLinks = [
        {
            name: 'Home',
            path: '/',
            icon: <FaHome />,
            dropdown: [
                { name: 'Welcome', path: '/', desc: 'Return to landing page' },
                { name: 'About Helpdesk', path: '/#about', desc: 'System information' }
            ]
        },
        {
            name: 'Dashboard',
            path: '/dashboard',
            icon: <FaTachometerAlt />,
            dropdown: [
                { name: 'My Activity', path: '/dashboard', desc: 'Overview of your support activity' },
                { name: 'Analytics', path: '/reports', desc: 'System-wide performance metrics' }
            ]
        },
        {
            name: 'Tickets',
            path: '/tickets',
            icon: <FaTicketAlt />,
            dropdown: [
                { name: 'All Tickets', path: '/tickets', desc: 'Manage your support requests' },
                { name: 'New Ticket', path: '/tickets/new', desc: 'Create a new support assistance' },
                { name: 'Knowledge Base', path: '/knowledge-base', desc: 'Self-service documentation' }
            ]
        },
        {
            name: 'Resources',
            path: '#',
            icon: <FaFileAlt />,
            dropdown: [
                { name: 'System Manual', path: '#', desc: 'Helpdesk navigation guide' },
                { name: 'Security Policy', path: '#', desc: 'ICT security requirements' },
                { name: 'User Guides', path: '#', desc: 'Step-by-step tutorials' }
            ]
        },
        {
            name: 'KRA Systems',
            path: '#',
            icon: <FaGlobe />,
            dropdown: [
                { name: 'iTax Portal', path: 'https://itax.kra.go.ke/', desc: 'PIN registration and tax returns', external: true },
                { name: 'iPage', path: '#', desc: 'Internal KRA staff portal', external: true },
                { name: 'Customs (ICMS)', path: '#', desc: 'Integrated Customs Management System', external: true },
                { name: 'M-Service', path: '#', desc: 'Mobile tax services portal', external: true }
            ]
        }
    ];

    return (
        <nav className="sticky top-0 w-full z-[100] bg-white border-b-4 border-primary shadow-md">
            {/* Top Bar (Republic of Kenya Look) */}
            <div className="bg-slate-900 text-[10px] py-1.5 px-6 text-white font-black uppercase tracking-[0.3em] flex justify-between items-center">
                <div className="flex gap-4">
                    <span className="hidden sm:inline">Republic of Kenya</span>
                    <span className="hidden md:inline text-primary">|</span>
                    <span>National Treasury</span>
                </div>
                <div className="flex gap-4">
                    <span>Contact: ictsupport@kra.go.ke</span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    <Link to="/" className="flex items-center gap-3 group">
                        <img
                            src={kraLogo}
                            alt="KRA Logo"
                            className="h-14 w-auto object-contain transition-transform group-hover:scale-105"
                        />
                        <div className="flex flex-col border-l-2 border-slate-200 pl-3">
                            <span className="text-xl md:text-2xl font-black tracking-tighter text-slate-900 font-oswald uppercase leading-none">
                                ICT <span className="text-primary">Helpdesk</span>
                            </span>
                            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-1">Institutional Support Portal</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation - Premium Horizontal Style */}
                    <div className="hidden lg:flex items-center gap-1 h-full">
                        {navLinks.map((link) => (
                            <div
                                key={link.name}
                                className="relative h-full flex items-center"
                                onMouseEnter={() => setActiveDropdown(link.name)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <Link
                                    to={link.path}
                                    className={`flex items-center gap-2 px-5 py-2.5 text-[12px] font-black uppercase tracking-wider transition-all font-oswald border-b-2 ${location.pathname === link.path
                                        ? 'text-primary border-primary bg-red-50/30'
                                        : 'text-slate-700 border-transparent hover:text-primary hover:bg-slate-50'
                                        }`}
                                >
                                    {link.name}
                                    <FaChevronDown className={`w-2 h-2 transition-transform duration-300 ${activeDropdown === link.name ? 'rotate-180' : ''}`} />
                                </Link>

                                {/* Dropdown Menu - Premium Dropdown */}
                                <AnimatePresence>
                                    {activeDropdown === link.name && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.98 }}
                                            transition={{ duration: 0.2, ease: "easeOut" }}
                                            className="absolute top-[85%] left-0 w-80 bg-white border border-slate-200 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2)] z-50 p-2 rounded-sm ring-1 ring-black/5"
                                        >
                                            {/* Top accent bar */}
                                            <div className="h-1 w-full bg-primary mb-1 rounded-t-sm"></div>

                                            <div className="p-3">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-3">Available Services</p>
                                                {link.dropdown.map((sub) => (
                                                    <Link
                                                        key={sub.name}
                                                        to={sub.path}
                                                        className="flex flex-col p-3 rounded-sm hover:bg-red-50 transition-all group/item"
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-sm font-black text-slate-800 uppercase font-oswald tracking-tight group-hover:text-primary transition-colors">
                                                                {sub.name}
                                                            </span>
                                                            {sub.external && <span className="text-[9px] bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded uppercase font-bold">Ext</span>}
                                                        </div>
                                                        <span className="text-[11px] text-slate-400 font-medium mt-0.5 group-hover:text-slate-600">{sub.desc}</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4">
                        {user ? (
                            <div className="flex items-center gap-4">
                                <button className="relative w-11 h-11 flex items-center justify-center bg-slate-100 text-slate-600 hover:bg-primary hover:text-white transition-all shadow-inner">
                                    <FaBell className="w-5 h-5" />
                                    <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-primary rounded-full border-2 border-white group-hover:bg-white group-hover:border-primary transition-all shadow-sm"></span>
                                </button>

                                <div className="h-10 w-px bg-slate-200 hidden sm:block"></div>

                                <div className="hidden sm:flex flex-col items-end mr-1">
                                    <span className="text-sm font-black text-slate-900 uppercase leading-none font-oswald tracking-tight">{user.full_name}</span>
                                    <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mt-1">{user.role.replace('_', ' ')}</span>
                                </div>

                                <button
                                    onClick={handleLogout}
                                    className="hidden lg:flex items-center gap-2 px-4 py-2 text-[11px] font-black uppercase tracking-widest text-red-600 hover:bg-red-50 border border-red-100 transition-all rounded-sm mr-4"
                                >
                                    <FaSignOutAlt className="w-3 h-3" />
                                    Sign Out
                                </button>

                                <div className="relative group">
                                    <div className="w-12 h-12 bg-slate-900 flex items-center justify-center text-white cursor-pointer shadow-lg overflow-hidden border-2 border-slate-100 transform transition-transform group-hover:scale-105">
                                        {user.profile_image ? (
                                            <img src={user.profile_image} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            <FaUserCircle className="w-7 h-7" />
                                        )}
                                    </div>

                                    {/* Account Actions */}
                                    <div className="absolute right-0 top-full mt-2 w-56 bg-white border-2 border-slate-100 shadow-2xl p-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all translate-y-4 group-hover:translate-y-0 z-[101]">
                                        <div className="p-3 border-b border-slate-50 mb-1">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Authentication</p>
                                        </div>
                                        <button className="w-full flex items-center gap-3 p-4 hover:bg-slate-50 text-slate-700 hover:text-primary text-[11px] font-black uppercase tracking-widest transition-all">
                                            <FaCog className="w-4 h-4" />
                                            Preferences
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 p-4 hover:bg-red-50 text-red-500 text-[11px] font-black uppercase tracking-widest transition-all"
                                        >
                                            <FaSignOutAlt className="w-4 h-4" />
                                            Terminate Session
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link to="/login" className="hidden sm:inline-flex items-center justify-center px-6 py-3 text-[13px] font-black text-slate-800 hover:bg-slate-100 uppercase tracking-widest font-oswald transition-all border border-transparent">
                                    Log In
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-primary text-white px-8 py-3.5 text-[13px] font-black uppercase tracking-widest shadow-xl shadow-primary/30 hover:bg-primary-dark transition-all font-oswald border-b-4 border-primary-dark"
                                >
                                    Get Started
                                </Link>
                            </div>
                        )}

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden w-12 h-12 flex items-center justify-center bg-slate-900 text-white shadow-xl"
                        >
                            {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu - Solid Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 top-[112px] bg-slate-900/95 z-[90] lg:hidden flex flex-col p-8 overflow-y-auto"
                    >
                        <div className="space-y-10 pb-16">
                            {navLinks.map((link) => (
                                <div key={link.name} className="space-y-6">
                                    <div className="flex items-center gap-4 text-white font-black uppercase tracking-widest text-2xl border-b border-white/10 pb-4 font-oswald text-primary">
                                        {link.icon}
                                        {link.name}
                                    </div>
                                    <div className="grid grid-cols-1 gap-4 pl-4">
                                        {link.dropdown.map((sub) => (
                                            sub.external ? (
                                                <a
                                                    key={sub.name}
                                                    href={sub.path}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-5 bg-white/5 border-l-4 border-slate-500 hover:border-primary hover:bg-white/10 transition-all flex justify-between items-center"
                                                >
                                                    <div>
                                                        <span className="text-lg font-black text-white font-oswald uppercase tracking-tight">{sub.name}</span>
                                                        <p className="text-[11px] text-white/50 font-bold mt-1">{sub.desc}</p>
                                                    </div>
                                                    <span className="text-[10px] bg-white/10 text-white/60 px-2 py-1 rounded uppercase font-bold">Ext</span>
                                                </a>
                                            ) : (
                                                <Link
                                                    key={sub.name}
                                                    to={sub.path}
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    className="p-5 bg-white/5 border-l-4 border-primary hover:bg-white/10 transition-all"
                                                >
                                                    <span className="text-lg font-black text-white font-oswald uppercase tracking-tight">{sub.name}</span>
                                                    <p className="text-[11px] text-white/50 font-bold mt-1">{sub.desc}</p>
                                                </Link>
                                            )
                                        ))}
                                    </div>
                                </div>
                            ))}

                            {!user && (
                                <div className="flex flex-col gap-6 pt-10">
                                    <Link
                                        to="/login"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="w-full py-5 text-center text-white border-2 border-white/20 font-black uppercase tracking-widest font-oswald"
                                    >
                                        Staff Log In
                                    </Link>
                                    <Link
                                        to="/register"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="w-full py-5 text-center bg-primary text-white font-black uppercase tracking-widest shadow-2xl font-oswald"
                                    >
                                        Create Account
                                    </Link>
                                </div>
                            )}

                            {user && (
                                <div className="pt-10 border-t border-white/10">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center justify-center gap-4 p-6 bg-red-600 text-white font-black uppercase tracking-[0.2em] font-oswald shadow-2xl"
                                    >
                                        <FaSignOutAlt />
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
