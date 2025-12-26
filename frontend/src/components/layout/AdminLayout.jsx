import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    FolderKanban,
    BookOpen,
    Image,
    MessageSquare,
    Mail,
    Settings,
    Wrench,
    FileText,
    Phone,
    Menu,
    X,
    LogOut,
    ChevronRight,
    Home,
    User,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const sidebarLinks = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/profile', label: 'My Profile', icon: User },
    { divider: true, label: 'Content Management' },
    { path: '/admin/projects', label: 'Projects', icon: FolderKanban },
    { path: '/admin/blog', label: 'Blog Posts', icon: BookOpen },
    { path: '/admin/gallery', label: 'Gallery', icon: Image },
    { path: '/admin/testimonials', label: 'Testimonials', icon: MessageSquare },
    { path: '/admin/inquiries', label: 'Inquiries', icon: Mail },
    { path: '/admin/transformations', label: 'Transformations', icon: Image },
    { divider: true, label: 'Site Settings' },
    { path: '/admin/site-settings', label: 'Hero & SEO', icon: Settings },
    { path: '/admin/services', label: 'Services', icon: Wrench },
    { path: '/admin/about', label: 'About Page', icon: FileText },
    { path: '/admin/contact-settings', label: 'Contact & Footer', icon: Phone },
];

const AdminLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    const { userInfo: user, logout, isAdmin } = useAuth();

    // Check if user is admin regarding sidebar links
    // const isAdmin = user?.role === 'Admin'; // Now using isAdmin from context

    const isActive = (path) => location.pathname === path;

    // Filter links for non-admins
    // Filter links: Admin gets everything, User gets specific links OR limited set. 
    // The user said "sidebar contents are removed". 
    // Let's allow users to see Dashboard (if they have one) or at least Profile and Website.
    // If the sidebarLinks are strictly admin features, we should defined user-specific links.
    // But for now, let's ensure they see 'My Profile' and 'View Website'.
    // The previous logic was: isAdmin ? sidebarLinks : sidebarLinks.filter(...)
    // Let's keep it but ensure the filter works correctly.

    // However, the issue "contents are removed" implies they might be seeing NOTHING or very little.
    // Let's make sure the filter includes what they need.
    const displayedLinks = isAdmin
        ? sidebarLinks
        : [
            { path: '/profile', label: 'My Profile', icon: User },
            // Add any other user-accessible links here
        ];

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#182527] px-4 py-3 flex items-center justify-between">
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="text-white p-2 hover:bg-white/10 rounded"
                >
                    <Menu className="h-6 w-6" />
                </button>
                <span className="text-[#D1B68A] font-bold">The Space Stylers</span>
                <div className="w-10" />
            </div>

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-50 h-screen w-64 bg-[#182527] flex flex-col transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* Logo - Fixed at top */}
                <div className="flex-shrink-0 p-5 border-b border-white/10">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="text-xl font-bold text-[#D1B68A]">
                            The Space Stylers
                        </Link>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden text-white p-1 hover:bg-white/10 rounded"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{isAdmin ? 'Admin Panel' : 'User Dashboard'}</p>
                </div>

                {/* Navigation - Scrollable */}
                <nav className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                    {displayedLinks.map((item, index) => {
                        if (item.divider) {
                            return (
                                <div key={index} className="mt-5 mb-2 px-3">
                                    <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                                        {item.label}
                                    </p>
                                </div>
                            );
                        }

                        const Icon = item.icon;
                        const active = isActive(item.path);

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors text-sm ${active
                                    ? 'bg-[#D1B68A] text-[#182527] font-semibold'
                                    : 'text-gray-300 hover:bg-white/10'
                                    }`}
                            >
                                <Icon className="h-4 w-4 flex-shrink-0" />
                                <span>{item.label}</span>
                                {active && <ChevronRight className="h-4 w-4 ml-auto" />}
                            </Link>
                        );
                    })}

                    {/* View Site Link */}
                    <div className="mt-6 pt-4 border-t border-white/10">
                        <Link
                            to="/"
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
                        >
                            <Home className="h-4 w-4 flex-shrink-0" />
                            <span>View Website</span>
                        </Link>
                    </div>
                </nav>

                {/* User Section - Fixed at bottom */}
                <div className="flex-shrink-0 p-4 border-t border-white/10 bg-[#182527]">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 bg-[#D1B68A] rounded-full flex items-center justify-center text-[#182527] font-bold text-sm">
                            {user?.name?.charAt(0) || 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-white font-medium text-sm truncate">{user?.name || 'User'}</p>
                            <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors text-sm"
                    >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="lg:ml-64 pt-14 lg:pt-0 min-h-screen">
                {children ? children : <Outlet />}
            </main>
        </div>
    );
};

export default AdminLayout;
