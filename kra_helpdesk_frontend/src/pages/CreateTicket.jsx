import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Send, Paperclip, AlertCircle, CheckCircle } from 'lucide-react';

const PRIORITIES = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

const SLA_INFO = {
    CRITICAL: '1 hour',
    HIGH: '4 hours',
    MEDIUM: '24 hours',
    LOW: '72 hours',
};

const CreateTicket = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [form, setForm] = useState({
        title: '',
        description: '',
        priority: 'MEDIUM',
        category: '',
    });
    const [file, setFile] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        api.get('/tickets/categories/')
            .then(r => setCategories(r.data.results || r.data))
            .catch(() => { });
    }, []);

    const validate = () => {
        const e = {};
        if (!form.title.trim()) e.title = 'Title is required';
        if (!form.description.trim()) e.description = 'Description is required';
        if (!form.category) e.category = 'Please select a category';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        try {
            const payload = new FormData();
            Object.entries(form).forEach(([k, v]) => payload.append(k, v));
            if (file) payload.append('file', file);

            const res = await api.post('/tickets/', form);
            setSuccess(res.data.ticket_id);
            toast.success(`Ticket ${res.data.ticket_id} submitted!`);
            setTimeout(() => navigate(`/tickets/${res.data.id}`), 1500);
        } catch (err) {
            const data = err.response?.data;
            if (data && typeof data === 'object') {
                setErrors(data);
            }
            toast.error('Failed to submit ticket');
        } finally {
            setLoading(false);
        }
    };

    const set = (field) => (e) => {
        setForm(f => ({ ...f, [field]: e.target.value }));
        setErrors(er => ({ ...er, [field]: undefined }));
    };

    if (success) return (
        <div className="page-container max-w-lg">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="card text-center py-16"
            >
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} className="text-emerald-500" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Ticket Submitted!</h2>
                <p className="text-slate-500 mb-4">Your support request has been logged.</p>
                <p className="font-mono text-xl font-bold text-primary">{success}</p>
                <p className="text-xs text-slate-400 mt-2">Redirecting to ticket detail…</p>
            </motion.div>
        </div>
    );

    return (
        <div className="page-container max-w-3xl">
            <div className="mb-8">
                <h1 className="section-title">Submit Support Request</h1>
                <p className="section-subtitle">Fill in the details below. Our ICT team will respond promptly.</p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="card"
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div className="form-group">
                        <label className="label" htmlFor="ticket-title">Issue Title <span className="text-red-400">*</span></label>
                        <input
                            id="ticket-title"
                            type="text"
                            className={`input-field ${errors.title ? 'border-red-300 focus:border-red-400' : ''}`}
                            placeholder="Briefly describe the issue e.g. 'Printer not connecting to network'"
                            value={form.title}
                            onChange={set('title')}
                        />
                        {errors.title && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} />{errors.title}</p>}
                    </div>

                    {/* Category & Priority */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="form-group">
                            <label className="label" htmlFor="ticket-category">Category <span className="text-red-400">*</span></label>
                            <select
                                id="ticket-category"
                                value={form.category}
                                onChange={set('category')}
                                className={`input-field ${errors.category ? 'border-red-300' : ''}`}
                            >
                                <option value="">Select a category…</option>
                                {categories.map(c => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                            {errors.category && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} />{errors.category}</p>}
                        </div>

                        <div className="form-group">
                            <label className="label" htmlFor="ticket-priority">Priority</label>
                            <select
                                id="ticket-priority"
                                value={form.priority}
                                onChange={set('priority')}
                                className="input-field"
                            >
                                {PRIORITIES.map(p => (
                                    <option key={p} value={p}>{p}</option>
                                ))}
                            </select>
                            <p className="text-xs text-slate-400">SLA target: <strong>{SLA_INFO[form.priority]}</strong></p>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="form-group">
                        <label className="label" htmlFor="ticket-desc">Detailed Description <span className="text-red-400">*</span></label>
                        <textarea
                            id="ticket-desc"
                            rows={5}
                            className={`input-field resize-none ${errors.description ? 'border-red-300' : ''}`}
                            placeholder="Describe the issue in detail. Include:&#10;• What is happening&#10;• When it started&#10;• Steps you've already tried&#10;• Error messages (if any)"
                            value={form.description}
                            onChange={set('description')}
                        />
                        {errors.description && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} />{errors.description}</p>}
                        <p className="text-xs text-slate-400 text-right">{form.description.length} characters</p>
                    </div>

                    {/* Priority info box */}
                    <div className={`alert text-xs ${form.priority === 'CRITICAL' ? 'alert-error' :
                            form.priority === 'HIGH' ? 'alert-warning' :
                                form.priority === 'MEDIUM' ? 'alert-info' : 'alert'
                        }`}>
                        <AlertCircle size={14} className="flex-shrink-0" />
                        <span>
                            <strong>{form.priority}</strong> priority tickets are targeted for resolution within <strong>{SLA_INFO[form.priority]}</strong>.
                            {form.priority === 'CRITICAL' && ' Please contact ICT staff directly if this is an emergency.'}
                        </span>
                    </div>

                    {/* Submit */}
                    <div className="flex items-center justify-between pt-2">
                        <button type="button" onClick={() => navigate('/tickets')} className="btn-ghost">
                            Cancel
                        </button>
                        <button type="submit" disabled={loading} className="btn-primary btn-lg">
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Submitting…
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <Send size={16} /> Submit Ticket
                                </span>
                            )}
                        </button>
                    </div>
                </form>
            </motion.div>

            {/* Help tip */}
            <div className="mt-4 text-center text-xs text-slate-400">
                Need urgent help? Call the ICT Helpdesk at <strong>ext. 4000</strong>
            </div>
        </div>
    );
};

export default CreateTicket;
