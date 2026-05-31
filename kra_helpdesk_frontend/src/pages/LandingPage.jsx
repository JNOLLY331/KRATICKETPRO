import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
    FaArrowRight, FaCheckCircle,
    FaShieldAlt, FaBolt, FaClock, FaUsers,
    FaChartBar, FaStar
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import heroBg from '../assets/hero-bg.png';

// ── Typewriter Component ──────────────────────────────────────────────────────
const Typewriter = ({ text, delay = 100 }) => {
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setCurrentText(prevText => prevText + text[currentIndex]);
                setCurrentIndex(prevIndex => prevIndex + 1);
            }, delay);
            return () => clearTimeout(timeout);
        }
    }, [currentIndex, delay, text]);

    return (
        <span className="text-white font-oswald text-lg font-bold tracking-widest uppercase">
            {currentText}
            <span className="animate-pulse border-r-2 border-white ml-1">&nbsp;</span>
        </span>
    );
};

// ── Animated Counter ─────────────────────────────────────────────────────────
const StatCounter = ({ target, suffix = '', label, delay = 0, decimals = 0 }) => {
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-40px' });

    useEffect(() => {
        if (inView && !started) {
            setStarted(true);
            let startTime = null;
            const numericTarget = parseFloat(target);
            const duration = 2000;
            const step = (ts) => {
                if (!startTime) startTime = ts;
                const progress = Math.min((ts - startTime) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                setCount(eased * numericTarget);
                if (progress < 1) requestAnimationFrame(step);
                else setCount(numericTarget);
            };
            requestAnimationFrame(step);
        }
    }, [inView, started, target]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            className="px-4 text-center"
        >
            <p className="text-2xl md:text-3xl font-black text-white font-oswald tracking-tight">
                {count.toFixed(decimals)}{suffix}
            </p>
            <p className="text-[9px] font-bold text-red-100/60 uppercase tracking-widest mt-2">{label}</p>
        </motion.div>
    );
};

// ── Landing Page ─────────────────────────────────────────────────────────────
const LandingPage = () => {
    useEffect(() => {
        AOS.init({
            duration: 700,
            easing: 'ease-out-cubic',
            once: true,
            offset: 60,
        });
    }, []);

    const features = [
        { icon: <FaBolt />, title: 'Real-time Processing', desc: 'Instantaneous synchronization of ticket status across the entire department.' },
        { icon: <FaShieldAlt />, title: 'Access Security', desc: 'Granular role-based permissions integrated with existing authentication layers.' },
        { icon: <FaClock />, title: 'SLA Management', desc: 'Automated tracking of response times to maintain institutional standards.' },
        { icon: <FaChartBar />, title: 'Support Analytics', desc: 'Deep data visualization for performance metrics and bottleneck detection.' },
        { icon: <FaUsers />, title: 'Multi-Dept Support', desc: 'Standardized assistance flows for Customs, HR, and Domestic Taxes.' },
        { icon: <FaCheckCircle />, title: 'Resource Tracking', desc: 'Full lifecycle management of hardware assets linked to support requests.' },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-white">

            {/* ╔══════════════════════════════ HERO ══════════════════════════════╗ */}
            <section className="relative min-h-[85vh] flex items-center overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 z-0">
                    <img src={heroBg} alt="KRA ICT Infrastructure" className="w-full h-full object-cover" />
                    {/* Pure solid red overlay */}
                    <div className="absolute inset-0" style={{ backgroundColor: 'rgba(139,13,32,0.62)' }} />

                    {/* ── Background Floating Keywords ── */}
                    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
                        <span className="absolute top-[15%] right-[10%] text-white/[0.05] text-7xl font-black uppercase tracking-[0.4em] rotate-90 translate-x-1/2">
                            Reliability
                        </span>
                        <span className="absolute bottom-[20%] left-[5%] text-white/[0.04] text-6xl font-black uppercase tracking-[0.35em]">
                            Convenient
                        </span>
                        <span className="absolute top-[40%] right-[30%] text-white/[0.03] text-8xl font-black uppercase tracking-[0.5em] -rotate-12">
                            Urgency
                        </span>
                    </div>
                </div>

                {/* Left accent bar */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600 z-10" />

                <div className="container mx-auto px-8 relative z-10 py-16">
                    <div className="max-w-2xl">

                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, x: -15 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-[9px] font-black tracking-[0.2em] text-white uppercase bg-white/5 border border-white/10 rounded-sm backdrop-blur-md">
                                <FaStar size={7} className="text-red-400" />
                                Institutional ICT Support Architecture
                                <FaStar size={7} className="text-red-400" />
                            </span>
                        </motion.div>

                        {/* Main heading — INCREASED LINE HEIGHT */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="text-3xl md:text-4xl lg:text-[2.8rem] font-bold text-white mb-5 leading-[1.25] font-oswald uppercase tracking-tight"
                        >
                            Professional{' '}
                            <span style={{ color: '#FF0000' }}>Helpdesk</span>
                            <br />
                            <span className="text-white">Enterprise Solutions.</span>
                        </motion.h1>

                        {/* Divider — Slimmer */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.5, delay: 0.25 }}
                            className="origin-left w-20 h-0.5 bg-red-500 mb-6"
                        />

                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-[13px] text-white/70 mb-9 leading-loose max-w-lg font-medium tracking-wide uppercase"
                        >
                            Optimized technical assistance flow for the{' '}
                            <span className="text-white font-bold">KRA ICT department</span>.
                            Centralize requests, track SLAs, and ensure operational continuity.
                        </motion.p>

                        {/* Buttons — Slightly more compact */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
                        >
                            <Link
                                to="/register"
                                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3.5 px-9 text-[11px] font-black uppercase tracking-[0.15em] font-oswald transition-all shadow-xl active:scale-95 border-b-4 border-red-800"
                            >
                                Get Started <FaArrowRight size={10} />
                            </Link>
                            <Link
                                to="/login"
                                className="inline-flex items-center gap-2 px-9 py-3.5 text-[11px] font-black uppercase tracking-[0.15em] text-white font-oswald border-2 border-white/20 hover:border-white/50 hover:bg-white/5 transition-all"
                            >
                                Staff Portal
                            </Link>
                        </motion.div>
                    </div>
                </div>


            </section>

            {/* ── INFINITE SLOGAN TICKER ── */}
            <div className="bg-gray-900 overflow-hidden py-8 relative z-30">
                <motion.div
                    animate={{ x: [0, -1500] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 15,
                            ease: "linear",
                        },
                    }}
                    className="flex whitespace-nowrap gap-12 w-fit"
                >
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className="flex items-center gap-6 text-[12px] font-black uppercase tracking-[0.4em] text-white font-oswald">
                            <span>Tulipe Ushuru Tujitegemee!!</span>
                            <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                            <span className="text-primary">KRA Helpdesk</span>
                            <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* ╔══════════════════════ RED STATS BANNER ══════════════════════════╗ */}
            <div
                className="py-14 relative z-20"
                style={{
                    backgroundColor: 'hsla(0, 100%, 58%, 1.00)',
                }}
            >
                <div className="container mx-auto px-6 relative">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <StatCounter target={2500} suffix="+" label="Active Users" delay={0} decimals={0} />
                        <StatCounter target={15000} suffix="+" label="Monthly Tickets" delay={0.12} decimals={0} />
                        <StatCounter target={98.4} suffix="%" label="Resolution Rate" delay={0.24} decimals={1} />
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.36, duration: 0.5 }}
                            className="px-4 text-center"
                        >
                            <p className="text-2xl md:text-3xl font-black text-white font-oswald tracking-tight">24/7</p>
                            <p className="text-[9px] font-bold text-red-100/60 uppercase tracking-widest mt-2">Staff Ready</p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* ╔════════════════════════ FEATURES GRID ═══════════════════════════╗ */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-6">
                    {/* Section header — heading is BLACK */}
                    <div className="text-center mb-16" data-aos="fade-up">
                        <span className="inline-block mb-3 text-[10px] font-black tracking-[0.3em] text-primary uppercase">
                            — Core Capabilities —
                        </span>
                        <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-3 font-oswald uppercase tracking-tight">
                            Technical Infrastructure
                        </h2>
                        <div className="w-12 h-1 bg-primary mx-auto mt-4" />
                        <p className="text-slate-500 max-w-md mx-auto text-[11px] font-medium leading-relaxed mt-4 uppercase tracking-widest">
                            Enterprise-grade tools for mission-critical ICT support.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                data-aos="fade-up"
                                data-aos-delay={idx * 80}
                                whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(0,0,0,0.10)' }}
                                transition={{ type: 'spring', stiffness: 300 }}
                                className="bg-white p-8 border border-slate-100 group text-left relative overflow-hidden cursor-default"
                            >
                                {/* Top accent line on hover */}
                                <div className="absolute top-0 left-0 right-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                                {/* Icon */}
                                <div className="w-11 h-11 bg-red-50 flex items-center justify-center text-lg mb-5 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                    {feature.icon}
                                </div>

                                {/* Title — BLACK (not red) */}
                                <h3 className="text-sm font-black text-slate-900 mb-2 font-oswald uppercase tracking-wide">
                                    {feature.title}
                                </h3>

                                <p className="text-[12px] text-slate-500 font-medium leading-relaxed">
                                    {feature.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ╔═══════════════════════════ CTA BANNER ═══════════════════════════╗ */}
            <section
                className="py-24 relative overflow-hidden"
                style={{ backgroundColor: '#ff0b0bff' }}
            >
                {/* Decorative rings */}
                <div className="absolute top-0 left-0 w-80 h-80 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-10 bg-white" />
                <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full translate-x-1/3 translate-y-1/3 opacity-10 bg-white" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[700px] h-[700px] rounded-full border-[80px] border-white opacity-[0.03]" />
                </div>

                <div className="absolute top-0 left-0 right-0 h-1 bg-white/15" />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/15" />

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="container mx-auto px-6 text-center text-white relative z-10"
                >
                    {/* Label with dividers */}
                    <div className="flex items-center justify-center gap-4 mb-5">
                        <div className="h-px w-16 bg-white/30" />
                        <span className="text-[9px] font-black tracking-[0.35em] text-white/50 uppercase">Get Started Today</span>
                        <div className="h-px w-16 bg-white/30" />
                    </div>

                    {/* Heading — BLACK text on red, per user request */}
                    <h2 className="text-3xl md:text-4xl font-black mb-2 font-oswald uppercase tracking-tight text-slate-900">
                        Deploy Support{' '}
                        <span className="text-white underline underline-offset-4 decoration-white/30">Excellence</span>
                    </h2>

                    {/* ── Typewriter Effect ── */}
                    <div className="min-h-[1.5rem] mb-6">
                        <Typewriter text="User Support Demystified" delay={80} />
                    </div>

                    <p className="text-white/70 mb-10 text-xs max-w-md mx-auto font-medium leading-relaxed">
                        Join the KRA ICT department in improving transparency, accountability, and
                        operational performance across all regional offices.
                    </p>

                    {/* White button — high contrast on red */}
                    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                        <Link
                            to="/register"
                            className="inline-flex items-center gap-3 bg-white text-red-700 hover:bg-red-50 py-4 px-12 text-xs font-black font-oswald uppercase tracking-[0.2em] shadow-2xl transition-all border-b-4 border-red-200"
                        >
                            Register Account <FaArrowRight size={11} />
                        </Link>
                    </motion.div>

                    {/* Trust strip */}
                    <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-white/40 text-[10px] font-bold uppercase tracking-widest">
                        <span className="flex items-center gap-2"><FaShieldAlt size={10} /> Secure Access</span>
                        <div className="h-3 w-px bg-white/20 hidden sm:block" />
                        <span className="flex items-center gap-2"><FaCheckCircle size={10} /> Role-Based Control</span>
                        <div className="h-3 w-px bg-white/20 hidden sm:block" />
                        <span className="flex items-center gap-2"><FaClock size={10} /> 24/7 Availability</span>
                    </div>
                </motion.div>
            </section>

            <Footer />
        </div>
    );
};

export default LandingPage;
