export interface AutocompleteData {
  jobTitles: string[];
  companies: string[];
  universities: string[];
  degrees: string[];
  fieldsOfStudy: string[];
  skills: {
    programming: string[];
    frontend: string[];
    backend: string[];
    databases: string[];
    cloud: string[];
    devops: string[];
    tools: string[];
    frameworks: string[];
    methodologies: string[];
    softSkills: string[];
  };
  certifications: string[];
  certificationIssuers: string[];
  locations: {
    usCities: string[];
    states: string[];
    countries: string[];
  };
  languages: string[];
  proficiencyLevels: string[];
  skillLevels: string[];

  /** Reference/professional relationship types */
  relationships: string[];
  /** Leadership & management core competencies */
  coreCompetencies: string[];
  /** Healthcare clinical skills */
  clinicalSkills: string[];
  /** Legal practice areas */
  practiceAreas: string[];
  /** US security clearance levels */
  securityClearance: string[];
}
