import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import {
    ArrowLeft, Paperclip, MessageSquare, User, Clock,
    CheckCircle, AlertTriangle, Shield, Send, Star, UserCheck
} from 'lucide-react';

const PRIORITY_BADGE = {
    CRITICAL: 'badge-critical', HIGH: 'badge-high', MEDIUM: 'badge-medium', LOW: 'badge-low',
};

const TicketDetail = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [ticket, setTicket] = useState(null);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [noteContent, setNoteContent] = useState('');
    const [submittingNote, setSubmittingNote] = useState(false);
    const [ictStaff, setIctStaff] = useState([]);
    const [assigning, setAssigning] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState('');
    const [feedbackRating, setFeedbackRating] = useState(5);
    const [feedbackComment, setFeedbackComment] = useState('');
    const [submittingFeedback, setSubmittingFeedback] = useState(false);

    const fetchTicket = async () => {
        try {
            const [ticketRes, notesRes] = await Promise.all([
                api.get(`/tickets/${id}/`),
                api.get(`/tickets/${id}/notes/`),
            ]);
            setTicket(ticketRes.data);
            setNotes(notesRes.data.results || notesRes.data);
        } catch (err) {
            toast.error('Failed to load ticket');
            navigate('/tickets');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTicket();
        if (['ADMIN', 'ICT_STAFF'].includes(user?.role)) {
            api.get('/tickets/ict-staff-list/').then(r => setIctStaff(r.data)).catch(() => { });
        }
    }, [id]);

    const handleStatusChange = async (newStatus) => {
        try {
            await api.patch(`/tickets/${id}/`, { status: newStatus });
            toast.success(`Status updated to ${newStatus.replace('_', ' ')}`);
            fetchTicket();
        } catch {
            toast.error('Update failed');
        }
    };

    const handleAssign = async () => {
        if (!selectedStaff) return;
        setAssigning(true);
        try {
            await api.post(`/tickets/${id}/assign/`, { staff_id: selectedStaff });
            toast.success('Ticket assigned successfully');
            fetchTicket();
        } catch {
            toast.error('Assignment failed');
        } finally {
            setAssigning(false);
        }
    };

    const handleNoteSubmit = async (e) => {
        e.preventDefault();
        if (!noteContent.trim()) return;
        setSubmittingNote(true);
        try {
            await api.post(`/tickets/${id}/notes/`, { content: noteContent });
            setNoteContent('');
            toast.success('Note added');
            fetchTicket();
        } catch {
            toast.error('Failed to add note');
        } finally {
            setSubmittingNote(false);
        }
    };

    const handleFeedback = async (e) => {
        e.preventDefault();
        setSubmittingFeedback(true);
        try {
            await api.post(`/tickets/${id}/feedback/`, {
                rating: feedbackRating,
                comment: feedbackComment,
            });
            toast.success('Thank you for your feedback!');
            fetchTicket();
        } catch {
            toast.error('Failed to submit feedback');
        } finally {
            setSubmittingFeedback(false);
        }
    };

    if (loading) return (
        <div className="page-container">
            {[...Array(4)].map((_, i) => <div key={i} className="skeleton h-24 w-full rounded-2xl mb-4" />)}
        </div>
    );

    if (!ticket) return null;

    const isResolved = ticket.status === 'RESOLVED';
    const canManage = ['ADMIN', 'ICT_STAFF'].includes(user?.role);
    const isCreator = ticket.created_by === user?.id;

    return (
        <div className="page-container max-w-5xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6">
                <Link to="/tickets" className="btn-ghost btn-sm text-slate-500">
                    <ArrowLeft size={14} /> All Tickets
                </Link>
                <span className="text-slate-300">/</span>
                <span className="text-sm font-mono text-primary font-semibold">{ticket.ticket_id}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Ticket Header Card */}
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="card">
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-mono text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg font-bold">
                                    {ticket.ticket_id}
                                </span>
                                <span className={`badge ${PRIORITY_BADGE[ticket.priority]}`}>{ticket.priority}</span>
                                <span className={`badge ${ticket.status === 'RESOLVED' ? 'status-resolved' :
                                        ticket.status === 'IN_PROGRESS' ? 'status-in_progress' :
                                            ticket.status === 'CLOSED' ? 'status-closed' : 'status-pending'
                                    }`}>
                                    {ticket.status.replace('_', ' ')}
                                </span>
                            </div>
                            {isResolved && <CheckCircle size={20} className="text-emerald-500" />}
                            {ticket.priority === 'CRITICAL' && !isResolved && (
                                <AlertTriangle size={20} className="text-red-500 animate-pulse" />
                            )}
                        </div>
                        <h1 className="text-xl font-bold text-slate-900 mb-3">{ticket.title}</h1>
                        <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">{ticket.description}</p>

                        {ticket.category_name && (
                            <div className="mt-4 pt-4 border-t border-slate-50">
                                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Category: </span>
                                <span className="text-xs font-semibold text-slate-600">{ticket.category_name}</span>
                            </div>
                        )}
                    </motion.div>

                    {/* Internal Notes */}
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card">
                        <div className="flex items-center gap-2 mb-5">
                            <MessageSquare size={18} className="text-slate-400" />
                            <h2 className="font-bold text-slate-900">Activity & Notes</h2>
                            <span className="ml-auto text-xs text-slate-400">{notes.length} note{notes.length !== 1 ? 's' : ''}</span>
                        </div>

                        {notes.length === 0 ? (
                            <p className="text-sm text-slate-400 text-center py-6">No notes yet. Add the first one below.</p>
                        ) : (
                            <div className="space-y-4 mb-6">
                                {notes.map(note => (
                                    <div key={note.id} className="flex gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-slate-600 font-bold text-xs flex-shrink-0">
                                            {note.author_name?.charAt(0) || '?'}
                                        </div>
                                        <div className="flex-1 bg-slate-50 rounded-xl px-4 py-3">
                                            <div className="flex items-center gap-2 mb-1.5">
                                                <span className="text-xs font-bold text-slate-700">{note.author_name}</span>
                                                <span className="text-xs text-slate-400">
                                                    {new Date(note.created_at).toLocaleString('en-KE')}
                                                </span>
                                                {canManage && (
                                                    <span className="ml-auto">
                                                        <Shield size={10} className="text-slate-300" />
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-slate-600 leading-relaxed">{note.content}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Add note form */}
                        {canManage && (
                            <form onSubmit={handleNoteSubmit} className="flex gap-3 pt-4 border-t border-slate-100">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C8102E] to-[#8B0D20] flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                                    {user?.full_name?.charAt(0)}
                                </div>
                                <div className="flex-1 relative">
                                    <textarea
                                        value={noteContent}
                                        onChange={e => setNoteContent(e.target.value)}
                                        placeholder="Add an internal note (visible to ICT staff only)…"
                                        rows={2}
                                        className="input-field resize-none pr-12 text-sm"
                                    />
                                    <button
                                        type="submit"
                                        disabled={submittingNote || !noteContent.trim()}
                                        className="absolute right-2 bottom-2 p-1.5 bg-primary text-white rounded-lg disabled:opacity-40 hover:bg-primary-dark transition-colors"
                                    >
                                        <Send size={14} />
                                    </button>
                                </div>
                            </form>
                        )}
                    </motion.div>

                    {/* Feedback Section */}
                    {isResolved && isCreator && !ticket.feedback && (
                        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card border-emerald-100">
                            <div className="flex items-center gap-2 mb-4">
                                <Star size={18} className="text-amber-400" />
                                <h2 className="font-bold text-slate-900">Rate this Support</h2>
                            </div>
                            <form onSubmit={handleFeedback} className="space-y-4">
                                <div>
                                    <label className="label">Your Rating</label>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map(r => (
                                            <button
                                                key={r} type="button"
                                                onClick={() => setFeedbackRating(r)}
                                                className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${feedbackRating >= r
                                                        ? 'bg-amber-400 text-white shadow-sm'
                                                        : 'bg-slate-100 text-slate-400 hover:bg-amber-100'
                                                    }`}
                                            >
                                                {r}
                                            </button>
                                        ))}
                                        <span className="ml-2 text-sm text-slate-500 self-center">
                                            {feedbackRating <= 2 ? 'Poor' : feedbackRating === 3 ? 'Average' : feedbackRating === 4 ? 'Good' : 'Excellent'}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label className="label">Comment (optional)</label>
                                    <textarea
                                        value={feedbackComment}
                                        onChange={e => setFeedbackComment(e.target.value)}
                                        rows={2}
                                        className="input-field text-sm"
                                        placeholder="Share your experience…"
                                    />
                                </div>
                                <button type="submit" disabled={submittingFeedback} className="btn-success">
                                    {submittingFeedback ? 'Submitting…' : 'Submit Feedback'}
                                </button>
                            </form>
                        </motion.div>
                    )}

                    {/* Already submitted feedback */}
                    {ticket.feedback && (
                        <div className="card border-amber-100 bg-amber-50/30">
                            <div className="flex items-center gap-2 mb-2">
                                <Star size={16} className="text-amber-400" />
                                <span className="font-bold text-slate-700">Feedback Submitted</span>
                                <span className="ml-auto flex items-center gap-0.5">
                                    {[...Array(ticket.feedback.rating)].map((_, i) => (
                                        <Star key={i} size={12} className="text-amber-400 fill-amber-400" />
                                    ))}
                                </span>
                            </div>
                            {ticket.feedback.comment && (
                                <p className="text-sm text-slate-600 italic">"{ticket.feedback.comment}"</p>
                            )}
                        </div>
                    )}
                </div>

                {/* Sidebar Panel */}
                <div className="space-y-4">
                    {/* Ticket Meta */}
                    <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} className="card">
                        <h3 className="font-bold text-slate-900 mb-4 text-sm">Ticket Details</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-start gap-3 text-slate-600">
                                <User size={15} className="mt-0.5 text-slate-400 flex-shrink-0" />
                                <div>
                                    <p className="text-xs text-slate-400 font-semibold">Submitted by</p>
                                    <p className="font-semibold">{ticket.created_by_details?.full_name || '—'}</p>
                                    <p className="text-xs text-slate-400">{ticket.created_by_details?.department_name}</p>
                                </div>
                            </div>
                            <div className="divider" />
                            <div className="flex items-start gap-3 text-slate-600">
                                <UserCheck size={15} className="mt-0.5 text-slate-400 flex-shrink-0" />
                                <div>
                                    <p className="text-xs text-slate-400 font-semibold">Assigned to</p>
                                    <p className="font-semibold">{ticket.assigned_to_details?.full_name || <span className="text-slate-400 italic">Unassigned</span>}</p>
                                </div>
                            </div>
                            <div className="divider" />
                            <div className="flex items-start gap-3 text-slate-600">
                                <Clock size={15} className="mt-0.5 text-slate-400 flex-shrink-0" />
                                <div>
                                    <p className="text-xs text-slate-400 font-semibold">Created</p>
                                    <p className="font-semibold text-xs">{new Date(ticket.created_at).toLocaleString('en-KE')}</p>
                                </div>
                            </div>
                            {ticket.resolved_at && (
                                <>
                                    <div className="divider" />
                                    <div className="flex items-start gap-3 text-slate-600">
                                        <CheckCircle size={15} className="mt-0.5 text-emerald-400 flex-shrink-0" />
                                        <div>
                                            <p className="text-xs text-slate-400 font-semibold">Resolved</p>
                                            <p className="font-semibold text-xs">{new Date(ticket.resolved_at).toLocaleString('en-KE')}</p>
                                        </div>
                                    </div>
                                </>
                            )}
                            {ticket.due_date && (
                                <>
                                    <div className="divider" />
                                    <div className="flex items-start gap-3">
                                        <AlertTriangle size={15} className={`mt-0.5 flex-shrink-0 ${new Date(ticket.due_date) < new Date() && !isResolved ? 'text-red-400' : 'text-slate-400'}`} />
                                        <div>
                                            <p className="text-xs text-slate-400 font-semibold">SLA Deadline</p>
                                            <p className={`font-semibold text-xs ${new Date(ticket.due_date) < new Date() && !isResolved ? 'text-red-500' : ''}`}>
                                                {new Date(ticket.due_date).toLocaleString('en-KE')}
                                            </p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </motion.div>

                    {/* Status control */}
                    {canManage && (
                        <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 }} className="card">
                            <h3 className="font-bold text-slate-900 mb-3 text-sm">Update Status</h3>
                            <div className="grid grid-cols-1 gap-2">
                                {['PENDING', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'].filter(s => s !== ticket.status).map(s => (
                                    <button
                                        key={s}
                                        onClick={() => handleStatusChange(s)}
                                        className={`btn btn-sm text-xs justify-start ${s === 'RESOLVED' ? 'btn-success' :
                                                s === 'IN_PROGRESS' ? 'btn bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-300' :
                                                    s === 'CLOSED' ? 'btn-secondary' : 'btn bg-amber-500 text-white hover:bg-amber-600'
                                            }`}
                                    >
                                        → Mark as {s.replace('_', ' ')}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Assign ticket */}
                    {canManage && (
                        <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 }} className="card">
                            <h3 className="font-bold text-slate-900 mb-3 text-sm">Assign Ticket</h3>
                            <div className="space-y-2">
                                <select
                                    value={selectedStaff}
                                    onChange={e => setSelectedStaff(e.target.value)}
                                    className="input-field text-sm py-2"
                                >
                                    <option value="">Select ICT Staff…</option>
                                    {ictStaff.map(s => (
                                        <option key={s.id} value={s.id}>{s.full_name}</option>
                                    ))}
                                </select>
                                <button
                                    onClick={handleAssign}
                                    disabled={!selectedStaff || assigning}
                                    className="btn-primary w-full text-sm"
                                >
                                    {assigning ? 'Assigning…' : 'Assign Now'}
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* Attachments */}
                    {ticket.attachments?.length > 0 && (
                        <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.16 }} className="card">
                            <div className="flex items-center gap-2 mb-3">
                                <Paperclip size={15} className="text-slate-400" />
                                <h3 className="font-bold text-slate-900 text-sm">Attachments</h3>
                            </div>
                            <div className="space-y-2">
                                {ticket.attachments.map(att => (
                                    <a key={att.id} href={att.file} target="_blank" rel="noreferrer"
                                        className="flex items-center gap-2 text-xs text-primary hover:underline truncate">
                                        <Paperclip size={12} />
                                        {att.file.split('/').pop()}
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TicketDetail;
