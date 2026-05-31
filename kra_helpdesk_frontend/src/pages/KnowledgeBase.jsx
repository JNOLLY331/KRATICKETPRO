import { motion } from 'framer-motion';
import { BookOpen, Search, ChevronRight, Wifi, Printer, Mail, Monitor, Lock, Globe, HelpCircle, HardDrive } from 'lucide-react';
import { useState } from 'react';

const ARTICLES = [
    {
        icon: Wifi, color: 'text-blue-500', bg: 'bg-blue-50',
        category: 'Network', title: 'How to connect to KRA Wi-Fi',
        content: 'Go to Network Settings → Select "KRA-CORP" → Enter your staff credentials. Contact ICT if you see an authentication error.',
        tags: ['wifi', 'network', 'internet'],
    },
    {
        icon: Printer, color: 'text-purple-500', bg: 'bg-purple-50',
        category: 'Printer', title: 'Printer not printing / offline fix',
        content: 'Check that the printer is powered on and connected. Remove pending print jobs in Control Panel → Printers. Restart the Print Spooler service.',
        tags: ['printer', 'offline', 'print'],
    },
    {
        icon: Mail, color: 'text-red-500', bg: 'bg-red-50',
        category: 'Email', title: 'Cannot send or receive emails',
        content: 'Verify your Outlook profile is connected. Check Internet connection. Clear the Outlook cache. Submit a ticket if the issue persists.',
        tags: ['email', 'outlook', 'mail'],
    },
    {
        icon: Lock, color: 'text-amber-500', bg: 'bg-amber-50',
        category: 'Account', title: 'Password reset procedure',
        content: 'Visit the IT Self-Service portal or contact ICT at ext. 4000. Your password must be at least 8 characters, with uppercase, lowercase, and numbers.',
        tags: ['password', 'reset', 'account', 'login'],
    },
    {
        icon: Monitor, color: 'text-emerald-500', bg: 'bg-emerald-50',
        category: 'Hardware', title: 'Computer slow or freezing',
        content: 'Restart your computer first. Run Disk Cleanup. Check for Windows Updates. If the problem persists, submit a HIGH priority ticket for hardware assessment.',
        tags: ['slow', 'freeze', 'performance', 'pc'],
    },
    {
        icon: Globe, color: 'text-indigo-500', bg: 'bg-indigo-50',
        category: 'Internet', title: 'Internet/VPN connectivity issues',
        content: 'Disconnect and reconnect to the VPN. Flush DNS: open CMD and type "ipconfig /flushdns". Check proxy settings are set to "Auto".',
        tags: ['vpn', 'internet', 'proxy'],
    },
    {
        icon: HardDrive, color: 'text-slate-500', bg: 'bg-slate-50',
        category: 'Software', title: 'Software installation request',
        content: 'Submit a MEDIUM priority ticket specifying the software name, version, and business justification. Admin approval is required for all installations.',
        tags: ['software', 'install', 'application'],
    },
    {
        icon: HelpCircle, color: 'text-pink-500', bg: 'bg-pink-50',
        category: 'General', title: 'How to submit a support ticket',
        content: 'Click "New Ticket" in the sidebar, select a category, set priority, describe your issue in detail, and click Submit. You will receive a unique Ticket ID.',
        tags: ['ticket', 'helpdesk', 'support'],
    },
];

const KnowledgeBase = () => {
    const [search, setSearch] = useState('');
    const [expanded, setExpanded] = useState(null);
    const [categoryFilter, setCategoryFilter] = useState('');

    const categories = [...new Set(ARTICLES.map(a => a.category))];

    const filtered = ARTICLES.filter(a => {
        const q = search.toLowerCase();
        const matchSearch = !q || a.title.toLowerCase().includes(q) || a.tags.some(t => t.includes(q));
        const matchCat = !categoryFilter || a.category === categoryFilter;
        return matchSearch && matchCat;
    });

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="section-title">Knowledge Base</h1>
                    <p className="section-subtitle">Self-service guides to resolve common ICT issues quickly</p>
                </div>
            </div>

            {/* Search */}
            <div className="max-w-2xl mx-auto mb-8">
                <div className="relative">
                    <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search articles… e.g. 'printer', 'VPN', 'password'"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="input-field pl-12 py-4 text-base shadow-sm"
                    />
                </div>
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2 mb-6">
                <button
                    onClick={() => setCategoryFilter('')}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${!categoryFilter ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                >
                    All
                </button>
                {categories.map(c => (
                    <button
                        key={c}
                        onClick={() => setCategoryFilter(c === categoryFilter ? '' : c)}
                        className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${categoryFilter === c ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                    >
                        {c}
                    </button>
                ))}
            </div>

            {/* Articles grid */}
            {filtered.length === 0 ? (
                <div className="text-center py-20 card">
                    <BookOpen size={48} className="text-slate-200 mx-auto mb-4" />
                    <p className="text-slate-400 font-medium">No articles found for "{search}"</p>
                    <p className="text-slate-400 text-sm mt-1">Try a different term or submit a support ticket.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filtered.map((article, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="card-hover cursor-pointer"
                            onClick={() => setExpanded(expanded === i ? null : i)}
                        >
                            <div className="flex items-start gap-4">
                                <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${article.bg}`}>
                                    <article.icon size={20} className={article.color} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{article.category}</span>
                                    </div>
                                    <h3 className="font-bold text-slate-800 text-sm leading-snug">{article.title}</h3>

                                    {expanded === i && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="mt-3 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3"
                                        >
                                            {article.content}
                                        </motion.div>
                                    )}
                                </div>
                                <ChevronRight
                                    size={16}
                                    className={`text-slate-300 flex-shrink-0 transition-transform mt-0.5 ${expanded === i ? 'rotate-90' : ''}`}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Submit ticket prompt */}
            <div className="mt-10 card bg-gradient-to-br from-primary/5 to-transparent border-primary/10 text-center py-8">
                <BookOpen size={32} className="text-primary mx-auto mb-3 opacity-60" />
                <h3 className="font-bold text-slate-900 mb-1">Can't find a solution?</h3>
                <p className="text-slate-500 text-sm mb-4">Submit a support ticket and our ICT team will assist you promptly.</p>
                <a href="/tickets/new" className="btn-primary">
                    Submit a Support Ticket
                </a>
            </div>
        </div>
    );
};

export default KnowledgeBase;
