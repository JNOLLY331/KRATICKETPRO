import { useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    FaTicketAlt,
    FaCheckCircle,
    FaClock,
    FaExclamationTriangle,
    FaPlus,
    FaArrowRight,
    FaChartLine,
    FaChartBar,
    FaRegClock,
    FaBolt
} from 'react-icons/fa';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Cell, PieChart, Pie, Legend, LineChart, Line
} from 'recharts';

const PRIORITY_COLORS = {
    CRITICAL: '#EF4444',
    HIGH: '#F97316',
    MEDIUM: '#3B82F6',
    LOW: '#94A3B8',
};

const STATUS_DOT = {
    PENDING: 'bg-amber-400',
    IN_PROGRESS: 'bg-blue-400',
    RESOLVED: 'bg-emerald-400',
    CLOSED: 'bg-slate-300',
};

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, delay, ease: 'easeOut' },
});

const Dashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState(null);
    const [recentTickets, setRecentTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsRes, ticketsRes] = await Promise.all([
                    api.get('/analytics/stats/'),
                    api.get('/tickets/?ordering=-created_at'),
                ]);
                setStats(statsRes.data);
                const tickets = ticketsRes.data.results || ticketsRes.data;
                setRecentTickets(tickets.slice(0, 6));
            } catch (err) {
                console.error('Dashboard fetch error', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return (
        <div className="flex-1 flex flex-col gap-4 p-8">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="skeleton h-24 w-full rounded-2xl" />
            ))}
        </div>
    );

    const statCards = [
        {
            label: 'Total Tickets', value: stats?.total ?? 0,
            icon: FaTicketAlt, bg: 'bg-blue-50', iconColor: 'text-blue-500',
            border: 'border-blue-100',
        },
        {
            label: 'Pending', value: stats?.pending ?? 0,
            icon: FaClock, bg: 'bg-amber-50', iconColor: 'text-amber-500',
            border: 'border-amber-100',
        },
        {
            label: 'In Progress', value: stats?.in_progress ?? 0,
            icon: FaChartLine, bg: 'bg-purple-50', iconColor: 'text-purple-500',
            border: 'border-purple-100',
        },
        {
            label: 'Resolved', value: stats?.resolved ?? 0,
            icon: FaCheckCircle, bg: 'bg-emerald-50', iconColor: 'text-emerald-500',
            border: 'border-emerald-100',
        },
    ];

    const priorityData = (stats?.by_priority || []).map(p => ({
        name: p.priority,
        value: p.count,
        color: PRIORITY_COLORS[p.priority] || '#94A3B8',
    }));

    const categoryData = (stats?.by_category || []).map(c => ({
        name: c.category__name || 'Uncategorized',
        value: c.count,
    }));

    return (
        <div className="page-container">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 font-oswald uppercase tracking-tight">Dashboard Overview</h1>
                    <p className="text-sm text-slate-500 mt-1 font-medium italic">
                        Logged as <span className="text-primary font-bold not-italic">{user?.full_name}</span> ·
                        <span className="ml-1 opacity-70 underline decoration-primary/20">{new Date().toLocaleDateString('en-KE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </p>
                </div>
                <Link to="/tickets/new" className="inline-flex items-center justify-center gap-3 bg-primary hover:bg-red-700 text-white py-3.5 px-8 text-xs font-black uppercase tracking-[0.2em] font-oswald transition-all border-b-4 border-red-900 shadow-xl active:scale-95">
                    <FaPlus size={16} /> Raise Support Ticket
                </Link>
            </div>

            {/* SLA Warning */}
            {(stats?.sla_breached ?? 0) > 0 && (
                <motion.div {...fadeUp()} className="bg-amber-50 border-l-4 border-amber-500 p-5 mb-8 flex items-center gap-4 shadow-sm">
                    <div className="bg-amber-500 text-white p-2.5 rounded-lg shadow-md flex-shrink-0 animate-pulse">
                        <FaExclamationTriangle size={18} />
                    </div>
                    <span className="text-sm font-bold text-amber-900 uppercase tracking-tight">
                        Critial Alert: <span className="underline decoration-amber-300">{stats.sla_breached} ticket{stats.sla_breached > 1 ? 's' : ''}</span> have breached SLA response thresholds.
                    </span>
                </motion.div>
            )}

            {/* Stat Cards - Optimized Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10 stagger">
                {statCards.map((s, i) => (
                    <motion.div
                        key={i}
                        {...fadeUp(i * 0.05)}
                        className={`bg-white p-6 border-b-4 border-slate-50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group`}
                    >
                        <div className="flex items-start justify-between">
                            <div className={`w-12 h-12 ${s.bg} flex items-center justify-center rounded-xl shadow-inner group-hover:scale-110 transition-transform`}>
                                <s.icon size={22} className={s.iconColor} />
                            </div>
                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest px-2 py-1 border border-slate-100 rounded">LIVE</span>
                        </div>
                        <div className="mt-5">
                            <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] font-oswald mb-1">{s.label}</p>
                            <p className="text-4xl font-black text-slate-900 leading-none">{s.value}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Avg resolution & critical */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
                <motion.div {...fadeUp(0.25)} className="bg-white p-6 border-l-4 border-rose-500 shadow-sm flex items-center gap-5 hover:shadow-md transition-all">
                    <div className="w-12 h-12 bg-rose-50 flex items-center justify-center rounded-full text-rose-500">
                        <FaExclamationTriangle size={20} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-oswald">Critical Issues</p>
                        <p className="text-3xl font-black text-slate-900 leading-none mt-1">{stats?.critical ?? 0}</p>
                    </div>
                </motion.div>
                <motion.div {...fadeUp(0.3)} className="bg-white p-6 border-l-4 border-teal-500 shadow-sm flex items-center gap-5 hover:shadow-md transition-all">
                    <div className="w-12 h-12 bg-teal-50 flex items-center justify-center rounded-full text-teal-500">
                        <FaRegClock size={20} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-oswald">Avg. Resolution</p>
                        <p className="text-3xl font-black text-slate-900 leading-none mt-1">
                            {stats?.avg_resolution_hours != null ? `${stats.avg_resolution_hours}h` : '—'}
                        </p>
                    </div>
                </motion.div>
                <motion.div {...fadeUp(0.35)} className="bg-white p-6 border-l-4 border-orange-500 shadow-sm flex items-center gap-5 hover:shadow-md transition-all">
                    <div className="w-12 h-12 bg-orange-50 flex items-center justify-center rounded-full text-orange-500">
                        <FaBolt size={20} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-oswald">SLA Notifications</p>
                        <p className="text-3xl font-black text-slate-900 leading-none mt-1">{stats?.sla_breached ?? 0}</p>
                    </div>
                </motion.div>
            </div>

            {/* Charts row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                {/* Monthly trend */}
                <motion.div {...fadeUp(0.4)} className="lg:col-span-2 bg-white p-8 border border-slate-100 shadow-sm rounded-sm">
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-50">
                        <div>
                            <h2 className="text-lg font-black text-slate-900 font-oswald uppercase tracking-tight">System Performance Trend</h2>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Volume trajectory over 6 months</p>
                        </div>
                        <div className="bg-slate-50 p-2 rounded">
                            <FaChartBar size={16} className="text-slate-400" />
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={260}>
                        <LineChart data={stats?.monthly_trend || []}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 700 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 700 }} allowDecimals={false} />
                            <Tooltip contentStyle={{ borderRadius: 4, border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', fontSize: '12px' }} />
                            <Line type="monotone" dataKey="count" stroke="#C8102E" strokeWidth={4} dot={{ fill: '#C8102E', r: 5, strokeWidth: 2, stroke: '#FFF' }} activeDot={{ r: 8, strokeWidth: 0 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Priority donut */}
                <motion.div {...fadeUp(0.45)} className="bg-white p-8 border border-slate-100 shadow-sm rounded-sm flex flex-col">
                    <div className="mb-8 pb-4 border-b border-slate-50">
                        <h2 className="text-lg font-black text-slate-900 font-oswald uppercase tracking-tight">Priority Mix</h2>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Real-time distribution</p>
                    </div>
                    <div className="flex-1 min-h-[260px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={priorityData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={85} innerRadius={60} paddingAngle={5}>
                                    {priorityData.map((entry, i) => (
                                        <Cell key={i} fill={entry.color} strokeWidth={0} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ borderRadius: 4, border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
                                <Legend verticalAlign="bottom" iconType="rect" align="center" iconSize={10} wrapperStyle={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', paddingTop: '20px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>

            {/* Recent tickets + top categories */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
                {/* Recent tickets table */}
                <motion.div {...fadeUp(0.5)} className="lg:col-span-2 bg-white shadow-sm border border-slate-100 rounded-sm overflow-hidden">
                    <div className="flex items-center justify-between px-8 py-6 border-b border-slate-50 bg-slate-50/30">
                        <div>
                            <h2 className="text-lg font-black text-slate-900 font-oswald uppercase tracking-tight">Recent Activity</h2>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Direct access to latest support cases</p>
                        </div>
                        <Link to="/tickets" className="text-[11px] font-black text-primary uppercase tracking-[0.15em] hover:underline flex items-center gap-2">
                            View all Logs <FaArrowRight size={10} />
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Ticket ID</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Subject</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Level</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentTickets.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="text-center py-16 text-slate-400 font-medium">
                                            No recent transactions found.
                                        </td>
                                    </tr>
                                ) : recentTickets.map(t => (
                                    <tr key={t.id} className="hover:bg-slate-50 transition-colors group">
                                        <td className="px-8 py-5 border-b border-slate-50">
                                            <Link to={`/tickets/${t.id}`} className="font-mono text-[11px] font-black text-primary hover:text-red-700">
                                                #{t.ticket_id}
                                            </Link>
                                        </td>
                                        <td className="px-8 py-5 border-b border-slate-50 font-bold text-slate-700 text-xs truncate max-w-[200px] uppercase">{t.title}</td>
                                        <td className="px-8 py-5 border-b border-slate-50">
                                            <span className={`inline-block px-2 py-1 text-[9px] font-black uppercase tracking-tighter rounded border ${t.priority === 'CRITICAL' ? 'bg-red-50 text-red-600 border-red-100' :
                                                    t.priority === 'HIGH' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                                                        'bg-slate-50 text-slate-500 border-slate-100'
                                                }`}>
                                                {t.priority}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 border-b border-slate-50 text-right">
                                            <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-slate-600">
                                                <span className={`w-2 h-2 rounded-full ${STATUS_DOT[t.status]}`} />
                                                {t.status.replace('_', ' ')}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Top categories bar */}
                <motion.div {...fadeUp(0.45)} className="card">
                    <div className="mb-5">
                        <h2 className="font-bold text-slate-900">Top Categories</h2>
                        <p className="text-xs text-slate-400 mt-0.5">Most reported issue types</p>
                    </div>
                    {categoryData.length === 0 ? (
                        <p className="text-sm text-slate-400 text-center py-8">No data yet</p>
                    ) : (
                        <div className="space-y-3">
                            {categoryData.slice(0, 5).map((c, i) => {
                                const max = categoryData[0]?.value || 1;
                                const pct = Math.round((c.value / max) * 100);
                                return (
                                    <div key={i}>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-xs font-semibold text-slate-700 truncate">{c.name}</span>
                                            <span className="text-xs text-slate-400 ml-2 flex-shrink-0">{c.value}</span>
                                        </div>
                                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary rounded-full transition-all duration-700"
                                                style={{ width: `${pct}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;
