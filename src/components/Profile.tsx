import React, { useState } from 'react';
import { User, Target, BookOpen, Briefcase, Download, Github, Linkedin, Mail } from 'lucide-react';

interface ProfileProps {
  internships: any[];
  skills: any[];
}

const Profile: React.FC<ProfileProps> = ({ internships, skills }) => {
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    linkedin: 'linkedin.com/in/alexjohnson',
    github: 'github.com/alexjohnson',
    careerGoal: 'Full Stack Developer',
    bio: 'Passionate computer science student with a focus on web development and software engineering. Actively seeking internship opportunities to apply my skills in real-world projects.',
    university: 'University of Technology',
    major: 'Computer Science',
    graduationYear: '2025'
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, save to backend
  };

  const generateResumeSummary = () => {
    const skillsByCategory = skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill.name);
      return acc;
    }, {});

    const totalApplications = internships.length;
    const interviews = internships.filter(app => app.status === 'Interview').length;
    const offers = internships.filter(app => app.status === 'Offer').length;

    return {
      skillsByCategory,
      totalApplications,
      interviews,
      offers,
      skillCount: skills.length
    };
  };

  const resumeData = generateResumeSummary();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Profile & Resume</h2>
        <p className="text-gray-600 mt-2">Manage your professional profile and generate resume insights</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{profile.name}</h3>
              <p className="text-gray-600">{profile.careerGoal}</p>
              <p className="text-sm text-gray-500">{profile.university} • Class of {profile.graduationYear}</p>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Career Goal</label>
                <input
                  type="text"
                  value={profile.careerGoal}
                  onChange={(e) => setProfile({ ...profile, careerGoal: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                <input
                  type="url"
                  value={profile.linkedin}
                  onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">GitHub</label>
                <input
                  type="url"
                  value={profile.github}
                  onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Save Changes
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-700">{profile.bio}</p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{profile.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Linkedin className="w-4 h-4" />
                <a href={`https://${profile.linkedin}`} className="hover:text-blue-600 transition-colors">
                  LinkedIn
                </a>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Github className="w-4 h-4" />
                <a href={`https://${profile.github}`} className="hover:text-blue-600 transition-colors">
                  GitHub
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Resume Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center">
            <Download className="w-5 h-5 mr-2 text-blue-600" />
            Resume Summary
          </h3>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
            Export Data
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Briefcase className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-600">{resumeData.totalApplications}</p>
            <p className="text-sm text-gray-600">Applications</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-600">{resumeData.skillCount}</p>
            <p className="text-sm text-gray-600">Skills Learned</p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <Target className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-orange-600">{resumeData.interviews}</p>
            <p className="text-sm text-gray-600">Interviews</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <User className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-purple-600">{resumeData.offers}</p>
            <p className="text-sm text-gray-600">Offers</p>
          </div>
        </div>

        {/* Skills by Category */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Technical Skills</h4>
          <div className="space-y-3">
            {Object.entries(resumeData.skillsByCategory).map(([category, skillList]) => (
              <div key={category} className="flex flex-wrap items-start gap-2">
                <span className="font-medium text-gray-700 min-w-20">{category}:</span>
                <div className="flex flex-wrap gap-2">
                  {(skillList as string[]).map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {skills.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Start logging skills to see your resume summary</p>
          </div>
        )}
      </div>

      {/* Career Progress */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
        <h3 className="text-xl font-semibold mb-4">Career Progress Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <h4 className="font-medium mb-2">Application Success Rate</h4>
            <p className="text-2xl font-bold">
              {resumeData.totalApplications > 0 
                ? Math.round((resumeData.interviews / resumeData.totalApplications) * 100)
                : 0}%
            </p>
            <p className="text-sm opacity-80">Interview conversion rate</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <h4 className="font-medium mb-2">Learning Streak</h4>
            <p className="text-2xl font-bold">
              {skills.length > 0 ? Math.max(1, Math.floor(skills.length / 7)) : 0}
            </p>
            <p className="text-sm opacity-80">Weeks of consistent learning</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <h4 className="font-medium mb-2">Goal Progress</h4>
            <p className="text-2xl font-bold">
              {Math.min(100, Math.round((resumeData.skillCount / 20) * 100))}%
            </p>
            <p className="text-sm opacity-80">Towards {profile.careerGoal}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;