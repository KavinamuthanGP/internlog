import React from 'react';
import { Briefcase, BookOpen, Target, Calendar, TrendingUp, Award } from 'lucide-react';
import type { Internship, Skill } from '../types';

interface DashboardProps {
  internships: Internship[];
  skills: Skill[];
}

const Dashboard: React.FC<DashboardProps> = ({ internships, skills }) => {
  const statusCounts = internships.reduce((acc, internship) => {
    acc[internship.status] = (acc[internship.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const recentSkills = skills.slice(-5).reverse();
  const totalSkills = skills.length;
  const thisWeekSkills = skills.filter(skill => {
    const skillDate = new Date(skill.date);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return skillDate >= weekAgo;
  }).length;

  const stats = [
    { label: 'Total Applications', value: internships.length, icon: Briefcase, color: 'blue' },
    { label: 'Skills Learned', value: totalSkills, icon: BookOpen, color: 'green' },
    { label: 'This Week', value: thisWeekSkills, icon: Calendar, color: 'purple' },
    { label: 'Interviews', value: statusCounts['Interview'] || 0, icon: Award, color: 'orange' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600 mt-2">Track your career progress and skill development</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-slide-up group cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1 group-hover:scale-110 transition-transform duration-200">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600 group-hover:scale-110 transition-transform duration-200`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Application Pipeline */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-slide-up hover:shadow-lg transition-all duration-300" style={{ animationDelay: '400ms' }}>
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
            Application Pipeline
          </h3>
          <div className="space-y-4">
            {['Applied', 'Shortlisted', 'Interview', 'Offer'].map((status) => (
              <div key={status} className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">{status}</span>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        status === 'Applied' ? 'bg-blue-500' :
                        status === 'Shortlisted' ? 'bg-yellow-500' :
                        status === 'Interview' ? 'bg-orange-500' :
                        'bg-green-500'
                      } transition-all duration-1000 ease-out`}
                      style={{
                        width: `${Math.min((statusCounts[status] || 0) * 20, 100)}%`
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-gray-900 w-6">
                    {statusCounts[status] || 0}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Skills */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-slide-up hover:shadow-lg transition-all duration-300" style={{ animationDelay: '500ms' }}>
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-green-600" />
            Recent Skills
          </h3>
          <div className="space-y-3">
            {recentSkills.length > 0 ? recentSkills.map((skill, index) => (
              <div 
                key={index} 
                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:scale-105 cursor-pointer"
                style={{ animationDelay: `${600 + index * 100}ms` }}
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{skill.name}</p>
                  <p className="text-sm text-gray-600">{skill.category}</p>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(skill.date).toLocaleDateString()}
                </span>
              </div>
            )) : (
              <p className="text-gray-500 text-center py-4">No skills logged yet</p>
            )}
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white animate-slide-up hover:shadow-2xl transition-all duration-300" style={{ animationDelay: '700ms' }}>
        <h3 className="text-xl font-semibold mb-3 flex items-center">
          <Target className="w-5 h-5 mr-2" />
          Learning Recommendations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur rounded-lg p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 cursor-pointer">
            <h4 className="font-medium mb-2">Next Skill</h4>
            <p className="text-sm opacity-90">Learn React Hooks for better state management</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 cursor-pointer">
            <h4 className="font-medium mb-2">Career Focus</h4>
            <p className="text-sm opacity-90">Add more backend skills to become full-stack</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 cursor-pointer">
            <h4 className="font-medium mb-2">Skills Logged</h4>
            <p className="text-sm opacity-90">{skills.length} skills logged so far — keep building on them</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;