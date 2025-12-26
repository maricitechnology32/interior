import {
  ArrowRight,
  BookOpen,
  FolderKanban,
  Image,
  Mail,
  MessageSquare,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/apiSlice';

const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + ' years ago';
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + ' months ago';
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + ' days ago';
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + ' hours ago';
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + ' minutes ago';
  return 'Just now';
};

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    blogs: 0,
    gallery: 0,
    testimonials: 0,
    newInquiries: 0,
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [projectRes, blogRes, galleryRes, inquiryRes, testimonialRes] =
          await Promise.all([
            api.get('/projects'),
            api.get('/blogs'),
            api.get('/gallery'),
            api.get('/inquiries'),
            api.get('/testimonials'),
          ]);

        const allProjects = projectRes.data;
        const allBlogs = blogRes.data;
        const allGallery = galleryRes.data;
        const allInquiries = inquiryRes.data;
        const allTestimonials = testimonialRes.data;

        const newInquiriesCount = allInquiries.filter((i) => i.status === 'New').length;
        setStats({
          projects: allProjects.length,
          blogs: allBlogs.length,
          gallery: allGallery.length,
          testimonials: allTestimonials.length,
          newInquiries: newInquiriesCount,
        });

        // Recent Activity
        const items = [
          ...allProjects.slice(0, 2).map((p) => ({ ...p, type: 'Project' })),
          ...allBlogs.slice(0, 2).map((b) => ({ ...b, type: 'Blog' })),
          ...allInquiries.slice(0, 2).map((i) => ({ ...i, type: 'Inquiry' })),
        ];
        items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setRecentActivity(items.slice(0, 5));
      } catch (err) {
        setError('Failed to load dashboard data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const statCards = [
    { label: 'Projects', value: stats.projects, icon: FolderKanban, path: '/admin/projects' },
    { label: 'Blog Posts', value: stats.blogs, icon: BookOpen, path: '/admin/blog' },
    { label: 'Gallery', value: stats.gallery, icon: Image, path: '/admin/gallery' },
    { label: 'Testimonials', value: stats.testimonials, icon: MessageSquare, path: '/admin/testimonials' },
    { label: 'New Inquiries', value: stats.newInquiries, icon: Mail, path: '/admin/inquiries', highlight: stats.newInquiries > 0 },
  ];

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <p className="text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#182527]">Dashboard</h1>
        <p className="text-gray-500 text-sm">Overview of your website content</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              to={stat.path}
              className={`bg-white p-5 border rounded hover:shadow-md transition-shadow ${stat.highlight ? 'border-[#D1B68A]' : 'border-gray-200'
                }`}
            >
              <div className="flex items-center justify-between mb-3">
                <Icon className="h-5 w-5 text-[#D1B68A]" />
                {stat.highlight && (
                  <span className="text-xs bg-[#D1B68A] text-[#182527] px-2 py-0.5 rounded font-medium">New</span>
                )}
              </div>
              <p className="text-3xl font-bold text-[#182527]">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </Link>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white border border-gray-200 rounded">
        <div className="p-5 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-[#182527]">Recent Activity</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {recentActivity.length === 0 ? (
            <p className="p-5 text-gray-500 text-center">No recent activity</p>
          ) : (
            recentActivity.map((item, index) => (
              <div key={index} className="p-4 flex items-center justify-between hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#F5F4F0] rounded flex items-center justify-center">
                    {item.type === 'Project' && <FolderKanban className="h-5 w-5 text-[#182527]" />}
                    {item.type === 'Blog' && <BookOpen className="h-5 w-5 text-[#182527]" />}
                    {item.type === 'Inquiry' && <Mail className="h-5 w-5 text-[#182527]" />}
                  </div>
                  <div>
                    <p className="font-medium text-[#182527]">
                      {item.title || item.name || (item.firstName && item.lastName ? `${item.firstName} ${item.lastName}` : null) || item.projectType || 'Untitled'}
                    </p>
                    <p className="text-xs text-gray-400">
                      {item.type} • {timeAgo(item.createdAt)}
                    </p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;