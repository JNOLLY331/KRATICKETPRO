import { useState, useEffect } from 'react';
import api from '../api/axios';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Users, UserPlus, Search, Trash2, Edit3, Shield, X } from 'lucide-react';

const ROLE_BADGE = {
    ADMIN: 'bg-purple-100 text-purple-700',
    ICT_STAFF: 'bg-blue-100 text-blue-700',
    END_USER: 'bg-emerald-100 text-emerald-700',
};

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [editUser, setEditUser] = useState(null);
    const [saving, setSaving] = useState(false);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const params = roleFilter ? `?role=${roleFilter}` : '';
            const res = await api.get(`/users/${params}`);
            setUsers(res.data.results || res.data);
        } catch {
            toast.error('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchUsers(); }, [roleFilter]);

    const handleRoleChange = async (userId, newRole) => {
        try {
            await api.patch(`/users/${userId}/`, { role: newRole });
            toast.success('Role updated');
            fetchUsers();
            setEditUser(null);
        } catch {
            toast.error('Failed to update role');
        }
    };

    const handleDelete = async (userId, userName) => {
        if (!window.confirm(`Remove ${userName} from the system?`)) return;
        try {
            await api.delete(`/users/${userId}/`);
            toast.success(`${userName} removed`);
            fetchUsers();
        } catch {
            toast.error('Failed to remove user');
        }
    };

    const filtered = users.filter(u =>
        u.full_name?.toLowerCase().includes(search.toLowerCase()) ||
        u.email?.toLowerCase().includes(search.toLowerCase()) ||
        u.staff_number?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="section-title">User Management</h1>
                    <p className="section-subtitle">{users.length} registered users · Manage roles and access</p>
                </div>
            </div>

            {/* Filters */}
            <div className="card mb-6 p-4">
                <div className="flex flex-wrap gap-3 items-center">
                    <div className="relative flex-1 min-w-[200px]">
                        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by name, email, or staff number…"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="input-field pl-10 py-2.5"
                        />
                    </div>
                    <select
                        value={roleFilter}
                        onChange={e => setRoleFilter(e.target.value)}
                        className="input-field w-44 py-2.5"
                    >
                        <option value="">All Roles</option>
                        <option value="END_USER">End User</option>
                        <option value="ICT_STAFF">ICT Staff</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                </div>
            </div>

            {/* User Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                    { label: 'End Users', count: users.filter(u => u.role === 'END_USER').length, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { label: 'ICT Staff', count: users.filter(u => u.role === 'ICT_STAFF').length, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Admins', count: users.filter(u => u.role === 'ADMIN').length, color: 'text-purple-600', bg: 'bg-purple-50' },
                ].map((s, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className={`card text-center py-4 ${s.bg} border-0`}>
                        <p className={`text-3xl font-black ${s.color}`}>{s.count}</p>
                        <p className="text-xs font-semibold text-slate-500 mt-1">{s.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Table */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card-flat">
                <div className="table-wrap rounded-2xl">
                    <table className="table-base">
                        <thead>
                            <tr>
                                <th>Staff</th>
                                <th>Email</th>
                                <th>Staff No.</th>
                                <th>Department</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                [...Array(6)].map((_, i) => (
                                    <tr key={i}>{[...Array(6)].map((_, j) => <td key={j}><div className="skeleton h-4 rounded" /></td>)}</tr>
                                ))
                            ) : filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center py-12 text-slate-400">
                                        <Users size={36} className="mx-auto mb-2 text-slate-200" />
                                        No users found
                                    </td>
                                </tr>
                            ) : filtered.map((u, i) => (
                                <motion.tr key={u.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-slate-600 font-bold text-xs flex-shrink-0">
                                                {u.full_name?.charAt(0)}
                                            </div>
                                            <span className="font-semibold text-slate-800">{u.full_name}</span>
                                        </div>
                                    </td>
                                    <td className="text-slate-500 text-xs">{u.email}</td>
                                    <td className="font-mono text-xs text-slate-500">{u.staff_number}</td>
                                    <td className="text-xs text-slate-500">{u.department_name || '—'}</td>
                                    <td>
                                        <span className={`badge text-xs ${ROLE_BADGE[u.role]}`}>
                                            <Shield size={10} />
                                            {u.role.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => setEditUser(u)}
                                                className="btn-ghost btn-sm text-xs"
                                                title="Edit role"
                                            >
                                                <Edit3 size={13} /> Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(u.id, u.full_name)}
                                                className="btn-ghost btn-sm text-xs text-red-400 hover:bg-red-50 hover:text-red-600"
                                                title="Remove user"
                                            >
                                                <Trash2 size={13} />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* Edit Role Modal */}
            {editUser && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm"
                    >
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="font-bold text-slate-900">Edit User Role</h3>
                            <button onClick={() => setEditUser(null)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                                <X size={18} />
                            </button>
                        </div>
                        <div className="mb-4">
                            <p className="font-semibold text-slate-700">{editUser.full_name}</p>
                            <p className="text-sm text-slate-400">{editUser.email}</p>
                        </div>
                        <div className="space-y-2 mb-6">
                            {['END_USER', 'ICT_STAFF', 'ADMIN'].map(role => (
                                <button
                                    key={role}
                                    onClick={() => handleRoleChange(editUser.id, role)}
                                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all ${editUser.role === role
                                            ? 'bg-primary text-white'
                                            : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                                        }`}
                                >
                                    <Shield size={14} className="inline mr-2" />
                                    {role.replace('_', ' ')}
                                    {role === editUser.role && ' (current)'}
                                </button>
                            ))}
                        </div>
                        <button onClick={() => setEditUser(null)} className="btn-secondary w-full">Cancel</button>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default AdminUsers;
