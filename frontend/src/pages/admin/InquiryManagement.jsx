// import React, { useState, useEffect } from 'react';
// import api from '../../api/apiSlice';

// const InquiryManagement = () => {
//   // --- State ---
//   const [inquiries, setInquiries] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // --- Data Fetching ---
//   const fetchInquiries = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const { data } = await api.get('/inquiries');
//       setInquiries(data);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to fetch inquiries.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchInquiries();
//   }, []);

//   // --- Handlers ---

//   // Handle Deletion
//   const deleteHandler = async (id) => {
//     if (window.confirm('Are you sure you want to delete this inquiry?')) {
//       try {
//         await api.delete(`/inquiries/${id}`);
//         fetchInquiries(); // Refresh the list
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to delete inquiry.');
//       }
//     }
//   };

//   // Handle Status Change
//   const statusChangeHandler = async (id, newStatus) => {
//     try {
//       await api.put(`/inquiries/${id}`, { status: newStatus });
//       fetchInquiries(); // Refresh the list
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to update status.');
//     }
//   };

//   // Helper to get color for status badge
//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'New':
//         return 'bg-blue-100 text-blue-800';
//       case 'Contacted':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'Closed':
//         return 'bg-green-100 text-green-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   // --- Render ---
//   return (
//     <div className="p-4">
//       <h1 className="mb-8 text-3xl font-bold text-gray-900">
//         Client Inquiries
//       </h1>

//       {loading && <p>Loading inquiries...</p>}
//       {error && (
//         <div className="rounded bg-red-100 p-3 text-red-700">{error}</div>
//       )}

//       {!loading && !error && (
//         <div className="overflow-x-auto rounded border border-gray-200 bg-white shadow-md">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
//                   Date
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
//                   Name
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
//                   Contact
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
//                   Message
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-right text-xs font-medium uppercase text-gray-500">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {inquiries.length === 0 ? (
//                 <tr>
//                   <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
//                     No inquiries found.
//                   </td>
//                 </tr>
//               ) : (
//                 inquiries.map((inquiry) => (
//                   <tr key={inquiry._id}>
//                     <td className="px-6 py-4 text-sm text-gray-600">
//                       {new Date(inquiry.createdAt).toLocaleDateString()}
//                     </td>
//                     <td className="px-6 py-4 font-medium text-gray-900">
//                       {inquiry.name}
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-600">
//                       <div>{inquiry.email}</div>
//                       <div>{inquiry.phone}</div>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-600">
//                       {inquiry.message.substring(0, 50)}...
//                     </td>
//                     <td className="px-6 py-4">
//                       <select
//                         value={inquiry.status}
//                         onChange={(e) =>
//                           statusChangeHandler(inquiry._id, e.target.value)
//                         }
//                         className={`rounded-md border-gray-300 text-sm ${getStatusColor(
//                           inquiry.status
//                         )}`}
//                       >
//                         <option value="New">New</option>
//                         <option value="Contacted">Contacted</option>
//                         <option value="Closed">Closed</option>
//                       </select>
//                     </td>
//                     <td className="px-6 py-4 text-right">
//                       <button
//                         onClick={() => deleteHandler(inquiry._id)}
//                         className="font-medium text-red-600 hover:text-red-800"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default InquiryManagement;

import { useEffect, useState } from 'react';
import api from '../../api/apiSlice';

