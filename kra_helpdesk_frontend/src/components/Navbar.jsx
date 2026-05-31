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
    const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(null);

    const handleLogout = () => {
        logout();
        navigate('/login');
        setMobileMenuOpen(false);
    };

    const toggleMobileSubmenu = (menuName) => {
        setMobileSubmenuOpen(mobileSubmenuOpen === menuName ? null : menuName);
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
            <div className="bg-slate-900 text-[10px] py-1.5 px-4 sm:px-6 text-white font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] flex justify-between items-center transition-all duration-300">
                <div className="flex gap-2 sm:gap-4 overflow-hidden text-ellipsis whitespace-nowrap">
                    <span className="hidden xs:inline">Republic of Kenya</span>
                    <span className="hidden sm:inline text-primary">|</span>
                    <span className="truncate">National Treasury</span>
                </div>
                <div className="flex gap-4 flex-shrink-0">
                    <span className="hidden sm:inline">Contact: ictsupport@kra.go.ke</span>
                    <span className="sm:hidden text-primary font-bold">ICT HELP</span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 md:h-20 transition-all duration-300">

                    <Link to="/" className="flex items-center gap-2 md:gap-3 group">
                        <img
                            src={kraLogo}
                            alt="KRA Logo"
                            className="h-10 md:h-14 w-auto object-contain transition-transform group-hover:scale-105"
                        />
                        <div className="flex flex-col border-l-2 border-slate-200 pl-2 md:pl-3">
                            <span className="text-lg md:text-2xl font-black tracking-tighter text-slate-900 font-oswald uppercase leading-none">
                                ICT <span className="text-primary">Helpdesk</span>
                            </span>
                            <span className="text-[8px] md:text-[9px] font-bold text-slate-500 uppercase tracking-[0.1em] md:tracking-[0.2em] mt-0.5 md:mt-1">Institutional Support Portal</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
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
                                    className={`flex items-center gap-2 px-4 xl:px-5 py-2.5 text-[11px] xl:text-[12px] font-black uppercase tracking-wider transition-all font-oswald border-b-2 ${location.pathname === link.path
                                        ? 'text-primary border-primary bg-red-50/30'
                                        : 'text-slate-700 border-transparent hover:text-primary hover:bg-slate-50'
                                        }`}
                                >
                                    {link.name}
                                    <FaChevronDown className={`w-2 h-2 transition-transform duration-300 ${activeDropdown === link.name ? 'rotate-180' : ''}`} />
                                </Link>

                                <AnimatePresence>
                                    {activeDropdown === link.name && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.98 }}
                                            transition={{ duration: 0.2, ease: "easeOut" }}
                                            className="absolute top-[85%] left-0 w-80 bg-white border border-slate-200 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2)] z-50 p-2 rounded-sm ring-1 ring-black/5"
                                        >
                                            <div className="h-1 w-full bg-primary mb-1 rounded-t-sm"></div>
                                            <div className="p-3">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-3">Available Services</p>
                                                {link.dropdown.map((sub) => (
                                                    sub.external ? (
                                                        <a
                                                            key={sub.name}
                                                            href={sub.path}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex flex-col p-3 rounded-sm hover:bg-red-50 transition-all group/item"
                                                        >
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-sm font-black text-slate-800 uppercase font-oswald tracking-tight group-hover:text-primary transition-colors">
                                                                    {sub.name}
                                                                </span>
                                                                <span className="text-[9px] bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded uppercase font-bold">Ext</span>
                                                            </div>
                                                            <span className="text-[11px] text-slate-400 font-medium mt-0.5 group-hover:text-slate-600">{sub.desc}</span>
                                                        </a>
                                                    ) : (
                                                        <Link
                                                            key={sub.name}
                                                            to={sub.path}
                                                            className="flex flex-col p-3 rounded-sm hover:bg-red-50 transition-all group/item"
                                                        >
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-sm font-black text-slate-800 uppercase font-oswald tracking-tight group-hover:text-primary transition-colors">
                                                                    {sub.name}
                                                                </span>
                                                            </div>
                                                            <span className="text-[11px] text-slate-400 font-medium mt-0.5 group-hover:text-slate-600">{sub.desc}</span>
                                                        </Link>
                                                    )
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-2 md:gap-4">
                        {user ? (
                            <div className="flex items-center gap-2 md:gap-4">
                                <button className="relative w-10 h-10 md:w-11 md:h-11 flex items-center justify-center bg-slate-100 text-slate-600 hover:bg-primary hover:text-white transition-all shadow-inner">
                                    <FaBell className="w-4 h-4 md:w-5 md:h-5" />
                                    <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-white shadow-sm"></span>
                                </button>

                                <div className="h-8 md:h-10 w-px bg-slate-200 hidden sm:block"></div>

                                <div className="hidden md:flex flex-col items-end mr-1">
                                    <span className="text-sm font-black text-slate-900 uppercase leading-none font-oswald tracking-tight whitespace-nowrap">{user.full_name}</span>
                                    <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mt-1 whitespace-nowrap">{user.role?.replace('_', ' ')}</span>
                                </div>

                                <div className="relative group">
                                    <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-900 flex items-center justify-center text-white cursor-pointer shadow-lg overflow-hidden border-2 border-slate-100 transform transition-transform group-hover:scale-105">
                                        {user.profile_image ? (
                                            <img src={user.profile_image} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            <FaUserCircle className="w-6 h-6 md:w-7 md:h-7" />
                                        )}
                                    </div>

                                    {/* Desktop Profile Dropdown */}
                                    <div className="absolute right-0 top-full mt-2 w-56 bg-white border-2 border-slate-100 shadow-2xl p-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all translate-y-2 group-hover:translate-y-0 z-[101]">
                                        <div className="p-3 border-b border-slate-50 mb-1">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Authentication</p>
                                        </div>
                                        <Link to="/profile" className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 text-slate-700 hover:text-primary text-[11px] font-black uppercase tracking-widest transition-all">
                                            <FaUserCircle className="w-4 h-4" />
                                            My Profile
                                        </Link>
                                        <button className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 text-slate-700 hover:text-primary text-[11px] font-black uppercase tracking-widest transition-all">
                                            <FaCog className="w-4 h-4" />
                                            Settings
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 p-3 hover:bg-red-50 text-red-500 text-[11px] font-black uppercase tracking-widest transition-all mt-1"
                                        >
                                            <FaSignOutAlt className="w-4 h-4" />
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link to="/login" className="hidden sm:inline-flex items-center justify-center px-4 md:px-6 py-2.5 text-[12px] md:text-[13px] font-black text-slate-800 hover:bg-slate-100 uppercase tracking-widest font-oswald transition-all border border-transparent">
                                    Log In
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-primary text-white px-4 md:px-8 py-2.5 md:py-3.5 text-[12px] md:text-[13px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:bg-primary-dark transition-all font-oswald border-b-4 border-primary-dark"
                                >
                                    Get Started
                                </Link>
                            </div>
                        )}

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden w-10 h-10 flex items-center justify-center bg-primary text-white shadow-lg transition-all active:scale-95 hover:bg-primary-dark"
                            aria-label="Toggle Menu"
                        >
                            {mobileMenuOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu - Slide-out drawer style */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[110] lg:hidden"
                        />

                        {/* Drawer */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-0 w-full bg-white z-[120] lg:hidden flex flex-col shadow-2xl overflow-hidden"
                        >
                            {/* Drawer Header */}
                            <div className="flex flex-col border-b border-slate-100">
                                <div className="h-1 w-full bg-primary" />
                                <div className="px-5 py-4 flex justify-between items-center bg-white">
                                    <div className="flex items-center gap-3">
                                        <img src={kraLogo} alt="KRA Logo" className="h-10 w-auto" />
                                        <div className="flex flex-col border-l-2 border-slate-100 pl-3">
                                            <span className="text-slate-900 font-black font-oswald uppercase tracking-tight text-lg leading-none">
                                                ICT <span className="text-primary">Helpdesk</span>
                                            </span>
                                            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.15em] mt-0.5">Navigation Menu</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="w-9 h-9 flex items-center justify-center bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-primary transition-colors rounded-lg border border-slate-200"
                                        aria-label="Close menu"
                                    >
                                        <FaTimes size={14} />
                                    </button>
                                </div>
                            </div>

                            {/* User Section in Drawer */}
                            {user && (
                                <div className="p-6 bg-slate-50 border-b border-slate-100">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-white flex items-center justify-center text-slate-400 shadow-xl overflow-hidden border-2 border-slate-100 rounded-xl">
                                            {user.profile_image ? (
                                                <img src={user.profile_image} alt="" className="w-full h-full object-cover" />
                                            ) : (
                                                <FaUserCircle className="w-8 h-8" />
                                            )}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-lg font-black text-slate-900 font-oswald uppercase tracking-tight leading-none">{user.full_name}</span>
                                            <span className="text-[11px] font-bold text-primary uppercase tracking-[0.2em] mt-1">{user.role?.replace('_', ' ')}</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 mt-6">
                                        <Link
                                            to="/profile"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="flex items-center justify-center gap-2 py-3 bg-white text-[10px] text-slate-700 font-black uppercase tracking-widest hover:bg-slate-100 transition-all border border-slate-200 rounded-lg"
                                        >
                                            <FaUserCircle /> My Profile
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center justify-center gap-2 py-3 bg-red-50 text-[10px] text-red-600 font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all border border-red-100 rounded-lg"
                                        >
                                            <FaSignOutAlt /> Log Out
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Drawer Content */}
                            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                                <div className="space-y-2">
                                    {navLinks.map((link) => (
                                        <div key={link.name} className="border-b border-slate-100 last:border-0">
                                            <button
                                                onClick={() => toggleMobileSubmenu(link.name)}
                                                className={`w-full flex items-center justify-between p-4 transition-all rounded-xl ${mobileSubmenuOpen === link.name ? 'text-primary bg-red-50/50' : 'text-slate-600 hover:bg-slate-50'}`}
                                            >
                                                <div className="flex items-center gap-4 text-lg font-black uppercase tracking-widest font-oswald">
                                                    <span className={`${mobileSubmenuOpen === link.name ? 'text-primary' : 'text-slate-400'}`}>{link.icon}</span>
                                                    {link.name}
                                                </div>
                                                <FaChevronDown className={`w-3 h-3 transition-transform duration-300 ${mobileSubmenuOpen === link.name ? 'rotate-180' : ''}`} />
                                            </button>

                                            <AnimatePresence>
                                                {mobileSubmenuOpen === link.name && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="overflow-hidden mx-2 mb-2"
                                                    >
                                                        <div className="bg-slate-50 border border-slate-100 rounded-xl p-2 space-y-1">
                                                            {link.dropdown.map((sub) => (
                                                                sub.external ? (
                                                                    <a
                                                                        key={sub.name}
                                                                        href={sub.path}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="flex flex-col p-3 rounded-lg hover:bg-white hover:shadow-sm transition-all group border border-transparent hover:border-slate-200"
                                                                    >
                                                                        <div className="flex items-center justify-between">
                                                                            <span className="text-[12px] font-black text-slate-800 uppercase tracking-tight font-oswald group-hover:text-primary transition-colors">{sub.name}</span>
                                                                            <span className="text-[8px] bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded uppercase font-bold">Ext</span>
                                                                        </div>
                                                                        <p className="text-[10px] text-slate-400 mt-0.5 font-medium">{sub.desc}</p>
                                                                    </a>
                                                                ) : (
                                                                    <Link
                                                                        key={sub.name}
                                                                        to={sub.path}
                                                                        onClick={() => setMobileMenuOpen(false)}
                                                                        className="flex flex-col p-3 rounded-lg hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-slate-200"
                                                                    >
                                                                        <span className="text-[12px] font-black text-slate-800 uppercase tracking-tight font-oswald hover:text-primary transition-colors">{sub.name}</span>
                                                                        <p className="text-[10px] text-slate-400 mt-0.5 font-medium">{sub.desc}</p>
                                                                    </Link>
                                                                )
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </div>

                                {!user && (
                                    <div className="grid grid-cols-1 gap-3 mt-6 px-4">
                                        <Link
                                            to="/login"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="w-full py-3.5 text-center text-slate-700 border-2 border-slate-200 font-black uppercase tracking-widest font-oswald hover:border-primary hover:text-primary transition-all rounded-lg bg-white shadow-sm text-[12px]"
                                        >
                                            Staff Log In
                                        </Link>
                                        <Link
                                            to="/register"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="w-full py-3.5 text-center bg-primary text-white font-black uppercase tracking-widest font-oswald hover:bg-primary-dark transition-all rounded-lg shadow-lg shadow-primary/20 text-[12px] border-b-4 border-primary-dark"
                                        >
                                            Create Account
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Drawer Footer */}
                            <div className="px-5 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em]">KRA ICT Helpdesk &copy; {new Date().getFullYear()}</p>
                                <span className="text-[9px] text-primary font-black uppercase tracking-widest">Kenya Revenue Authority</span>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
