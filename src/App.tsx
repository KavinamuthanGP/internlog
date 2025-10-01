import React, { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import InternshipTracker from './components/InternshipTracker';
import SkillJournal from './components/SkillJournal';
import Profile from './components/Profile';

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

interface Skill {
  id: string;
  name: string;
  category: string;
  date: string;
  proficiency: number;
  notes: string;
  timeSpent: number;
}

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentView, setCurrentView] = useState('dashboard');
  const [internships, setInternships] = useState<Internship[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedInternships = localStorage.getItem('careertrack-internships');
    const savedSkills = localStorage.getItem('careertrack-skills');
    
    if (savedInternships) {
      setInternships(JSON.parse(savedInternships));
    } else {
      // Sample data for demonstration
      setInternships([
        {
          id: '1',
          company: 'TechCorp',
          role: 'Frontend Developer Intern',
          location: 'San Francisco, CA',
          applicationDate: '2024-01-15',
          status: 'Interview',
          notes: 'Technical interview scheduled for next week',
          companyWebsite: 'https://techcorp.com'
        },
        {
          id: '2',
          company: 'StartupXYZ',
          role: 'Full Stack Intern',
          location: 'Remote',
          applicationDate: '2024-01-10',
          status: 'Shortlisted',
          notes: 'Reached out for code challenge',
          companyWebsite: 'https://startupxyz.com'
        }
      ]);
    }
    
    if (savedSkills) {
      setSkills(JSON.parse(savedSkills));
    } else {
      // Sample skills data
      setSkills([
        {
          id: '1',
          name: 'React.js',
          category: 'Frontend',
          date: '2024-01-20',
          proficiency: 4,
          notes: 'Learned hooks, context API, and component lifecycle',
          timeSpent: 8
        },
        {
          id: '2',
          name: 'TypeScript',
          category: 'Frontend',
          date: '2024-01-18',
          proficiency: 3,
          notes: 'Types, interfaces, and generic programming',
          timeSpent: 6
        },
        {
          id: '3',
          name: 'Node.js',
          category: 'Backend',
          date: '2024-01-15',
          proficiency: 3,
          notes: 'Express.js, middleware, and REST API development',
          timeSpent: 5
        }
      ]);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('careertrack-internships', JSON.stringify(internships));
  }, [internships]);

  useEffect(() => {
    localStorage.setItem('careertrack-skills', JSON.stringify(skills));
  }, [skills]);

  const addInternship = (internshipData: Omit<Internship, 'id'>) => {
    const newInternship = {
      ...internshipData,
      id: Date.now().toString()
    };
    setInternships([...internships, newInternship]);
  };

  const updateInternship = (id: string, updates: Partial<Internship>) => {
    setInternships(internships.map(internship => 
      internship.id === id ? { ...internship, ...updates } : internship
    ));
  };

  const deleteInternship = (id: string) => {
    setInternships(internships.filter(internship => internship.id !== id));
  };

  const addSkill = (skillData: Omit<Skill, 'id'>) => {
    const newSkill = {
      ...skillData,
      id: Date.now().toString()
    };
    setSkills([...skills, newSkill]);
  };

  const deleteSkill = (id: string) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard internships={internships} skills={skills} />;
      case 'internships':
        return (
          <InternshipTracker
            internships={internships}
            onAddInternship={addInternship}
            onUpdateInternship={updateInternship}
            onDeleteInternship={deleteInternship}
          />
        );
      case 'skills':
        return (
          <SkillJournal
            skills={skills}
            onAddSkill={addSkill}
            onDeleteSkill={deleteSkill}
          />
        );
      case 'profile':
        return <Profile internships={internships} skills={skills} />;
      default:
        return <Dashboard internships={internships} skills={skills} />;
    }
  };

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <Layout currentView={currentView} onViewChange={setCurrentView}>
      {renderCurrentView()}
    </Layout>
  );
}

export default App;