const InquiryManagement = () => {
  // --- State ---
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // --- Data Fetching ---
  const fetchInquiries = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await api.get('/inquiries');
      setInquiries(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch inquiries.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  // --- Handlers ---

  // Handle Deletion
  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      try {
        await api.delete(`/inquiries/${id}`);
        setSuccess('Inquiry deleted successfully!');
        fetchInquiries(); // Refresh the list
        setTimeout(() => setSuccess(null), 3000);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete inquiry.');
        setTimeout(() => setError(null), 5000);
      }
    }
  };

  // Handle Status Change
  const statusChangeHandler = async (id, newStatus) => {
    try {
      await api.put(`/inquiries/${id}`, { status: newStatus });
      setSuccess('Status updated successfully!');
      fetchInquiries(); // Refresh the list
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update status.');
      setTimeout(() => setError(null), 5000);
    }
  };

  // View Details
  const viewDetailsHandler = (inquiry) => {
    setSelectedInquiry(inquiry);
    setShowModal(true);
  };

  // Close Modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedInquiry(null);
  };

  // Helper to get color for status badge
  const getStatusColor = (status) => {
    switch (status) {
      case 'New':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Contacted':
        return 'bg-[#D1B68A]/20 text-[#b58e5a] border-[#D1B68A]/30';
      case 'Closed':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Safe substring function
  const safeSubstring = (text, length = 50) => {
    if (!text) return 'No details provided';
    return text.length > length ? `${text.substring(0, length)}...` : text;
  };

  // --- Render ---
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Client Inquiries
          </h1>
          <p className="text-gray-600">
            Manage and track all client inquiries in one place
          </p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 border border-red-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Error
                </h3>
                <div className="mt-1 text-sm text-red-700">
                  {error}
                </div>
              </div>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-6 rounded-lg bg-green-50 p-4 border border-green-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.236 4.53L6.53 10.47a.75.75 0 00-1.06 1.06l2.5 2.5a.75.75 0 001.154-.114l4-5.5z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  Success
                </h3>
                <div className="mt-1 text-sm text-green-700">
                  {success}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Content */}
        {!loading && !error && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Client & Contact
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Project Info
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Details
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {inquiries.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <h3 className="text-lg font-medium text-gray-900 mb-1">No inquiries found</h3>
                          <p className="text-gray-500">All client inquiries will appear here.</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    inquiries.map((inquiry) => (
                      <tr key={inquiry._id} className="hover:bg-gray-50 transition-colors duration-150">
                        {/* Client & Contact */}
                        <td className="px-6 py-4">
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-semibold text-sm">
                                  {inquiry.firstName?.[0]}{inquiry.lastName?.[0]}
                                </span>
                              </div>
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">
                                {inquiry.firstName} {inquiry.lastName}
                              </div>
                              <div className="text-sm text-gray-500 mt-1">
                                <div className="flex items-center">
                                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                  </svg>
                                  {inquiry.email}
                                </div>
                                {inquiry.phone && (
                                  <div className="flex items-center mt-1">
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                    </svg>
                                    {inquiry.phone}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Project Info */}
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <div className="font-medium text-gray-900">{inquiry.projectType}</div>
                            {inquiry.budgetRange && (
                              <div className="text-gray-500 mt-1">{inquiry.budgetRange}</div>
                            )}
                          </div>
                        </td>

                        {/* Details */}
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600 max-w-xs">
                            {safeSubstring(inquiry.projectDetails)}
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4">
                          <select
                            value={inquiry.status || 'New'}
                            onChange={(e) => statusChangeHandler(inquiry._id, e.target.value)}
                            className={`rounded-lg border-2 px-3 py-1 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 ${getStatusColor(inquiry.status)}`}
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Closed">Closed</option>
                          </select>
                        </td>

                        {/* Date */}
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {inquiry.createdAt ? formatDate(inquiry.createdAt) : 'N/A'}
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end space-x-3">
                            <button
                              onClick={() => viewDetailsHandler(inquiry)}
                              className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200"
                            >
                              View
                            </button>
                            <button
                              onClick={() => deleteHandler(inquiry._id)}
                              className="text-red-600 hover:text-red-800 font-medium text-sm transition-colors duration-200"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {showModal && selectedInquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Inquiry Details</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="space-y-6">
                {/* Client Info */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Client Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Full Name</label>
                      <p className="text-gray-900">{selectedInquiry.firstName} {selectedInquiry.lastName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Email</label>
                      <p className="text-gray-900">{selectedInquiry.email}</p>
                    </div>
                    {selectedInquiry.phone && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">Phone</label>
                        <p className="text-gray-900">{selectedInquiry.phone}</p>
                      </div>
                    )}
                    {selectedInquiry.company && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">Company</label>
                        <p className="text-gray-900">{selectedInquiry.company}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Project Info */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Project Type</label>
                      <p className="text-gray-900">{selectedInquiry.projectType}</p>
                    </div>
                    {selectedInquiry.budgetRange && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">Budget Range</label>
                        <p className="text-gray-900">{selectedInquiry.budgetRange}</p>
                      </div>
                    )}
                    <div>
                      <label className="text-sm font-medium text-gray-500">Status</label>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedInquiry.status)}`}>
                        {selectedInquiry.status}
                      </span>
                    </div>
                    {selectedInquiry.createdAt && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">Submitted</label>
                        <p className="text-gray-900">{formatDate(selectedInquiry.createdAt)}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Project Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {selectedInquiry.projectDetails || 'No details provided'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InquiryManagement;