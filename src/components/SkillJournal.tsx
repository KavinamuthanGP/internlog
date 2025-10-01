import React, { useState } from 'react';
import { Plus, BookOpen, Calendar, TrendingUp, Target, Zap } from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  category: string;
  date: string;
  proficiency: number;
  notes: string;
  timeSpent: number; // in hours
}

interface SkillJournalProps {
  skills: Skill[];
  onAddSkill: (skill: Omit<Skill, 'id'>) => void;
  onDeleteSkill: (id: string) => void;
}

const SkillJournal: React.FC<SkillJournalProps> = ({ skills, onAddSkill, onDeleteSkill }) => {
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [formData, setFormData] = useState({
    name: '',
    category: 'Frontend',
    date: new Date().toISOString().split('T')[0],
    proficiency: 3,
    notes: '',
    timeSpent: 2
  });

  const categories = ['All', 'Frontend', 'Backend', 'Database', 'DevOps', 'Mobile', 'Design', 'Other'];
  const categoryColors = {
    Frontend: 'bg-blue-100 text-blue-800',
    Backend: 'bg-green-100 text-green-800',
    Database: 'bg-purple-100 text-purple-800',
    DevOps: 'bg-orange-100 text-orange-800',
    Mobile: 'bg-pink-100 text-pink-800',
    Design: 'bg-indigo-100 text-indigo-800',
    Other: 'bg-gray-100 text-gray-800'
  };

  const filteredSkills = selectedCategory === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  const sortedSkills = [...filteredSkills].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Generate AI recommendations based on current skills
  const getRecommendations = () => {
    const skillsByCategory = skills.reduce((acc, skill) => {
      acc[skill.category] = (acc[skill.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const recommendations = [];
    
    if (skillsByCategory.Frontend > 2 && !skillsByCategory.Backend) {
      recommendations.push({
        skill: 'Node.js & Express',
        reason: 'Complete your full-stack journey',
        priority: 'High'
      });
    }
    
    if (skillsByCategory.Frontend && !skills.some(s => s.name.toLowerCase().includes('testing'))) {
      recommendations.push({
        skill: 'Jest & Testing',
        reason: 'Essential for production code',
        priority: 'Medium'
      });
    }
    
    if (skills.length > 5 && !skillsByCategory.DevOps) {
      recommendations.push({
        skill: 'Docker & Deployment',
        reason: 'Deploy your applications',
        priority: 'Medium'
      });
    }

    return recommendations.slice(0, 3);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddSkill(formData);
    setFormData({
      name: '',
      category: 'Frontend',
      date: new Date().toISOString().split('T')[0],
      proficiency: 3,
      notes: '',
      timeSpent: 2
    });
    setShowForm(false);
  };

  const recommendations = getRecommendations();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Skill Journal</h2>
          <p className="text-gray-600 mt-2">Track your daily learning and skill development</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>Log Skill</span>
        </button>
      </div>

      {/* AI Recommendations */}
      {recommendations.length > 0 && (
        <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-xl p-6 text-white">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Zap className="w-5 h-5 mr-2" />
            AI Learning Recommendations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="w-4 h-4" />
                  <span className="font-medium">{rec.skill}</span>
                </div>
                <p className="text-sm opacity-90 mb-2">{rec.reason}</p>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  rec.priority === 'High' ? 'bg-red-200 text-red-800' : 'bg-yellow-200 text-yellow-800'
                }`}>
                  {rec.priority} Priority
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Skill Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Log New Skill</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Skill Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="e.g., React Hooks, Python Pandas"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                {categories.slice(1).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date Learned</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time Spent (hours)</label>
              <input
                type="number"
                value={formData.timeSpent}
                onChange={(e) => setFormData({ ...formData, timeSpent: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                min="0.5"
                step="0.5"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Proficiency Level</label>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Beginner</span>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={formData.proficiency}
                  onChange={(e) => setFormData({ ...formData, proficiency: parseInt(e.target.value) })}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <span className="text-sm text-gray-600">Expert</span>
                <span className="text-sm font-medium text-green-600 w-8">
                  {formData.proficiency}/5
                </span>
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="What did you learn? Key takeaways, resources used..."
              />
            </div>
            <div className="md:col-span-2 flex space-x-3">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Log Skill
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
              selectedCategory === category
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
            {category !== 'All' && (
              <span className="ml-2 text-xs opacity-75">
                {skills.filter(s => s.category === category).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Skills Timeline */}
      <div className="space-y-4">
        {sortedSkills.map((skill, index) => (
          <div key={skill.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{skill.name}</h3>
                  <div className="flex items-center space-x-3 mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      categoryColors[skill.category as keyof typeof categoryColors]
                    }`}>
                      {skill.category}
                    </span>
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(skill.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => onDeleteSkill(skill.id)}
                className="text-gray-400 hover:text-red-600 transition-colors duration-200"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-600">
                  Level {skill.proficiency}/5
                </span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(skill.proficiency / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>⏱️ {skill.timeSpent} hours</span>
              </div>
            </div>

            {skill.notes && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">{skill.notes}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {sortedSkills.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No skills logged yet</h3>
          <p className="text-gray-600 mb-4">Start logging your daily learning to track your progress</p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg inline-flex items-center space-x-2 transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>Log Your First Skill</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default SkillJournal;