import { useState, useEffect, useCallback } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import {
    Plus, Search, Filter, RefreshCw, Ticket,
    ChevronLeft, ChevronRight, X
} from 'lucide-react';

const STATUSES = ['', 'PENDING', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'];
const PRIORITIES = ['', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

const STATUS_BADGE = {
    PENDING: 'status-pending',
    IN_PROGRESS: 'status-in_progress',
    RESOLVED: 'status-resolved',
    CLOSED: 'status-closed',
};

const PRIORITY_BADGE = {
    CRITICAL: 'badge-critical',
    HIGH: 'badge-high',
    MEDIUM: 'badge-medium',
    LOW: 'badge-low',
};

const TicketList = () => {
    const { user } = useAuth();
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('');
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const PAGE_SIZE = 12;

    const fetchTickets = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (search) params.append('search', search);
            if (statusFilter) params.append('status', statusFilter);
            if (priorityFilter) params.append('priority', priorityFilter);
            params.append('ordering', '-created_at');
            const res = await api.get(`/tickets/?${params.toString()}`);
            const data = res.data.results || res.data;
            setTickets(data);
            setTotalCount(res.data.count || data.length);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [search, statusFilter, priorityFilter, page]);

    useEffect(() => {
        const timer = setTimeout(fetchTickets, 300);
        return () => clearTimeout(timer);
    }, [fetchTickets]);

    const clearFilters = () => {
        setSearch('');
        setStatusFilter('');
        setPriorityFilter('');
        setPage(1);
    };

    const hasFilters = search || statusFilter || priorityFilter;

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="section-title">Support Tickets</h1>
                    <p className="section-subtitle">
                        {totalCount} ticket{totalCount !== 1 ? 's' : ''} · {user?.role === 'END_USER' ? 'Your requests' : 'All requests'}
                    </p>
                </div>
                <Link to="/tickets/new" className="btn-primary">
                    <Plus size={16} /> New Ticket
                </Link>
            </div>

            {/* Filters */}
            <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="card mb-6 p-4"
            >
                <div className="flex flex-wrap gap-3 items-center">
                    {/* Search */}
                    <div className="relative flex-1 min-w-[200px]">
                        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by ticket ID or title…"
                            value={search}
                            onChange={e => { setSearch(e.target.value); setPage(1); }}
                            className="input-field pl-10 py-2.5"
                        />
                    </div>

                    {/* Status filter */}
                    <select
                        value={statusFilter}
                        onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
                        className="input-field w-40 py-2.5"
                    >
                        {STATUSES.map(s => (
                            <option key={s} value={s}>{s ? s.replace('_', ' ') : 'All Statuses'}</option>
                        ))}
                    </select>

                    {/* Priority filter */}
                    <select
                        value={priorityFilter}
                        onChange={e => { setPriorityFilter(e.target.value); setPage(1); }}
                        className="input-field w-40 py-2.5"
                    >
                        {PRIORITIES.map(p => (
                            <option key={p} value={p}>{p || 'All Priorities'}</option>
                        ))}
                    </select>

                    {/* Actions */}
                    <button onClick={fetchTickets} className="btn-ghost" title="Refresh">
                        <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
                    </button>
                    {hasFilters && (
                        <button onClick={clearFilters} className="btn-secondary flex items-center gap-1.5">
                            <X size={14} /> Clear
                        </button>
                    )}
                </div>
            </motion.div>

            {/* Table */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="card-flat"
            >
                <div className="table-wrap rounded-2xl">
                    <table className="table-base">
                        <thead>
                            <tr>
                                <th>Ticket ID</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Priority</th>
                                <th>Status</th>
                                <th>Created</th>
                                <th>Assigned To</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                [...Array(6)].map((_, i) => (
                                    <tr key={i}>
                                        {[...Array(8)].map((_, j) => (
                                            <td key={j}><div className="skeleton h-4 rounded" /></td>
                                        ))}
                                    </tr>
                                ))
                            ) : tickets.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="text-center py-16">
                                        <Ticket size={40} className="text-slate-200 mx-auto mb-3" />
                                        <p className="text-slate-400 font-medium">No tickets found</p>
                                        {user?.role === 'END_USER' && (
                                            <Link to="/tickets/new" className="btn-primary btn-sm mt-3 inline-flex">
                                                Submit your first ticket
                                            </Link>
                                        )}
                                    </td>
                                </tr>
                            ) : tickets.map((t, i) => (
                                <motion.tr
                                    key={t.id}
                                    initial={{ opacity: 0, y: 4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.03 }}
                                >
                                    <td>
                                        <Link to={`/tickets/${t.id}`} className="font-mono text-xs text-primary font-bold hover:underline">
                                            {t.ticket_id}
                                        </Link>
                                    </td>
                                    <td className="max-w-[220px]">
                                        <Link to={`/tickets/${t.id}`} className="font-semibold text-slate-800 hover:text-primary line-clamp-1">
                                            {t.title}
                                        </Link>
                                    </td>
                                    <td className="text-slate-500 text-xs">{t.category_name || '—'}</td>
                                    <td><span className={`badge ${PRIORITY_BADGE[t.priority]}`}>{t.priority}</span></td>
                                    <td>
                                        <span className="flex items-center gap-1.5 text-xs font-semibold">
                                            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${t.status === 'RESOLVED' ? 'bg-emerald-400' :
                                                    t.status === 'IN_PROGRESS' ? 'bg-blue-400' :
                                                        t.status === 'CLOSED' ? 'bg-slate-300' : 'bg-amber-400'
                                                }`} />
                                            {t.status.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td className="text-xs text-slate-400 whitespace-nowrap">
                                        {new Date(t.created_at).toLocaleDateString('en-KE')}
                                    </td>
                                    <td className="text-xs text-slate-500">
                                        {t.assigned_to_details?.full_name || <span className="text-slate-300 italic">Unassigned</span>}
                                    </td>
                                    <td>
                                        <Link to={`/tickets/${t.id}`} className="btn-ghost btn-sm text-xs">
                                            View →
                                        </Link>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalCount > PAGE_SIZE && (
                    <div className="flex items-center justify-between px-5 py-3.5 border-t border-slate-50">
                        <p className="text-xs text-slate-400">
                            Showing {Math.min((page - 1) * PAGE_SIZE + 1, totalCount)}–{Math.min(page * PAGE_SIZE, totalCount)} of {totalCount}
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="btn-ghost btn-sm"
                            >
                                <ChevronLeft size={14} />
                            </button>
                            <span className="text-xs font-semibold text-slate-600">Page {page}</span>
                            <button
                                onClick={() => setPage(p => p + 1)}
                                disabled={page * PAGE_SIZE >= totalCount}
                                className="btn-ghost btn-sm"
                            >
                                <ChevronRight size={14} />
                            </button>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default TicketList;
