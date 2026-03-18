import {
  Resume,
  TemplateType,
  WorkExperience,
  Education,
  Skill,
  Project,
  Certification,
  Language,
} from '@/types/resume';

let idCounter = 0;
const generateId = () => `sample-${++idCounter}`;

const commonWorkExperiences: WorkExperience[] = [
  {
    id: generateId(),
    company: 'TechCorp Inc.',
    position: 'Senior Software Engineer',
    location: 'San Francisco, CA',
    startDate: '2021-03',
    endDate: '',
    current: true,
    description:
      'Led development of microservices architecture serving 2M+ daily active users. Mentored junior developers and implemented CI/CD pipelines reducing deployment time by 60%.',
  },
  {
    id: generateId(),
    company: 'StartupXYZ',
    position: 'Software Developer',
    location: 'Austin, TX',
    startDate: '2018-06',
    endDate: '2021-02',
    current: false,
    description:
      'Built RESTful APIs and React front-end applications. Collaborated with product team to deliver features on time. Optimized database queries improving response times by 40%.',
  },
  {
    id: generateId(),
    company: 'Tech Solutions LLC',
    position: 'Junior Developer',
    location: 'Seattle, WA',
    startDate: '2016-01',
    endDate: '2018-05',
    current: false,
    description:
      'Developed and maintained web applications using JavaScript and Python. Participated in code reviews and agile ceremonies.',
  },
];

const commonEducation: Education[] = [
  {
    id: generateId(),
    institution: 'University of California',
    degree: 'Bachelor of Science',
    field: 'Computer Science',
    location: 'Berkeley, CA',
    startDate: '2012-09',
    endDate: '2015-12',
    current: false,
    gpa: '3.8',
    achievements: "Dean's List, Senior Project Award",
  },
  {
    id: generateId(),
    institution: 'Tech Academy',
    degree: 'Certificate',
    field: 'Full-Stack Web Development',
    location: 'San Francisco, CA',
    startDate: '2015-10',
    endDate: '2016-03',
    current: false,
    gpa: '',
    achievements: 'Top Student Award',
  },
];

const commonSkills: Skill[] = [
  { id: generateId(), name: 'JavaScript', level: 'expert', category: 'Languages' },
  { id: generateId(), name: 'TypeScript', level: 'expert', category: 'Languages' },
  { id: generateId(), name: 'React', level: 'expert', category: 'Frontend' },
  { id: generateId(), name: 'Node.js', level: 'advanced', category: 'Backend' },
  { id: generateId(), name: 'Python', level: 'advanced', category: 'Languages' },
  { id: generateId(), name: 'PostgreSQL', level: 'advanced', category: 'Databases' },
  { id: generateId(), name: 'AWS', level: 'advanced', category: 'Cloud' },
  { id: generateId(), name: 'Docker', level: 'advanced', category: 'DevOps' },
];

const commonProjects: Project[] = [
  {
    id: generateId(),
    name: 'E-commerce Platform',
    description:
      'Full-stack e-commerce solution with real-time inventory management, payment processing, and admin dashboard.',
    url: 'https://github.com/johndoe/ecommerce',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    startDate: '2022-01',
    endDate: '2022-06',
    current: false,
  },
  {
    id: generateId(),
    name: 'Task Management App',
    description:
      'Collaborative task management tool with real-time updates, drag-and-drop interface, and team analytics.',
    url: 'https://github.com/johndoe/taskapp',
    technologies: ['React', 'Firebase', 'Material-UI'],
    startDate: '2021-07',
    endDate: '2021-12',
    current: false,
  },
];

const commonCertifications: Certification[] = [
  {
    id: generateId(),
    name: 'AWS Solutions Architect',
    issuer: 'Amazon Web Services',
    date: '2023-01',
    expiryDate: '2026-01',
    credentialId: 'AWS-SA-123456',
    url: 'https://aws.amazon.com/verification',
  },
  {
    id: generateId(),
    name: 'Google Cloud Professional Developer',
    issuer: 'Google',
    date: '2022-06',
    expiryDate: '2024-06',
    credentialId: 'GCP-PD-789012',
    url: 'https://google.com/verify',
  },
];

const commonLanguages: Language[] = [
  { id: generateId(), name: 'English', proficiency: 'native' },
  { id: generateId(), name: 'Spanish', proficiency: 'advanced' },
];

const basePersonalInfo = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@email.com',
  phone: '(555) 123-4567',
  location: 'San Francisco, CA',
  website: 'https://johndoe.dev',
  linkedin: 'linkedin.com/in/johndoe',
  portfolio: 'https://portfolio.johndoe.dev',
};

const baseSummary =
  'Results-driven software engineer with 8+ years of experience building scalable web applications. Passionate about clean code, system design, and delivering exceptional user experiences.';

type SampleData = Pick<
  Resume,
  | 'personalInfo'
  | 'summary'
  | 'workExperience'
  | 'education'
  | 'skills'
  | 'projects'
  | 'certifications'
  | 'languages'
>;

