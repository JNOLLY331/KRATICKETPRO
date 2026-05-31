import { useState, useEffect } from 'react';
import api from '../api/axios';
import { motion } from 'framer-motion';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Cell, PieChart, Pie, Legend, LineChart, Line
} from 'recharts';
import { BarChart3, Download, Users, TrendingUp, Clock, Star } from 'lucide-react';

const PRIORITY_COLORS = { CRITICAL: '#EF4444', HIGH: '#F97316', MEDIUM: '#3B82F6', LOW: '#94A3B8' };

const Reports = () => {
    const [stats, setStats] = useState(null);
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tab, setTab] = useState('overview');

    useEffect(() => {
        Promise.all([
            api.get('/analytics/stats/'),
            api.get('/analytics/staff-performance/'),
        ]).then(([s, p]) => {
            setStats(s.data);
            setStaff(p.data);
        }).catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return (
        <div className="page-container">
            {[...Array(3)].map((_, i) => <div key={i} className="skeleton h-32 rounded-2xl mb-4" />)}
        </div>
    );

    const priorityData = (stats?.by_priority || []).map(p => ({
        name: p.priority, value: p.count, color: PRIORITY_COLORS[p.priority] || '#94A3B8',
    }));

    const categoryData = (stats?.by_category || []).map(c => ({
        name: c.category__name || 'Uncategorized', tickets: c.count,
    }));

    const TABS = ['overview', 'staff', 'categories'];

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="section-title">Reports & Analytics</h1>
                    <p className="section-subtitle">Operational insights for the ICT department</p>
                </div>
                <button className="btn-secondary flex items-center gap-2">
                    <Download size={16} /> Export PDF
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b border-slate-100 pb-1">
                {TABS.map(t => (
                    <button
                        key={t}
                        onClick={() => setTab(t)}
                        className={`px-4 py-2 text-sm font-semibold rounded-t-lg transition-all capitalize ${tab === t ? 'text-primary border-b-2 border-primary' : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        {t}
                    </button>
                ))}
            </div>

            {/* Overview Tab */}
            {tab === 'overview' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    {/* KPI Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { label: 'Total Tickets', value: stats?.total, icon: BarChart3, color: 'text-blue-500', bg: 'bg-blue-50' },
                            { label: 'Resolved', value: stats?.resolved, icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                            { label: 'Avg. Resolution (hrs)', value: stats?.avg_resolution_hours ?? '—', icon: Clock, color: 'text-purple-500', bg: 'bg-purple-50' },
                            { label: 'SLA Breached', value: stats?.sla_breached, icon: Clock, color: 'text-red-500', bg: 'bg-red-50' },
                        ].map((k, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="stat-card">
                                <div className={`stat-icon ${k.bg}`}>
                                    <k.icon size={20} className={k.color} />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">{k.label}</p>
                                    <p className="text-3xl font-black text-slate-900">{k.value}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card">
                            <h3 className="font-bold text-slate-900 mb-1">Monthly Ticket Volume</h3>
                            <p className="text-xs text-slate-400 mb-5">6-month trend</p>
                            <ResponsiveContainer width="100%" height={200}>
                                <LineChart data={stats?.monthly_trend || []}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 11 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 11 }} allowDecimals={false} />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="count" stroke="#C8102E" strokeWidth={3} dot={{ fill: '#C8102E', r: 4 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="card">
                            <h3 className="font-bold text-slate-900 mb-1">Priority Distribution</h3>
                            <p className="text-xs text-slate-400 mb-5">All-time breakdown</p>
                            <ResponsiveContainer width="100%" height={200}>
                                <PieChart>
                                    <Pie data={priorityData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} innerRadius={36}>
                                        {priorityData.map((e, i) => <Cell key={i} fill={e.color} />)}
                                    </Pie>
                                    <Tooltip />
                                    <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </motion.div>
                    </div>
                </motion.div>
            )}

            {/* Staff Tab */}
            {tab === 'staff' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card-flat">
                    <div className="px-6 py-4 border-b border-slate-50 flex items-center gap-2">
                        <Users size={18} className="text-slate-400" />
                        <h2 className="font-bold text-slate-900">ICT Staff Performance</h2>
                    </div>
                    <div className="table-wrap rounded-none">
                        <table className="table-base">
                            <thead>
                                <tr>
                                    <th>Staff Member</th>
                                    <th>Assigned</th>
                                    <th>Resolved</th>
                                    <th>Pending</th>
                                    <th>Avg. Resolution</th>
                                    <th>Rate</th>
                                </tr>
                            </thead>
                            <tbody>
                                {staff.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="text-center py-12 text-slate-400">No ICT staff data available</td>
                                    </tr>
                                ) : staff.map(s => {
                                    const rate = s.total_assigned > 0 ? Math.round((s.resolved / s.total_assigned) * 100) : 0;
                                    return (
                                        <tr key={s.id}>
                                            <td>
                                                <div>
                                                    <p className="font-semibold text-slate-800">{s.name}</p>
                                                    <p className="text-xs text-slate-400">{s.email}</p>
                                                </div>
                                            </td>
                                            <td><span className="font-bold text-slate-700">{s.total_assigned}</span></td>
                                            <td><span className="font-bold text-emerald-600">{s.resolved}</span></td>
                                            <td><span className="font-bold text-amber-600">{s.pending}</span></td>
                                            <td className="text-slate-600">{s.avg_resolution_hours != null ? `${s.avg_resolution_hours}h` : '—'}</td>
                                            <td>
                                                <div className="flex items-center gap-2">
                                                    <div className="h-1.5 w-20 bg-slate-100 rounded-full overflow-hidden">
                                                        <div className="h-full bg-primary rounded-full" style={{ width: `${rate}%` }} />
                                                    </div>
                                                    <span className="text-xs font-bold text-slate-600">{rate}%</span>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            )}

            {/* Categories Tab */}
            {tab === 'categories' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card">
                    <h2 className="font-bold text-slate-900 mb-6">Tickets by Category</h2>
                    <ResponsiveContainer width="100%" height={320}>
                        <BarChart data={categoryData} layout="vertical" margin={{ left: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                            <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 11 }} allowDecimals={false} />
                            <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 11 }} width={140} />
                            <Tooltip />
                            <Bar dataKey="tickets" fill="#C8102E" radius={[0, 4, 4, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>
            )}
        </div>
    );
};

export default Reports;
