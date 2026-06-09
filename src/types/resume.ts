// Resume data types

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  portfolio: string;
  summary: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  gpa: string;
  achievements: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  url: string;
  technologies: string[];
  startDate: string;
  endDate: string;
  current: boolean;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate: string;
  credentialId: string;
  url: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'native' | 'fluent' | 'advanced' | 'intermediate' | 'beginner';
}

export interface Interest {
  id: string;
  name: string;
}

export interface Reference {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  relationship: string;
}

export interface CustomIcon {
  id: string;
  label: string;
  url: string;
  category: 'skill' | 'contact' | 'custom';
}

// Resume Template Types
export type TemplateType =
  | 'modern'
  | 'classic'
  | 'minimal'
  | 'creative'
  | 'technical'
  // Role-based templates (market demand order)
  | 'softwareDeveloper'
  | 'dataScientist'
  | 'uxDesigner'
  | 'graphicDesigner'
  | 'productManager'
  | 'projectManager'
  | 'marketing'
  | 'sales'
  | 'accountant'
  | 'nurse'
  | 'teacher'
  | 'academic'
  | 'lawyer'
  | 'engineer'
  | 'executive'
  | 'hr'
  | 'consultant'
  | 'itSupport'
  | 'military'
  | 'federal';

export interface ResumeSection {
  id: string;
  title: string;
  enabled: boolean;
  order: number;
}

// Main Resume interface
export interface Resume {
  id: string;
  name: string;
  template: TemplateType;
  themeColor: string;

  // Personal Info
  personalInfo: PersonalInfo;

  // Sections
  summary: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  interests: Interest[];
  references: Reference[];
  customIcons: CustomIcon[];

  // Custom Sections
  customSections: {
    id: string;
    title: string;
    items: { id: string; title: string; content: string }[];
  }[];

  // Role-specific fields (added: template-components-shells)
  tools: string[];
  coreCompetencies: string[];
  achievements: string[];
  portfolio: string;
  awards: string[];
  affiliations: string[];
  publications: { id: string; title: string; publisher: string; date: string; url: string }[];
  grantsFellowships: { id: string; name: string; amount: string; date: string }[];
  conferences: { id: string; name: string; role: string; date: string }[];
  clinicalSkills: string[];
  licenses: { id: string; name: string; issuer: string; date: string }[];
  barAdmission: { id: string; state: string; date: string }[];
  practiceAreas: string[];
  securityClearance: string;
  teachingPhilosophy: string;
  classroomExperience: string;
  teachingExperience: { id: string; institution: string; subject: string; date: string }[];

  // Metadata
  createdAt: string;
  updatedAt: string;
}

// Default empty resume
export function createEmptyResume(): Resume {
  return {
    id: '',
    name: 'My Resume',
    template: 'modern',
    themeColor: '#3ECF8E',
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      linkedin: '',
      portfolio: '',
      summary: '',
    },
    summary: '',
    workExperience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
    interests: [],
    references: [],
    customIcons: [],
    customSections: [],
    tools: [],
    coreCompetencies: [],
    achievements: [],
    portfolio: '',
    awards: [],
    affiliations: [],
    publications: [],
    grantsFellowships: [],
    conferences: [],
    clinicalSkills: [],
    licenses: [],
    barAdmission: [],
    practiceAreas: [],
    securityClearance: '',
    teachingPhilosophy: '',
    classroomExperience: '',
    teachingExperience: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
