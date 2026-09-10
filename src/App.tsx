import { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import InternshipTracker from './components/InternshipTracker';
import SkillJournal from './components/SkillJournal';
import Profile from './components/Profile';
import type { Internship, Skill } from './types';

const STORAGE_KEYS = {
  internships: 'internlog-internships',
  skills: 'internlog-skills',
  profile: 'internlog-profile',
} as const;

const LEGACY_KEYS = {
  internships: 'careertrack-internships',
  skills: 'careertrack-skills',
} as const;

/**
 * Read and parse a localStorage key, returning a fallback value when the
 * entry is missing, malformed JSON, or not an array (e.g. corrupted storage).
 */
function loadStoredList<T>(key: string, fallback: T[]): T[] {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return fallback;
    return parsed as T[];
  } catch {
    return fallback;
  }
}

/** One-time migration from the legacy "careertrack-*" storage keys. */
function migrateLegacyKey(legacyKey: string, newKey: string): void {
  if (localStorage.getItem(newKey) !== null) return;
  const raw = localStorage.getItem(legacyKey);
  if (raw === null) return;
  localStorage.setItem(newKey, raw);
  localStorage.removeItem(legacyKey);
}

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentView, setCurrentView] = useState('dashboard');
  const [internships, setInternships] = useState<Internship[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    migrateLegacyKey(LEGACY_KEYS.internships, STORAGE_KEYS.internships);
    migrateLegacyKey(LEGACY_KEYS.skills, STORAGE_KEYS.skills);

    if (localStorage.getItem(STORAGE_KEYS.internships) === null) {
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
    } else {
      setInternships(loadStoredList<Internship>(STORAGE_KEYS.internships, []));
    }

    if (localStorage.getItem(STORAGE_KEYS.skills) === null) {
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
    } else {
      setSkills(loadStoredList<Skill>(STORAGE_KEYS.skills, []));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.internships, JSON.stringify(internships));
  }, [internships]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.skills, JSON.stringify(skills));
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
