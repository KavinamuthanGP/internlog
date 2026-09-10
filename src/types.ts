export type InternshipStatus =
  | 'Applied'
  | 'Shortlisted'
  | 'Interview'
  | 'Offer'
  | 'Rejected';

export interface Internship {
  id: string;
  company: string;
  role: string;
  location: string;
  applicationDate: string;
  status: InternshipStatus;
  notes: string;
  companyWebsite?: string;
}

export type SkillCategory =
  | 'Frontend'
  | 'Backend'
  | 'Database'
  | 'DevOps'
  | 'Mobile'
  | 'Design'
  | 'Other';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  date: string;
  proficiency: number;
  notes: string;
  timeSpent: number;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  careerGoal: string;
  bio: string;
  university: string;
  major: string;
  graduationYear: string;
}