export const sampleDataMap: Record<TemplateType, SampleData> = {
  modern: {
    personalInfo: { ...basePersonalInfo, summary: baseSummary },
    summary: baseSummary,
    workExperience: commonWorkExperiences,
    education: commonEducation,
    skills: commonSkills,
    projects: commonProjects,
    certifications: commonCertifications,
    languages: commonLanguages,
  },

  classic: {
    personalInfo: {
      ...basePersonalInfo,
      summary:
        'Dedicated professional with extensive experience in delivering high-quality results. Proven track record of success in fast-paced environments.',
    },
    summary:
      'Dedicated professional with extensive experience in delivering high-quality results. Proven track record of success in fast-paced environments.',
    workExperience: [
      {
        ...commonWorkExperiences[0],
        description:
          'Demonstrated leadership in managing complex projects. Achieved significant improvements in team productivity and code quality.',
      },
      {
        ...commonWorkExperiences[1],
        description:
          'Consistently exceeded performance targets. Developed innovative solutions that streamlined business processes.',
      },
    ],
    education: [commonEducation[0]],
    skills: commonSkills.slice(0, 6),
    projects: [],
    certifications: [commonCertifications[0]],
    languages: [commonLanguages[0]],
  },

  minimal: {
    personalInfo: {
      ...basePersonalInfo,
      summary:
        'Creative designer with a passion for clean, functional design. Specializing in user-centered design solutions.',
    },
    summary:
      'Creative designer with a passion for clean, functional design. Specializing in user-centered design solutions.',
    workExperience: commonWorkExperiences.slice(0, 2),
    education: [commonEducation[0]],
    skills: commonSkills.slice(0, 5),
    projects: [commonProjects[0]],
    certifications: [],
    languages: commonLanguages,
  },

  creative: {
    personalInfo: {
      ...basePersonalInfo,
      summary:
        'Dynamic creative professional bringing innovative ideas to life through bold design and strategic thinking. Award-winning portfolio with diverse client work.',
    },
    summary:
      'Dynamic creative professional bringing innovative ideas to life through bold design and strategic thinking. Award-winning portfolio with diverse client work.',
    workExperience: commonWorkExperiences,
    education: commonEducation,
    skills: [
      { id: generateId(), name: 'UI/UX Design', level: 'expert', category: 'Design' },
      { id: generateId(), name: 'Brand Identity', level: 'expert', category: 'Design' },
      { id: generateId(), name: 'Adobe Creative Suite', level: 'expert', category: 'Tools' },
      { id: generateId(), name: 'Figma', level: 'expert', category: 'Tools' },
      { id: generateId(), name: 'Motion Graphics', level: 'advanced', category: 'Design' },
      { id: generateId(), name: 'Typography', level: 'advanced', category: 'Design' },
    ],
    projects: commonProjects,
    certifications: [
      {
        id: generateId(),
        name: 'Adobe Certified Expert',
        issuer: 'Adobe',
        date: '2023-03',
        expiryDate: '',
        credentialId: 'ACE-2023-123',
        url: '',
      },
    ],
    languages: commonLanguages,
  },

  technical: {
    personalInfo: {
      ...basePersonalInfo,
      summary:
        'Technical specialist with deep expertise in system architecture and performance optimization. Strong background in distributed systems and cloud infrastructure.',
    },
    summary:
      'Technical specialist with deep expertise in system architecture and performance optimization. Strong background in distributed systems and cloud infrastructure.',
    workExperience: commonWorkExperiences,
    education: commonEducation,
    skills: [
      ...commonSkills,
      { id: generateId(), name: 'Kubernetes', level: 'advanced', category: 'DevOps' },
      { id: generateId(), name: 'GraphQL', level: 'advanced', category: 'Backend' },
      { id: generateId(), name: 'Redis', level: 'advanced', category: 'Databases' },
      { id: generateId(), name: 'MongoDB', level: 'intermediate', category: 'Databases' },
    ],
    projects: commonProjects,
    certifications: commonCertifications,
    languages: commonLanguages,
  },

  softwareDeveloper: {
    personalInfo: {
      ...basePersonalInfo,
      summary:
        'Full-stack developer passionate about building robust, scalable applications. Open source contributor with strong problem-solving skills.',
    },
    summary:
      'Full-stack developer passionate about building robust, scalable applications. Open source contributor with strong problem-solving skills.',
    workExperience: commonWorkExperiences,
    education: commonEducation,
    skills: [
      { id: generateId(), name: 'JavaScript', level: 'expert', category: 'Languages' },
      { id: generateId(), name: 'TypeScript', level: 'expert', category: 'Languages' },
      { id: generateId(), name: 'React', level: 'expert', category: 'Frontend' },
      { id: generateId(), name: 'Next.js', level: 'expert', category: 'Frontend' },
      { id: generateId(), name: 'Node.js', level: 'expert', category: 'Backend' },
      { id: generateId(), name: 'Python', level: 'advanced', category: 'Languages' },
      { id: generateId(), name: 'Go', level: 'intermediate', category: 'Languages' },
      { id: generateId(), name: 'PostgreSQL', level: 'advanced', category: 'Databases' },
      { id: generateId(), name: 'MongoDB', level: 'advanced', category: 'Databases' },
      { id: generateId(), name: 'AWS', level: 'advanced', category: 'Cloud' },
      { id: generateId(), name: 'Docker', level: 'advanced', category: 'DevOps' },
      { id: generateId(), name: 'Kubernetes', level: 'intermediate', category: 'DevOps' },
    ],
    projects: [
      ...commonProjects,
      {
        id: generateId(),
        name: 'Open Source CLI Tool',
        description:
          'Contributed to major open source projects. Created utility tools used by thousands of developers.',
        url: 'https://github.com/johndoe/cli-tool',
        technologies: ['Go', 'Docker'],
        startDate: '2020-01',
        endDate: '2020-12',
        current: false,
      },
    ],
    certifications: commonCertifications,
    languages: commonLanguages,
  },

  dataScientist: {
    personalInfo: {
      ...basePersonalInfo,
      summary:
        'Data scientist with expertise in machine learning, statistical analysis, and data visualization. PhD-level quantitative training with practical industry experience.',
    },
    summary:
      'Data scientist with expertise in machine learning, statistical analysis, and data visualization. PhD-level quantitative training with practical industry experience.',
    workExperience: [
      {
        id: generateId(),
        company: 'DataDriven Corp',
        position: 'Senior Data Scientist',
        location: 'Boston, MA',
        startDate: '2020-01',
        endDate: '',
        current: true,
        description:
          'Built ML models improving customer retention by 25%. Led team of 4 data scientists. Presented findings to C-suite stakeholders.',
      },
      {
        id: generateId(),
        company: 'Analytics Inc',
        position: 'Data Analyst',
        location: 'New York, NY',
        startDate: '2017-06',
        endDate: '2019-12',
        current: false,
        description:
          'Developed dashboards and reports driving business decisions. Performed exploratory data analysis for marketing campaigns.',
      },
    ],
    education: [
      {
        id: generateId(),
        institution: 'MIT',
        degree: 'Master of Science',
        field: 'Data Science',
        location: 'Cambridge, MA',
        startDate: '2015-09',
        endDate: '2017-05',
        current: false,
        gpa: '3.9',
        achievements: 'Research Fellowship',
      },
      commonEducation[0],
    ],
    skills: [
      { id: generateId(), name: 'Python', level: 'expert', category: 'Languages' },
      { id: generateId(), name: 'R', level: 'expert', category: 'Languages' },
      { id: generateId(), name: 'Machine Learning', level: 'expert', category: 'ML' },
      { id: generateId(), name: 'Deep Learning', level: 'advanced', category: 'ML' },
      { id: generateId(), name: 'SQL', level: 'expert', category: 'Languages' },
      { id: generateId(), name: 'TensorFlow', level: 'advanced', category: 'ML' },
      { id: generateId(), name: 'PyTorch', level: 'advanced', category: 'ML' },
      { id: generateId(), name: 'Tableau', level: 'advanced', category: 'Visualization' },
      { id: generateId(), name: 'Statistics', level: 'expert', category: 'Math' },
    ],
    projects: [
      {
        id: generateId(),
        name: 'Customer Churn Prediction',
        description:
          'Built ensemble model predicting customer churn with 92% accuracy. Deployed to production reducing churn by 25%.',
        url: '',
        technologies: ['Python', 'TensorFlow', 'AWS'],
        startDate: '2021-01',
        endDate: '2021-06',
        current: false,
      },
    ],
    certifications: [
      {
        id: generateId(),
        name: 'Google Cloud Professional Data Engineer',
        issuer: 'Google',
        date: '2022-03',
        expiryDate: '2024-03',
        credentialId: 'GCP-PDE-456',
        url: '',
      },
    ],
    languages: commonLanguages,
  },

  uxDesigner: {
    personalInfo: {
      ...basePersonalInfo,
      summary:
        'UX designer focused on creating intuitive, accessible digital experiences. Strong portfolio spanning mobile, web, and enterprise applications.',
    },
    summary:
      'UX designer focused on creating intuitive, accessible digital experiences. Strong portfolio spanning mobile, web, and enterprise applications.',
    workExperience: [
      {
        id: generateId(),
        company: 'DesignStudio',
        position: 'Senior UX Designer',
        location: 'Los Angeles, CA',
        startDate: '2019-03',
        endDate: '',
        current: true,
        description:
          'Led design system initiatives. Conducted user research and usability testing. Managed design projects from concept to launch.',
      },
      {
        id: generateId(),
        company: 'DigitalAgency',
        position: 'UI/UX Designer',
        location: 'San Diego, CA',
        startDate: '2016-01',
        endDate: '2019-02',
        current: false,
        description:
          'Created wireframes, prototypes, and high-fidelity mockups. Collaborated with developers to ensure design implementation.',
      },
    ],
    education: [
      {
        id: generateId(),
        institution: 'ArtCenter College of Design',
        degree: 'Bachelor of Fine Arts',
        field: 'Interaction Design',
        location: 'Pasadena, CA',
        startDate: '2012-09',
        endDate: '2015-12',
        current: false,
        gpa: '3.7',
        achievements: 'Graduated with Honors',
      },
    ],
    skills: [
      { id: generateId(), name: 'User Research', level: 'expert', category: 'UX' },
      { id: generateId(), name: 'Wireframing', level: 'expert', category: 'UX' },
      { id: generateId(), name: 'Prototyping', level: 'expert', category: 'UX' },
      { id: generateId(), name: 'Figma', level: 'expert', category: 'Tools' },
      { id: generateId(), name: 'Sketch', level: 'advanced', category: 'Tools' },
      { id: generateId(), name: 'Adobe XD', level: 'advanced', category: 'Tools' },
      { id: generateId(), name: 'Usability Testing', level: 'expert', category: 'UX' },
      { id: generateId(), name: 'Information Architecture', level: 'advanced', category: 'UX' },
    ],
    projects: [
      {
        id: generateId(),
        name: 'Banking App Redesign',
        description:
          'Complete redesign of mobile banking app improving user satisfaction by 40%. Led research, ideation, and validation.',
        url: 'https://dribbble.com/johndoe',
        technologies: ['Figma', 'Protopie', 'UserTesting'],
        startDate: '2021-01',
        endDate: '2021-09',
        current: false,
      },
    ],
    certifications: [
      {
        id: generateId(),
        name: 'Google UX Design Certificate',
        issuer: 'Google',
        date: '2020-06',
        expiryDate: '',
        credentialId: 'GUX-2020-123',
        url: '',
      },
    ],
    languages: commonLanguages,
  },

  graphicDesigner: {
    personalInfo: {
      ...basePersonalInfo,
      summary:
        'Visual designer with a bold, creative approach. Expertise in brand identity, print design, and digital illustration.',
    },
    summary:
      'Visual designer with a bold, creative approach. Expertise in brand identity, print design, and digital illustration.',
    workExperience: [
      {
        id: generateId(),
        company: 'CreativeStudio',
        position: 'Lead Graphic Designer',
        location: 'New York, NY',
        startDate: '2018-01',
        endDate: '',
        current: true,
        description:
          'Directed visual identity for major brand clients. Led creative campaigns across print and digital media.',
      },
      {
        id: generateId(),
        company: 'DesignHouse',
        position: 'Graphic Designer',
        location: 'Brooklyn, NY',
        startDate: '2015-06',
        endDate: '2017-12',
        current: false,
        description:
          'Created marketing materials, logos, and brand guidelines. Collaborated with clients to deliver creative solutions.',
      },
    ],
    education: [
      {
        id: generateId(),
        institution: 'School of Visual Arts',
        degree: 'Bachelor of Fine Arts',
        field: 'Graphic Design',
        location: 'New York, NY',
        startDate: '2011-09',
        endDate: '2015-05',
        current: false,
        gpa: '3.6',
        achievements: 'Design Award Winner',
      },
    ],
    skills: [
      { id: generateId(), name: 'Brand Identity', level: 'expert', category: 'Design' },
      { id: generateId(), name: 'Typography', level: 'expert', category: 'Design' },
      { id: generateId(), name: 'Adobe Illustrator', level: 'expert', category: 'Tools' },
      { id: generateId(), name: 'Adobe Photoshop', level: 'expert', category: 'Tools' },
      { id: generateId(), name: 'Adobe InDesign', level: 'expert', category: 'Tools' },
      { id: generateId(), name: 'Print Design', level: 'expert', category: 'Design' },
      { id: generateId(), name: 'Illustration', level: 'advanced', category: 'Design' },
      { id: generateId(), name: 'Motion Graphics', level: 'intermediate', category: 'Design' },
    ],
    projects: commonProjects,
    certifications: [
      {
        id: generateId(),
        name: 'Adobe Certified Expert - Illustrator',
        issuer: 'Adobe',
        date: '2023-01',
        expiryDate: '',
        credentialId: 'ACE-AI-789',
        url: '',
      },
    ],
    languages: commonLanguages,
  },

  productManager: {
    personalInfo: {
      ...basePersonalInfo,
      summary:
        'Strategic product leader with track record of launching successful products. Data-driven decision maker with strong technical background.',
    },
    summary:
      'Strategic product leader with track record of launching successful products. Data-driven decision maker with strong technical background.',
    workExperience: [
      {
        id: generateId(),
        company: 'ProductTech',
        position: 'Senior Product Manager',
        location: 'San Francisco, CA',
        startDate: '2019-06',
        endDate: '',
        current: true,
        description:
          'Led product strategy for $10M ARR platform. Increased user engagement by 60% through feature optimization. Managed roadmap for 3 product lines.',
      },
      {
        id: generateId(),
        company: 'StartupHub',
        position: 'Product Manager',
        location: 'Palo Alto, CA',
        startDate: '2016-03',
        endDate: '2019-05',
        current: false,
        description:
          'Launched MVP resulting in $2M seed funding. Conducted user interviews and competitive analysis. Coordinated engineering and design teams.',
      },
    ],
    education: [
      {
        id: generateId(),
        institution: 'Stanford University',
        degree: 'MBA',
        field: 'Product Management',
        location: 'Stanford, CA',
        startDate: '2014-09',
        endDate: '2016-06',
        current: false,
        gpa: '3.8',
        achievements: 'Entrepreneurship Award',
      },
      commonEducation[0],
    ],
    skills: [
      { id: generateId(), name: 'Product Strategy', level: 'expert', category: 'Product' },
      { id: generateId(), name: 'Roadmap Planning', level: 'expert', category: 'Product' },
      { id: generateId(), name: 'User Research', level: 'advanced', category: 'Product' },
      { id: generateId(), name: 'Data Analysis', level: 'advanced', category: 'Product' },
      { id: generateId(), name: 'Agile/Scrum', level: 'expert', category: 'Process' },
      { id: generateId(), name: 'A/B Testing', level: 'advanced', category: 'Product' },
      { id: generateId(), name: 'SQL', level: 'intermediate', category: 'Technical' },
      { id: generateId(), name: 'Jira', level: 'expert', category: 'Tools' },
    ],
    projects: [],
    certifications: [
      {
        id: generateId(),
        name: 'Certified Scrum Product Owner',
        issuer: 'Scrum Alliance',
        date: '2020-03',
        expiryDate: '2023-03',
        credentialId: 'CSPO-123456',
        url: '',
      },
    ],
    languages: commonLanguages,
  },

  projectManager: {
    personalInfo: {
      ...basePersonalInfo,
      summary:
        'PMP-certified project manager with expertise in delivering complex projects on time and within budget. Strong leadership and stakeholder management skills.',
    },
    summary:
      'PMP-certified project manager with expertise in delivering complex projects on time and within budget. Strong leadership and stakeholder management skills.',
    workExperience: [
      {
        id: generateId(),
        company: 'GlobalTech Solutions',
        position: 'Senior Project Manager',
        location: 'Chicago, IL',
        startDate: '2018-01',
        endDate: '',
        current: true,
        description:
          'Led cross-functional teams of 15+ members. Delivered $5M enterprise project on schedule. Implemented project management best practices.',
      },
      {
        id: generateId(),
        company: 'ConsultingCorp',
        position: 'Project Manager',
        location: 'Detroit, MI',
        startDate: '2014-06',
        endDate: '2017-12',
        current: false,
        description:
          'Managed multiple concurrent projects for Fortune 500 clients. Achieved 95% on-time delivery rate.',
      },
    ],
    education: [
      {
        id: generateId(),
        institution: 'Northwestern University',
        degree: 'Master of Project Management',
        field: 'Project Management',
        location: 'Evanston, IL',
        startDate: '2012-09',
        endDate: '2014-06',
        current: false,
        gpa: '3.9',
        achievements: '',
      },
    ],
    skills: [
      { id: generateId(), name: 'Project Planning', level: 'expert', category: 'Management' },
      { id: generateId(), name: 'Risk Management', level: 'expert', category: 'Management' },
      { id: generateId(), name: 'Stakeholder Management', level: 'expert', category: 'Management' },
      { id: generateId(), name: 'Agile/Scrum', level: 'expert', category: 'Process' },
      { id: generateId(), name: 'Budget Management', level: 'expert', category: 'Management' },
      { id: generateId(), name: 'MS Project', level: 'expert', category: 'Tools' },
      { id: generateId(), name: 'Jira', level: 'advanced', category: 'Tools' },
      { id: generateId(), name: 'PMP', level: 'expert', category: 'Certification' },
    ],
    projects: [],
    certifications: [
      {
        id: generateId(),
        name: 'PMP - Project Management Professional',
        issuer: 'PMI',
        date: '2019-01',
        expiryDate: '2022-01',
        credentialId: 'PMP-123456',
        url: '',
      },
      {
        id: generateId(),
        name: 'CSM - Certified Scrum Master',
        issuer: 'Scrum Alliance',
        date: '2020-06',
        expiryDate: '',
        credentialId: 'CSM-789012',
        url: '',
      },
    ],
    languages: commonLanguages,
  },

  marketing: {
    personalInfo: {
      ...basePersonalInfo,
      summary:
        'Results-oriented marketing professional with expertise in digital marketing, campaign management, and brand strategy. Proven track record of driving growth.',
    },
    summary:
      'Results-oriented marketing professional with expertise in digital marketing, campaign management, and brand strategy. Proven track record of driving growth.',
    workExperience: [
      {
        id: generateId(),
        company: 'MarketingPro Agency',
        position: 'Marketing Manager',
        location: 'Los Angeles, CA',
        startDate: '2019-01',
        endDate: '',
        current: true,
        description:
          'Managed $2M annual marketing budget. Increased brand awareness by 45% through integrated campaigns. Led team of 5 marketing specialists.',
      },
      {
        id: generateId(),
        company: 'BrandBuilders',
        position: 'Digital Marketing Specialist',
        location: 'Santa Monica, CA',
        startDate: '2016-03',
        endDate: '2018-12',
        current: false,
        description:
          'Executed SEO and PPC campaigns. Grew social media following by 200%. Generated qualified leads through content marketing.',
      },
    ],
    education: [
      {
        id: generateId(),
        institution: 'UCLA',
        degree: 'Bachelor of Arts',
        field: 'Marketing',
        location: 'Los Angeles, CA',
        startDate: '2012-09',
        endDate: '2016-06',
        current: false,
        gpa: '3.5',
        achievements: 'Marketing Club President',
      },
    ],
    skills: [
      { id: generateId(), name: 'Digital Marketing', level: 'expert', category: 'Marketing' },
      { id: generateId(), name: 'SEO/SEM', level: 'expert', category: 'Marketing' },
      { id: generateId(), name: 'Social Media', level: 'expert', category: 'Marketing' },
      { id: generateId(), name: 'Content Marketing', level: 'expert', category: 'Marketing' },
      { id: generateId(), name: 'Google Analytics', level: 'expert', category: 'Tools' },
      { id: generateId(), name: 'HubSpot', level: 'advanced', category: 'Tools' },
      { id: generateId(), name: 'Mailchimp', level: 'advanced', category: 'Tools' },
      { id: generateId(), name: 'Adobe Creative Suite', level: 'intermediate', category: 'Tools' },
    ],
    projects: [],
    certifications: [
      {
        id: generateId(),
        name: 'Google Analytics Certified',
        issuer: 'Google',
        date: '2021-03',
        expiryDate: '',
        credentialId: 'GAIQ-123',
        url: '',
      },
      {
        id: generateId(),
        name: 'HubSpot Inbound Marketing',
        issuer: 'HubSpot',
        date: '2020-09',
        expiryDate: '',
        credentialId: 'HS-456',
        url: '',
      },
    ],
    languages: commonLanguages,
  },

  sales: {
    personalInfo: {
      ...basePersonalInfo,
      summary:
        'Top-performing sales professional with consistent track record of exceeding quotas. Expert in B2B enterprise sales and client relationship building.',
    },
    summary:
      'Top-performing sales professional with consistent track record of exceeding quotas. Expert in B2B enterprise sales and client relationship building.',
    workExperience: [
      {
        id: generateId(),
        company: 'EnterpriseSales Inc',
        position: 'Senior Account Executive',
        location: 'Denver, CO',
        startDate: '2019-04',
        endDate: '',
        current: true,
        description:
          'Achieved 150% of quota for 3 consecutive years. Generated $3M in new business annually. Built book of business worth $10M.',
      },
      {
        id: generateId(),
        company: 'TechSales Corp',
        position: 'Account Executive',
        location: 'Phoenix, AZ',
        startDate: '2015-07',
        endDate: '2019-03',
        current: false,
        description:
          'Consistently exceeded quarterly targets. Developed territory from $500K to $2M. Won Salesperson of the Year twice.',
      },
    ],
    education: [
      {
        id: generateId(),
        institution: 'University of Colorado',
        degree: 'Bachelor of Science',
        field: 'Business Administration',
        location: 'Boulder, CO',
        startDate: '2011-09',
        endDate: '2015-05',
        current: false,
        gpa: '3.4',
        achievements: '',
      },
    ],
    skills: [
      { id: generateId(), name: 'B2B Sales', level: 'expert', category: 'Sales' },
      { id: generateId(), name: 'Enterprise Sales', level: 'expert', category: 'Sales' },
      { id: generateId(), name: 'Negotiation', level: 'expert', category: 'Sales' },
      { id: generateId(), name: 'Salesforce', level: 'expert', category: 'Tools' },
      { id: generateId(), name: 'CRM Management', level: 'expert', category: 'Tools' },
      { id: generateId(), name: 'Lead Generation', level: 'expert', category: 'Sales' },
      { id: generateId(), name: 'Account Management', level: 'advanced', category: 'Sales' },
      { id: generateId(), name: 'Sales Forecasting', level: 'advanced', category: 'Sales' },
    ],
    projects: [],
    certifications: [
      {
        id: generateId(),
        name: 'Salesforce Sales Cloud Consultant',
        issuer: 'Salesforce',
        date: '2022-01',
        expiryDate: '2024-01',
        credentialId: 'SF-123456',
        url: '',
      },
    ],
    languages: commonLanguages,
  },

  accountant: {
    personalInfo: {
      ...basePersonalInfo,
      summary:
        'CPA-certified accountant with expertise in financial reporting, tax planning, and audit compliance. Strong analytical skills with attention to detail.',
    },
    summary:
      'CPA-certified accountant with expertise in financial reporting, tax planning, and audit compliance. Strong analytical skills with attention to detail.',
    workExperience: [
      {
        id: generateId(),
        company: 'BigFour Accounting',
        position: 'Senior Accountant',
        location: 'Houston, TX',
        startDate: '2017-06',
        endDate: '',
        current: true,
        description:
          'Led audit engagements for Fortune 500 clients. Prepared financial statements and tax returns. Supervised team of 4 staff accountants.',
      },
      {
        id: generateId(),
        company: 'Local CPA Firm',
        position: 'Staff Accountant',
        location: 'Dallas, TX',
        startDate: '2014-01',
        endDate: '2017-05',
        current: false,
        description:
          'Prepared individual and business tax returns. Performed bookkeeping and payroll services. Assisted with audit fieldwork.',
      },
    ],
    education: [
      {
        id: generateId(),
        institution: 'University of Texas',
        degree: 'Bachelor of Business Administration',
        field: 'Accounting',
        location: 'Austin, TX',
        startDate: '2010-09',
        endDate: '2013-12',
        current: false,
        gpa: '3.7',
        achievements: 'Accounting Honors Society',
      },
    ],
    skills: [
      { id: generateId(), name: 'Financial Reporting', level: 'expert', category: 'Accounting' },
      { id: generateId(), name: 'Tax Planning', level: 'expert', category: 'Tax' },
      { id: generateId(), name: 'Audit', level: 'expert', category: 'Audit' },
      { id: generateId(), name: 'QuickBooks', level: 'expert', category: 'Software' },
      { id: generateId(), name: 'Excel', level: 'expert', category: 'Software' },
      { id: generateId(), name: 'SAP', level: 'advanced', category: 'Software' },
      { id: generateId(), name: 'GAAP', level: 'expert', category: 'Standards' },
      { id: generateId(), name: 'CPA', level: 'expert', category: 'Certification' },
    ],
    projects: [],
    certifications: [
      {
        id: generateId(),
        name: 'CPA - Certified Public Accountant',
        issuer: 'Texas State Board',
        date: '2018-01',
        expiryDate: '',
        credentialId: 'CPA-TX-12345',
        url: '',
      },
    ],
    languages: commonLanguages,
  },

  nurse: {
    personalInfo: {
      ...basePersonalInfo,
      summary:
        'Compassionate registered nurse with 8 years of experience in patient care. Specialized in critical care and emergency nursing with strong clinical skills.',
    },
    summary:
      'Compassionate registered nurse with 8 years of experience in patient care. Specialized in critical care and emergency nursing with strong clinical skills.',
    workExperience: [
      {
        id: generateId(),
        company: 'City General Hospital',
        position: 'Registered Nurse - ICU',
        location: 'Miami, FL',
        startDate: '2018-03',
        endDate: '',
        current: true,
        description:
          'Provide critical care to ventilated and critically ill patients. Manage IV medications and titrate vasopressors. Lead code blue responses.',
      },
      {
        id: generateId(),
        company: 'Community Medical Center',
        position: 'Registered Nurse - Med-Surg',
        location: 'Tampa, FL',
        startDate: '2014-06',
        endDate: '2018-02',
        current: false,
        description:
          'Provided direct patient care on 40-bed unit. Administered medications and treatments. Educated patients and families on care plans.',
      },
    ],
    education: [
      {
        id: generateId(),
        institution: 'University of Miami',
        degree: 'Bachelor of Science in Nursing',
        field: 'Nursing',
        location: 'Miami, FL',
        startDate: '2010-09',
        endDate: '2014-05',
        current: false,
        gpa: '3.8',
        achievements: 'Magna Cum Laude, Nursing Leadership Award',
      },
    ],
    skills: [
      { id: generateId(), name: 'Critical Care', level: 'expert', category: 'Clinical' },
      { id: generateId(), name: 'Patient Assessment', level: 'expert', category: 'Clinical' },
      { id: generateId(), name: 'IV Therapy', level: 'expert', category: 'Clinical' },
      { id: generateId(), name: 'EKG Interpretation', level: 'expert', category: 'Clinical' },
      {
        id: generateId(),
        name: 'Medication Administration',
        level: 'expert',
        category: 'Clinical',
      },
      { id: generateId(), name: 'Epic EHR', level: 'advanced', category: 'Technology' },
      { id: generateId(), name: 'Patient Education', level: 'expert', category: 'Communication' },
      { id: generateId(), name: 'BLS/ACLS', level: 'expert', category: 'Certifications' },
    ],
    projects: [],
    certifications: [
      {
        id: generateId(),
        name: 'RN - Registered Nurse',
        issuer: 'Florida Board of Nursing',
        date: '2014-06',
        expiryDate: '2026-04',
        credentialId: 'RN-FL-789012',
        url: '',
      },
      {
        id: generateId(),
        name: 'CCRN - Critical Care Registered Nurse',
        issuer: 'AACN',
        date: '2020-03',
        expiryDate: '2023-03',
        credentialId: 'CCRN-345678',
        url: '',
      },
    ],
    languages: [
      ...commonLanguages,
      { id: generateId(), name: 'Portuguese', proficiency: 'intermediate' },
    ],
  },

  teacher: {
    personalInfo: {
      ...basePersonalInfo,
      summary:
        'Dedicated educator with 10 years of experience in secondary education. Passionate about student success and innovative teaching methodologies.',
    },
    summary:
      'Dedicated educator with 10 years of experience in secondary education. Passionate about student success and innovative teaching methodologies.',
    workExperience: [
      {
        id: generateId(),
        company: 'Lincoln High School',
        position: 'Mathematics Teacher',
        location: 'Portland, OR',
        startDate: '2016-08',
        endDate: '',
        current: true,
        description:
          'Teach Algebra and Geometry to students grades 9-12. Implemented project-based learning increasing student engagement by 30%. Mentored student math club.',
      },
      {
        id: generateId(),
        company: 'Washington Middle School',
        position: 'Math Instructor',
        location: 'Seattle, WA',
        startDate: '2012-08',
        endDate: '2016-07',
        current: false,
        description:
          'Taught math to grades 6-8. Differentiated instruction for diverse learners. Coordinated after-school tutoring program.',
      },
    ],
    education: [
      {
        id: generateId(),
        institution: 'University of Washington',
        degree: 'Master of Education',
        field: 'Secondary Mathematics',
        location: 'Seattle, WA',
        startDate: '2018-09',
        endDate: '2020-06',
        current: false,
        gpa: '3.9',
        achievements: 'Teacher of the Year Finalist',
      },
      {
        id: generateId(),
        institution: 'Washington State University',
        degree: 'Bachelor of Arts',
        field: 'Mathematics',
        location: 'Pullman, WA',
        startDate: '2008-09',
        endDate: '2012-06',
        current: false,
        gpa: '3.6',
        achievements: '',
      },
    ],
    skills: [
      { id: generateId(), name: 'Mathematics Instruction', level: 'expert', category: 'Subject' },
      { id: generateId(), name: 'Curriculum Development', level: 'expert', category: 'Pedagogy' },
      { id: generateId(), name: 'Classroom Management', level: 'expert', category: 'Pedagogy' },
      { id: generateId(), name: 'Student Assessment', level: 'expert', category: 'Pedagogy' },
      {
        id: generateId(),
        name: 'Differentiated Instruction',
        level: 'expert',
        category: 'Pedagogy',
      },
      { id: generateId(), name: 'Technology Integration', level: 'advanced', category: 'Tools' },
      { id: generateId(), name: 'Google Classroom', level: 'expert', category: 'Tools' },
    ],
    projects: [],
    certifications: [
      {
        id: generateId(),
        name: 'Professional Teaching Certificate',
        issuer: 'Oregon Teacher Standards',
        date: '2016-08',
        expiryDate: '2026-08',
        credentialId: 'OTC-OR-12345',
        url: '',
      },
    ],
    languages: commonLanguages,
  },

  academic: {
    personalInfo: {
      ...basePersonalInfo,
      summary:
        'Research scientist with PhD in Computer Science specializing in artificial intelligence and machine learning. Published author with strong academic record.',
    },
    summary:
      'Research scientist with PhD in Computer Science specializing in artificial intelligence and machine learning. Published author with strong academic record.',
    workExperience: [
      {
        id: generateId(),
        company: 'State University',
        position: 'Assistant Professor',
        location: 'Philadelphia, PA',
        startDate: '2019-08',
        endDate: '',
        current: true,
        description:
          'Conduct research in machine learning and natural language processing. Teach graduate and undergraduate courses. Supervise 5 PhD students.',
      },
      {
        id: generateId(),
        company: 'MIT',
        position: 'Postdoctoral Researcher',
        location: 'Cambridge, MA',
        startDate: '2016-09',
        endDate: '2019-07',
        current: false,
        description:
          'Conducted research in deep learning and computer vision. Published 15+ papers in top-tier conferences. Secured $500K in research funding.',
      },
    ],
    education: [
      {
        id: generateId(),
        institution: 'Stanford University',
        degree: 'PhD',
        field: 'Computer Science',
        location: 'Stanford, CA',
        startDate: '2012-09',
        endDate: '2016-06',
        current: false,
        gpa: '',
        achievements: 'Dissertation: Deep Learning for Natural Language Understanding',
      },
      {
        id: generateId(),
        institution: 'Princeton University',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        location: 'Princeton, NJ',
        startDate: '2008-09',
        endDate: '2012-05',
        current: false,
        gpa: '3.9',
        achievements: 'Summa Cum Laude, Phi Beta Kappa',
      },
    ],
    skills: [
      { id: generateId(), name: 'Machine Learning', level: 'expert', category: 'Research' },
      { id: generateId(), name: 'Deep Learning', level: 'expert', category: 'Research' },
      { id: generateId(), name: 'NLP', level: 'expert', category: 'Research' },
      { id: generateId(), name: 'Python', level: 'expert', category: 'Technical' },
      { id: generateId(), name: 'TensorFlow', level: 'expert', category: 'Technical' },
      { id: generateId(), name: 'Research', level: 'expert', category: 'Academic' },
      { id: generateId(), name: 'Grant Writing', level: 'advanced', category: 'Academic' },
      { id: generateId(), name: 'Academic Writing', level: 'expert', category: 'Academic' },
    ],
    projects: [],
    certifications: [],
    languages: commonLanguages,
  },

  lawyer: {
    personalInfo: {
      ...basePersonalInfo,
      summary:
        'Experienced attorney specializing in corporate law and mergers & acquisitions. Strong negotiation skills and business acumen.',
    },
    summary:
      'Experienced attorney specializing in corporate law and mergers & acquisitions. Strong negotiation skills and business acumen.',
    workExperience: [
      {
        id: generateId(),
        company: 'TopTier Law Firm',
        position: 'Associate Attorney',
        location: 'Chicago, IL',
        startDate: '2017-09',
        endDate: '',
        current: true,
        description:
          'Practice corporate law including M&A, securities, and corporate governance. Represent clients in complex transactions valued at $500M+.',
      },
      {
        id: generateId(),
        company: 'Legal Services Inc',
        position: 'Junior Associate',
        location: 'Indianapolis, IN',
        startDate: '2014-06',
        endDate: '2017-08',
        current: false,
        description:
          'Assisted with corporate transactions and contract negotiations. Performed due diligence and legal research.',
      },
    ],
    education: [
      {
        id: generateId(),
        institution: 'Harvard Law School',
        degree: 'Juris Doctor',
        field: 'Law',
        location: 'Cambridge, MA',
        startDate: '2011-09',
        endDate: '2014-05',
        current: false,
        gpa: '3.7',
        achievements: 'Law Review, Moot Court Board',
      },
      {
        id: generateId(),
        institution: 'University of Notre Dame',
        degree: 'Bachelor of Arts',
        field: 'Political Science',
        location: 'Notre Dame, IN',
        startDate: '2007-09',
        endDate: '2011-05',
        current: false,
        gpa: '3.8',
        achievements: 'Magna Cum Laude',
      },
    ],
    skills: [
      { id: generateId(), name: 'Corporate Law', level: 'expert', category: 'Legal' },
      { id: generateId(), name: 'M&A', level: 'expert', category: 'Legal' },
      { id: generateId(), name: 'Contract Negotiation', level: 'expert', category: 'Legal' },
      { id: generateId(), name: 'Due Diligence', level: 'expert', category: 'Legal' },
      { id: generateId(), name: 'Legal Research', level: 'expert', category: 'Legal' },
      { id: generateId(), name: 'Client Relations', level: 'advanced', category: 'Soft Skills' },
      { id: generateId(), name: 'Westlaw', level: 'expert', category: 'Tools' },
    ],
    projects: [],
    certifications: [
      {
        id: generateId(),
        name: 'Illinois Bar Admission',
        issuer: 'Illinois Supreme Court',
        date: '2014-10',
        expiryDate: '',
        credentialId: 'IL-123456',
        url: '',
      },
    ],
    languages: commonLanguages,
  },

  engineer: {
    personalInfo: {
      ...basePersonalInfo,
      summary:
        'Licensed professional engineer with expertise in structural analysis and project management. Experienced in commercial and industrial construction.',
    },
    summary:
      'Licensed professional engineer with expertise in structural analysis and project management. Experienced in commercial and industrial construction.',
    workExperience: [
      {
        id: generateId(),
        company: 'Engineering Partners LLC',
        position: 'Senior Structural Engineer',
        location: 'Atlanta, GA',
        startDate: '2016-03',
        endDate: '',
        current: true,
        description:
          'Lead structural design for commercial buildings. Perform structural analysis using SAP2000 and ETABS. Manage engineering team of 6.',
      },
      {
        id: generateId(),
        company: 'BuildRight Construction',
        position: 'Structural Engineer',
        location: 'Charlotte, NC',
        startDate: '2012-06',
        endDate: '2016-02',
        current: false,
        description:
          'Designed structural systems for residential and commercial projects. Prepared construction documents and specifications.',
      },
    ],
    education: [
      {
        id: generateId(),
        institution: 'Georgia Tech',
        degree: 'Master of Science',
        field: 'Civil Engineering',
        location: 'Atlanta, GA',
        startDate: '2010-09',
        endDate: '2012-05',
        current: false,
        gpa: '3.9',
        achievements: 'Graduate Research Assistant',
      },
      {
        id: generateId(),
        institution: 'Virginia Tech',
        degree: 'Bachelor of Science',
        field: 'Civil Engineering',
        location: 'Blacksburg, VA',
        startDate: '2006-09',
        endDate: '2010-05',
        current: false,
        gpa: '3.7',
        achievements: "Dean's List",
      },
    ],
    skills: [
      { id: generateId(), name: 'Structural Analysis', level: 'expert', category: 'Engineering' },
      { id: generateId(), name: 'AutoCAD', level: 'expert', category: 'Software' },
      { id: generateId(), name: 'SAP2000', level: 'expert', category: 'Software' },
      { id: generateId(), name: 'ETABS', level: 'expert', category: 'Software' },
      { id: generateId(), name: 'Revit', level: 'advanced', category: 'Software' },
      { id: generateId(), name: 'Project Management', level: 'advanced', category: 'Management' },
      { id: generateId(), name: 'PE License', level: 'expert', category: 'Certification' },
    ],
    projects: commonProjects,
    certifications: [
      {
        id: generateId(),
        name: 'PE - Professional Engineer',
        issuer: 'Georgia Board',
        date: '2018-01',
        expiryDate: '',
        credentialId: 'PE-GA-45678',
        url: '',
      },
    ],
    languages: commonLanguages,
  },

  executive: {
    personalInfo: {
      ...basePersonalInfo,
      summary:
        'C-level executive with 20+ years of experience in technology leadership. Proven track record of driving growth, innovation, and operational excellence.',
    },
    summary:
      'C-level executive with 20+ years of experience in technology leadership. Proven track record of driving growth, innovation, and operational excellence.',
    workExperience: [
      {
        id: generateId(),
        company: 'TechVenture Inc',
        position: 'Chief Technology Officer',
        location: 'San Jose, CA',
        startDate: '2018-01',
        endDate: '',
        current: true,
        description:
          'Lead technology strategy and innovation for 500+ employee company. $50M annual technology budget. Board member driving digital transformation.',
      },
      {
        id: generateId(),
        company: 'GlobalTech Corp',
        position: 'VP of Engineering',
        location: 'Santa Clara, CA',
        startDate: '2012-06',
        endDate: '2017-12',
        current: false,
        description:
          'Built engineering organization from 50 to 300 people. Launched 5 major product lines. Increased R&D productivity by 40%.',
      },
      {
        id: generateId(),
        company: 'StartupTech',
        position: 'Engineering Director',
        location: 'Palo Alto, CA',
        startDate: '2008-01',
        endDate: '2012-05',
        current: false,
        description:
          'Scaled startup through Series A to IPO. Built core platform serving 10M users.',
      },
    ],
    education: [
      {
        id: generateId(),
        institution: 'Stanford Graduate School of Business',
        degree: 'MBA',
        field: 'Business Administration',
        location: 'Stanford, CA',
        startDate: '2006-09',
        endDate: '2008-06',
        current: false,
        gpa: '3.8',
        achievements: 'Forté Fellow',
      },
      {
        id: generateId(),
        institution: 'UC Berkeley',
        degree: 'Bachelor of Science',
        field: 'Electrical Engineering',
        location: 'Berkeley, CA',
        startDate: '1998-09',
        endDate: '2002-05',
        current: false,
        gpa: '3.6',
        achievements: '',
      },
    ],
    skills: [
      { id: generateId(), name: 'Strategic Planning', level: 'expert', category: 'Leadership' },
      { id: generateId(), name: 'Technology Strategy', level: 'expert', category: 'Technology' },
      { id: generateId(), name: 'Executive Leadership', level: 'expert', category: 'Leadership' },
      { id: generateId(), name: 'Board Relations', level: 'expert', category: 'Leadership' },
      { id: generateId(), name: 'M&A', level: 'advanced', category: 'Business' },
      { id: generateId(), name: 'P&L Management', level: 'expert', category: 'Finance' },
      { id: generateId(), name: 'Team Building', level: 'expert', category: 'Leadership' },
      { id: generateId(), name: 'Cloud Architecture', level: 'advanced', category: 'Technology' },
    ],
    projects: [],
    certifications: [],
    languages: commonLanguages,
  },

  hr: {
    personalInfo: {
      ...basePersonalInfo,
      summary:
        'Strategic HR leader with expertise in talent acquisition, employee development, and organizational design. SHRM-CP certified.',
    },
    summary:
      'Strategic HR leader with expertise in talent acquisition, employee development, and organizational design. SHRM-CP certified.',
    workExperience: [
      {
        id: generateId(),
        company: 'Fortune 500 Company',
        position: 'Senior HR Manager',
        location: 'Minneapolis, MN',
        startDate: '2018-04',
        endDate: '',
        current: true,
        description:
          'Lead HR for 1000+ employee division. Implemented talent management program reducing turnover by 25%. Strategic partner to C-suite.',
      },
      {
        id: generateId(),
        company: 'MidSize Corp',
        position: 'HR Business Partner',
        location: 'Milwaukee, WI',
        startDate: '2014-06',
        endDate: '2018-03',
        current: false,
        description:
          'Partnered with business leaders on HR initiatives. Led recruitment for technical roles. Implemented performance management system.',
      },
    ],
    education: [
      {
        id: generateId(),
        institution: 'University of Minnesota',
        degree: 'Master of Arts',
        field: 'Human Resources',
        location: 'Minneapolis, MN',
        startDate: '2012-09',
        endDate: '2014-05',
        current: false,
        gpa: '3.9',
        achievements: 'HR Excellence Award',
      },
      {
        id: generateId(),
        institution: 'University of Wisconsin',
        degree: 'Bachelor of Arts',
        field: 'Psychology',
        location: 'Madison, WI',
        startDate: '2008-09',
        endDate: '2012-05',
        current: false,
        gpa: '3.5',
        achievements: '',
      },
    ],
    skills: [
      { id: generateId(), name: 'Talent Acquisition', level: 'expert', category: 'HR' },
      { id: generateId(), name: 'Employee Relations', level: 'expert', category: 'HR' },
      { id: generateId(), name: 'Performance Management', level: 'expert', category: 'HR' },
      { id: generateId(), name: 'Compensation', level: 'advanced', category: 'HR' },
      { id: generateId(), name: 'Workday', level: 'expert', category: 'Systems' },
      { id: generateId(), name: 'SuccessFactors', level: 'advanced', category: 'Systems' },
      { id: generateId(), name: 'SHRM-CP', level: 'expert', category: 'Certification' },
    ],
    projects: [],
    certifications: [
      {
        id: generateId(),
        name: 'SHRM-CP',
        issuer: 'SHRM',
        date: '2020-01',
        expiryDate: '2023-01',
        credentialId: 'SHRM-123456',
        url: '',
      },
    ],
    languages: commonLanguages,
  },

  consultant: {
    personalInfo: {
      ...basePersonalInfo,
      summary:
        'Management consultant with expertise in strategy and operations. Top-tier consulting background with focus on technology transformation.',
    },
    summary:
      'Management consultant with expertise in strategy and operations. Top-tier consulting background with focus on technology transformation.',
    workExperience: [
      {
        id: generateId(),
        company: 'McKinsey & Company',
        position: 'Senior Consultant',
        location: 'Boston, MA',
        startDate: '2017-09',
        endDate: '',
        current: true,
        description:
          'Lead client engagements in strategy and digital transformation. Work with Fortune 500 executives. Manage teams of 5-8 consultants.',
      },
      {
        id: generateId(),
        company: 'Accenture',
        position: 'Consultant',
        location: 'New York, NY',
        startDate: '2014-06',
        endDate: '2017-08',
        current: false,
        description:
          'Delivered technology implementation projects for banking clients. Conducted process optimization and due diligence.',
      },
    ],
    education: [
      {
        id: generateId(),
        institution: 'Wharton School',
        degree: 'MBA',
        field: 'Strategy',
        location: 'Philadelphia, PA',
        startDate: '2012-09',
        endDate: '2014-05',
        current: false,
        gpa: '3.8',
        achievements: 'Consulting Club President',
      },
      {
        id: generateId(),
        institution: 'Duke University',
        degree: 'Bachelor of Science',
        field: 'Economics',
        location: 'Durham, NC',
        startDate: '2008-09',
        endDate: '2012-05',
        current: false,
        gpa: '3.7',
        achievements: 'Magna Cum Laude',
      },
    ],
    skills: [
      { id: generateId(), name: 'Strategy', level: 'expert', category: 'Consulting' },
      { id: generateId(), name: 'Digital Transformation', level: 'expert', category: 'Consulting' },
      { id: generateId(), name: 'Operations', level: 'expert', category: 'Consulting' },
      { id: generateId(), name: 'Due Diligence', level: 'advanced', category: 'Finance' },
      { id: generateId(), name: 'PowerPoint', level: 'expert', category: 'Tools' },
      { id: generateId(), name: 'Excel', level: 'expert', category: 'Tools' },
      { id: generateId(), name: 'SQL', level: 'intermediate', category: 'Technical' },
    ],
    projects: [],
    certifications: [],
    languages: commonLanguages,
  },

  itSupport: {
    personalInfo: {
      ...basePersonalInfo,
      summary:
        'IT professional with strong help desk and systems administration experience. CompTIA A+ and Network+ certified with excellent troubleshooting skills.',
    },
    summary:
      'IT professional with strong help desk and systems administration experience. CompTIA A+ and Network+ certified with excellent troubleshooting skills.',
    workExperience: [
      {
        id: generateId(),
        company: 'TechSupport Services',
        position: 'Senior IT Support Specialist',
        location: 'Raleigh, NC',
        startDate: '2019-03',
        endDate: '',
        current: true,
        description:
          'Provide Tier 2/3 support for 500+ end users. Manage Windows Server and Active Directory. Implement IT security policies.',
      },
      {
        id: generateId(),
        company: 'HelpDesk Solutions',
        position: 'IT Support Technician',
        location: 'Durham, NC',
        startDate: '2015-06',
        endDate: '2019-02',
        current: false,
        description:
          'Resolved technical issues for enterprise clients. Performed hardware/software installations and upgrades.',
      },
    ],
    education: [
      {
        id: generateId(),
        institution: 'Wake Tech Community College',
        degree: 'Associate of Applied Science',
        field: 'Information Technology',
        location: 'Raleigh, NC',
        startDate: '2013-08',
        endDate: '2015-05',
        current: false,
        gpa: '3.8',
        achievements: 'IT Student of the Year',
      },
    ],
    skills: [
      { id: generateId(), name: 'Help Desk Support', level: 'expert', category: 'Support' },
      { id: generateId(), name: 'Windows Server', level: 'advanced', category: 'Systems' },
      { id: generateId(), name: 'Active Directory', level: 'advanced', category: 'Systems' },
      { id: generateId(), name: 'Networking', level: 'advanced', category: 'Infrastructure' },
      { id: generateId(), name: 'Troubleshooting', level: 'expert', category: 'Support' },
      { id: generateId(), name: 'ServiceNow', level: 'advanced', category: 'Tools' },
      { id: generateId(), name: 'ITIL', level: 'advanced', category: 'Methodology' },
      { id: generateId(), name: 'CompTIA A+', level: 'expert', category: 'Certification' },
    ],
    projects: [],
    certifications: [
      {
        id: generateId(),
        name: 'CompTIA A+',
        issuer: 'CompTIA',
        date: '2019-06',
        expiryDate: '2022-06',
        credentialId: 'A+-123456',
        url: '',
      },
      {
        id: generateId(),
        name: 'CompTIA Network+',
        issuer: 'CompTIA',
        date: '2020-03',
        expiryDate: '2023-03',
        credentialId: 'N+-789012',
        url: '',
      },
    ],
    languages: commonLanguages,
  },

  military: {
    personalInfo: {
      ...basePersonalInfo,
      summary:
        'Decorated veteran transitioning to civilian workforce. Strong leadership, discipline, and security clearance. Translating military expertise to corporate success.',
    },
    summary:
      'Decorated veteran transitioning to civilian workforce. Strong leadership, discipline, and security clearance. Translating military expertise to corporate success.',
    workExperience: [
      {
        id: generateId(),
        company: 'US Army',
        position: 'Captain / Company Commander',
        location: 'Fort Bragg, NC',
        startDate: '2014-06',
        endDate: '2020-12',
        current: false,
        description:
          'Commanded 150-soldier company. Managed $5M annual budget. Led combat deployments and training exercises. Awarded Bronze Star.',
      },
      {
        id: generateId(),
        company: 'US Army',
        position: 'Lieutenant / Platoon Leader',
        location: 'Fort Hood, TX',
        startDate: '2010-06',
        endDate: '2014-05',
        current: false,
        description:
          'Led 30-soldier platoon in tactical operations. Coordinated logistics and personnel management. Distinguished Military Graduate.',
      },
    ],
    education: [
      {
        id: generateId(),
        institution: 'US Military Academy',
        degree: 'Bachelor of Science',
        field: 'Engineering Management',
        location: 'West Point, NY',
        startDate: '2006-08',
        endDate: '2010-05',
        current: false,
        gpa: '3.5',
        achievements: 'Graduated with Honor, Army Ranger',
      },
      {
        id: generateId(),
        institution: 'US Army Command',
        degree: 'Master of Military Art',
        field: 'Leadership',
        location: 'Fort Leavenworth, KS',
        startDate: '2018-08',
        endDate: '2019-06',
        current: false,
        gpa: '',
        achievements: '',
      },
    ],
    skills: [
      { id: generateId(), name: 'Leadership', level: 'expert', category: 'Military' },
      { id: generateId(), name: 'Team Management', level: 'expert', category: 'Management' },
      { id: generateId(), name: 'Strategic Planning', level: 'expert', category: 'Planning' },
      { id: generateId(), name: 'Logistics', level: 'expert', category: 'Operations' },
      { id: generateId(), name: 'Crisis Management', level: 'expert', category: 'Management' },
      { id: generateId(), name: 'Security Clearance', level: 'expert', category: 'Military' },
      { id: generateId(), name: 'Training', level: 'expert', category: 'Military' },
    ],
    projects: [],
    certifications: [],
    languages: commonLanguages,
  },

  federal: {
    personalInfo: {
      ...basePersonalInfo,
      summary:
        'Experienced federal employee with expertise in program management and policy implementation. Strong track record of meeting government objectives and compliance requirements.',
    },
    summary:
      'Experienced federal employee with expertise in program management and policy implementation. Strong track record of meeting government objectives and compliance requirements.',
    workExperience: [
      {
        id: generateId(),
        company: 'US Department of Commerce',
        position: 'Program Manager',
        location: 'Washington, DC',
        startDate: '2017-09',
        endDate: '',
        current: true,
        description:
          'Manage $20M federal program. Oversee contractor performance and compliance. Report to Congress on program outcomes. Supervise 8 staff.',
      },
      {
        id: generateId(),
        company: 'US Department of Labor',
        position: 'Management Analyst',
        location: 'Washington, DC',
        startDate: '2013-06',
        endDate: '2017-08',
        current: false,
        description:
          'Analyzed program operations and recommended improvements. Developed performance metrics and reporting systems.',
      },
    ],
    education: [
      {
        id: generateId(),
        institution: 'Georgetown University',
        degree: 'Master of Public Policy',
        field: 'Public Policy',
        location: 'Washington, DC',
        startDate: '2011-09',
        endDate: '2013-05',
        current: false,
        gpa: '3.8',
        achievements: '',
      },
      {
        id: generateId(),
        institution: 'University of Maryland',
        degree: 'Bachelor of Arts',
        field: 'Political Science',
        location: 'College Park, MD',
        startDate: '2007-09',
        endDate: '2011-05',
        current: false,
        gpa: '3.6',
        achievements: 'Pi Sigma Alpha',
      },
    ],
    skills: [
      { id: generateId(), name: 'Program Management', level: 'expert', category: 'Management' },
      { id: generateId(), name: 'Federal Procurement', level: 'advanced', category: 'Government' },
      { id: generateId(), name: 'Policy Analysis', level: 'expert', category: 'Analysis' },
      { id: generateId(), name: 'Budget Analysis', level: 'advanced', category: 'Finance' },
      { id: generateId(), name: 'Regulatory Compliance', level: 'expert', category: 'Government' },
      { id: generateId(), name: 'Stakeholder Management', level: 'expert', category: 'Management' },
      { id: generateId(), name: 'Microsoft Office', level: 'expert', category: 'Tools' },
    ],
    projects: [],
    certifications: [],
    languages: commonLanguages,
  },
};

export const getSampleDataForTemplate = (templateId: TemplateType): SampleData => {
  return sampleDataMap[templateId] || sampleDataMap.modern;
};
