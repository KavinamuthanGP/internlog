import React, { useState } from 'react';
import { Plus, Building2, Calendar, MapPin, ExternalLink, Edit, Trash2 } from 'lucide-react';

interface Internship {
  id: string;
  company: string;
  role: string;
  location: string;
  applicationDate: string;
  status: 'Applied' | 'Shortlisted' | 'Interview' | 'Offer' | 'Rejected';
  notes: string;
  companyWebsite?: string;
}

interface InternshipTrackerProps {
  internships: Internship[];
  onAddInternship: (internship: Omit<Internship, 'id'>) => void;
  onUpdateInternship: (id: string, updates: Partial<Internship>) => void;
  onDeleteInternship: (id: string) => void;
}

const InternshipTracker: React.FC<InternshipTrackerProps> = ({
  internships,
  onAddInternship,
  onUpdateInternship,
  onDeleteInternship
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    location: '',
    applicationDate: new Date().toISOString().split('T')[0],
    status: 'Applied' as Internship['status'],
    notes: '',
    companyWebsite: ''
  });

  const statusColors = {
    Applied: 'bg-blue-100 text-blue-800 border-blue-200',
    Shortlisted: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    Interview: 'bg-orange-100 text-orange-800 border-orange-200',
    Offer: 'bg-green-100 text-green-800 border-green-200',
    Rejected: 'bg-red-100 text-red-800 border-red-200'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      onUpdateInternship(editingId, formData);
      setEditingId(null);
    } else {
      onAddInternship(formData);
    }
    setFormData({
      company: '',
      role: '',
      location: '',
      applicationDate: new Date().toISOString().split('T')[0],
      status: 'Applied',
      notes: '',
      companyWebsite: ''
    });
    setShowForm(false);
  };

  const startEdit = (internship: Internship) => {
    setFormData({
      company: internship.company,
      role: internship.role,
      location: internship.location,
      applicationDate: internship.applicationDate,
      status: internship.status,
      notes: internship.notes,
      companyWebsite: internship.companyWebsite || ''
    });
    setEditingId(internship.id);
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Internship Tracker</h2>
          <p className="text-gray-600 mt-2">Manage your internship applications and track progress</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>Add Application</span>
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {editingId ? 'Edit Application' : 'Add New Application'}
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Application Date</label>
              <input
                type="date"
                value={formData.applicationDate}
                onChange={(e) => setFormData({ ...formData, applicationDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as Internship['status'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Applied">Applied</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Website (Optional)</label>
              <input
                type="url"
                value={formData.companyWebsite}
                onChange={(e) => setFormData({ ...formData, companyWebsite: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://company.com"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Interview feedback, requirements, etc."
              />
            </div>
            <div className="md:col-span-2 flex space-x-3">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                {editingId ? 'Update' : 'Add'} Application
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setFormData({
                    company: '',
                    role: '',
                    location: '',
                    applicationDate: new Date().toISOString().split('T')[0],
                    status: 'Applied',
                    notes: '',
                    companyWebsite: ''
                  });
                }}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Applications Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {internships.map((internship) => (
          <div key={internship.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{internship.company}</h3>
                  <p className="text-sm text-gray-600">{internship.role}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => startEdit(internship)}
                  className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDeleteInternship(internship.id)}
                  className="text-gray-400 hover:text-red-600 transition-colors duration-200"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{internship.location}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Applied: {new Date(internship.applicationDate).toLocaleDateString()}</span>
              </div>
              {internship.companyWebsite && (
                <div className="flex items-center space-x-2 text-sm text-blue-600">
                  <ExternalLink className="w-4 h-4" />
                  <a href={internship.companyWebsite} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    Company Website
                  </a>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[internship.status]}`}>
                {internship.status}
              </span>
              <button
                onClick={() => {
                  const statusOrder: Internship['status'][] = ['Applied', 'Shortlisted', 'Interview', 'Offer'];
                  const currentIndex = statusOrder.indexOf(internship.status);
                  if (currentIndex < statusOrder.length - 1) {
                    onUpdateInternship(internship.id, { status: statusOrder[currentIndex + 1] });
                  }
                }}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                disabled={internship.status === 'Offer' || internship.status === 'Rejected'}
              >
                {internship.status === 'Offer' || internship.status === 'Rejected' ? 'Final' : 'Move Forward'}
              </button>
            </div>

            {internship.notes && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-600">{internship.notes}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {internships.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
          <p className="text-gray-600 mb-4">Start tracking your internship applications to monitor your progress</p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg inline-flex items-center space-x-2 transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>Add Your First Application</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default InternshipTracker;