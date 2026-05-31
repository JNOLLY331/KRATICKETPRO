import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import kraLogo from '../assets/kra_logo.png';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
    FaInstagram,
    FaChevronRight,
    FaGlobe,
    FaShieldAlt,
    FaExternalLinkAlt,
    FaRegCommentDots,
    FaLifeRing,
    FaRegFileAlt,
    FaUser,
    FaCog,
    FaChevronDown,
    FaBars,
    FaTimes
} from 'react-icons/fa';

const Footer = () => {
    const [hoveredSection, setHoveredSection] = useState(null);
    const [mobileExpanded, setMobileExpanded] = useState({});

    const toggleMobileSection = (title) => {
        setMobileExpanded(prev => ({
            ...prev,
            [title]: !prev[title]
        }));
    };

    const footerSections = [
        {
            title: "Services",
            icon: <FaCog className="w-4 h-4" />,
            links: [
                { name: "Ticketing System", href: "/tickets", description: "Submit and track IT support tickets" },
                { name: "Knowledge Base", href: "/knowledge-base", description: "Self-service help and documentation" },
                { name: "IT Assets", href: "/dashboard", description: "Manage organization hardware and software" },
                { name: "Network Status", href: "/reports", description: "Real-time infrastructure monitoring" }
            ]
        },
        {
            title: "Quick Links",
            icon: <FaChevronRight className="w-4 h-4" />,
            links: [
                { name: "User Dashboard", href: "/dashboard", description: "View your personal ticket history" },
                { name: "Create Ticket", href: "/tickets/new", description: "Submit a new incident or request" },
                { name: "Admin Portal", href: "/admin/users", description: "User and system management" },
                { name: "Reports", href: "/reports", description: "ICT performance analytics" }
            ]
        },
        {
            title: "Help Center",
            icon: <FaLifeRing className="w-4 h-4" />,
            links: [
                { name: "FAQ", href: "/knowledge-base", description: "Frequently asked questions" },
                { name: "Remote Support", href: "/tickets/new", description: "Start a remote assistance session" },
                { name: "Training", href: "/knowledge-base", description: "Software and systems training" },
                { name: "Contact IT", href: "/tickets/new", description: "Direct line to ICT support team" }
            ]
        },
        {
            title: "Resources",
            icon: <FaRegFileAlt className="w-4 h-4" />,
            dropdown: true,   // ← marks this column for the upward-popup style
            links: [
                {
                    name: "System Manual",
                    href: "#",
                    description: "Full user guide for staff and administrators.",
                    sub: [
                        { label: "Staff Guide", href: "#" },
                        { label: "Admin Guide", href: "#" },
                        { label: "ICT Staff Guide", href: "#" },
                    ]
                },
                {
                    name: "Policy Documents",
                    href: "#",
                    description: "KRA ICT governance and compliance policies.",
                    sub: [
                        { label: "ICT Policy", href: "#" },
                        { label: "Data Privacy", href: "#" },
                        { label: "Acceptable Use", href: "#" },
                    ]
                },
                {
                    name: "Forms & Templates",
                    href: "#",
                    description: "Download standard ICT department forms.",
                    sub: [
                        { label: "Hardware Request", href: "#" },
                        { label: "Access Request", href: "#" },
                        { label: "Incident Report", href: "#" },
                    ]
                },
                {
                    name: "Training Portal",
                    href: "#",
                    description: "E-learning modules for KRA systems.",
                    sub: [
                        { label: "Cybersecurity 101", href: "#" },
                        { label: "Helpdesk Onboarding", href: "#" },
                    ]
                }
            ]
        }
    ];


    const contactInfo = [
        { icon: <FaEnvelope className="w-5 h-5 text-primary" />, text: "ictsupport@kra.go.ke", label: "Email Support" },
        { icon: <FaPhone className="w-5 h-5 text-primary" />, text: "+254 20 499 9999", label: "Helpline" },
        { icon: <FaMapMarkerAlt className="w-5 h-5 text-primary" />, text: "Kiptagich House Eldoret, Central Bank", label: "Location" }
    ];

    const socialLinks = [
        { icon: <FaFacebookF className="w-5 h-5" />, href: "#", color: "hover:text-blue-600" },
        { icon: <FaTwitter className="w-5 h-5" />, href: "#", color: "hover:text-sky-400" },
        { icon: <FaInstagram className="w-5 h-5" />, href: "#", color: "hover:text-pink-600" },
        { icon: <FaLinkedinIn className="w-5 h-5" />, href: "#", color: "hover:text-blue-700" }
    ];

    return (
        <footer className="relative bg-white pt-16 pb-8 overflow-hidden border-t border-slate-100">
            {/* Decorative Top Stripe - Infinite Loop */}
            <div className="absolute top-0 left-0 w-full h-1.5 overflow-hidden">
                <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        duration: 10,
                        ease: "linear"
                    }}
                    className="flex w-[400%] h-full"
                >
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className={`flex-1 h-full ${i % 2 === 0 ? 'bg-primary' : 'bg-black'}`}></div>
                    ))}
                    {[...Array(20)].map((_, i) => (
                        <div key={i + 20} className={`flex-1 h-full ${i % 2 === 0 ? 'bg-primary' : 'bg-black'}`}></div>
                    ))}
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16 px-4">

                    {/* Brand Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <div className="flex items-center gap-3">
                            <img src={kraLogo} alt="KRA Logo" className="w-14 h-14 object-contain" />
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight text-slate-900 font-oswald uppercase">
                                    KRA <span className="text-primary">ICT</span>
                                </h2>
                                <p className="text-xs font-medium text-slate-500 uppercase tracking-widest">Helpdesk System</p>
                            </div>
                        </div>

                        <p className="text-slate-600 text-sm leading-relaxed max-w-xs">
                            Providing modern, efficient, and professional IT support services to empower the Kenya Revenue Authority in its mission of national service.
                        </p>

                        <div className="flex gap-4">
                            {socialLinks.map((social, idx) => (
                                <motion.a
                                    key={idx}
                                    href={social.href}
                                    whileHover={{ y: -3, scale: 1.1 }}
                                    className={`w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 transition-colors ${social.color} border border-slate-100 shadow-sm`}
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Links Columns */}
                    {footerSections.map((section, idx) => (
                        <motion.div
                            key={section.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="relative group"
                            onMouseEnter={() => setHoveredSection(section.title)}
                            onMouseLeave={() => setHoveredSection(null)}
                        >
                            {/* Desktop View */}
                            <div className="hidden md:block">
                                <div className="flex items-center gap-2 mb-6">
                                    <span className="text-primary">{section.icon}</span>
                                    <h3 className="text-lg font-bold text-slate-900 uppercase tracking-wide font-oswald border-b-2 border-transparent group-hover:border-primary transition-all duration-300">
                                        {section.title}
                                    </h3>
                                </div>

                                <ul className="space-y-4">
                                    {section.links.map((link) => (
                                        <li key={link.name} className="relative group/item">
                                            {section.dropdown && link.sub ? (
                                                // ── Resources: upward hover dropdown ──
                                                <div className="relative">
                                                    <a
                                                        href={link.href}
                                                        className="text-slate-600 hover:text-primary text-sm font-medium flex items-center justify-between gap-2 transition-all py-1"
                                                    >
                                                        <span className="flex items-center gap-2">
                                                            <FaChevronRight className="w-3 h-3 opacity-0 group-hover/item:opacity-100 -ml-4 group-hover/item:ml-0 transition-all duration-200" />
                                                            {link.name}
                                                        </span>
                                                        <FaChevronDown className="w-2.5 h-2.5 text-slate-400 group-hover/item:text-primary transition-colors" />
                                                    </a>

                                                    {/* Upward dropdown panel */}
                                                    <AnimatePresence>
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 8, scale: 0.97 }}
                                                            whileInView={{ opacity: 0 }}
                                                            className="absolute bottom-full left-0 mb-2 w-52 bg-white border border-slate-100 shadow-2xl z-[200] rounded-sm overflow-hidden
                                                                        opacity-0 group-hover/item:opacity-100 scale-95 group-hover/item:scale-100
                                                                        pointer-events-none group-hover/item:pointer-events-auto
                                                                        transition-all duration-200 origin-bottom-left"
                                                        >
                                                            {/* Panel header */}
                                                            <div className="bg-primary px-4 py-2.5">
                                                                <p className="text-[10px] font-black text-white uppercase tracking-[0.2em]">{link.name}</p>
                                                                <p className="text-[10px] text-red-200 mt-0.5 leading-tight">{link.description}</p>
                                                            </div>
                                                            {/* Sub-links */}
                                                            <ul className="py-1">
                                                                {link.sub.map((sub) => (
                                                                    <li key={sub.label}>
                                                                        <a
                                                                            href={sub.href}
                                                                            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-red-50 hover:text-primary transition-colors"
                                                                        >
                                                                            <FaExternalLinkAlt className="w-2.5 h-2.5 text-slate-300" />
                                                                            {sub.label}
                                                                        </a>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </motion.div>
                                                    </AnimatePresence>
                                                </div>
                                            ) : (
                                                // ── Normal columns ──
                                                <>
                                                    <Link
                                                        to={link.href}
                                                        className="text-slate-600 hover:text-primary text-sm font-medium flex items-center gap-2 transition-all"
                                                    >
                                                        <FaChevronRight className="w-3 h-3 opacity-0 group-hover/item:opacity-100 -ml-4 group-hover/item:ml-0 transition-all duration-200" />
                                                        {link.name}
                                                    </Link>

                                                    {/* Tooltip on hover for normal links */}
                                                    <AnimatePresence>
                                                        {hoveredSection === section.title && (
                                                            <motion.div
                                                                initial={{ opacity: 0, x: 10 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                exit={{ opacity: 0, x: 10 }}
                                                                className="absolute -right-4 top-0 translate-x-full hidden lg:block opacity-0 group-hover/item:opacity-100 pointer-events-none z-50 w-48 p-3 bg-white border border-slate-100 rounded-xl shadow-xl ml-4"
                                                            >
                                                                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Information</p>
                                                                <p className="text-xs text-slate-600 leading-tight">{link.description}</p>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Mobile View with Hamburger Effect */}
                            <div className="md:hidden border-b border-slate-100 pb-4">
                                <button
                                    onClick={() => toggleMobileSection(section.title)}
                                    className="flex items-center justify-between w-full py-2"
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="text-primary">{section.icon}</span>
                                        <h3 className="text-lg font-bold text-slate-900 uppercase tracking-wide font-oswald">
                                            {section.title}
                                        </h3>
                                    </div>
                                    <motion.div
                                        animate={{ rotate: mobileExpanded[section.title] ? 180 : 0 }}
                                    >
                                        <FaChevronDown className="w-5 h-5 text-slate-400" />
                                    </motion.div>
                                </button>

                                <AnimatePresence>
                                    {mobileExpanded[section.title] && (
                                        <motion.ul
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden space-y-3 pt-4"
                                        >
                                            {section.links.map((link) => (
                                                <li key={link.name}>
                                                    <Link to={link.href} className="text-slate-600 text-sm font-medium block">
                                                        {link.name}
                                                    </Link>
                                                    <p className="text-xs text-slate-400 mt-0.5">{link.description}</p>
                                                </li>
                                            ))}
                                        </motion.ul>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Contact Strip */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 rounded-3xl bg-slate-50 border border-slate-100 mb-16"
                >
                    {contactInfo.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 group cursor-pointer">
                            <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-sm group-hover:bg-primary/5 group-hover:border-primary/20 transition-all duration-300">
                                {item.icon}
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.label}</p>
                                <p className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors">{item.text}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                        <span>© {new Date().getFullYear()} Kenya Revenue Authority. All rights reserved. Designed and maintained by <span className="text-primary font-bold">Japheth Anold</span> IT solutions.</span>
                        <span className="hidden md:inline">•</span>
                        <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                        <span className="hidden md:inline">•</span>
                        <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                        <span className="flex items-center gap-1.5">
                            <FaShieldAlt className="w-4 h-4 text-emerald-500" />
                            Secure Portal
                        </span>
                        <span className="flex items-center gap-1.5">
                            <FaGlobe className="w-4 h-4 text-blue-500" />
                            English (KE)
                        </span>
                    </div>
                </div>
            </div>

            {/* Floating Action Button (Mobile Only) */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center z-50 md:hidden"
            >
                <FaRegCommentDots className="w-6 h-6" />
            </motion.button>
        </footer>
    );
};

export default Footer;
