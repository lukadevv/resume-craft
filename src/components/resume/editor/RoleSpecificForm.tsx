'use client';

import { useTranslations } from 'next-intl';
import type { Resume } from '@/types/resume';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { TagArrayEditor } from '@/components/ui/TagArrayEditor';
import { SkillTagAutocomplete } from '@/components/ui/SkillTagAutocomplete';
import { StructuredEntryEditor, type EntryField } from '@/components/ui/StructuredEntryEditor';

interface RoleSpecificFormProps {
  resume: Resume;
  onUpdate: (data: Partial<Resume>) => void;
}

const SECURITY_CLEARANCE_OPTIONS = [
  '',
  'Confidential',
  'Secret',
  'Top Secret',
  'TS/SCI',
  'Top Secret/Sensitive Compartmented Information',
  'Public Trust',
  'Q Clearance',
  'L Clearance',
];

const publicationFields: EntryField[] = [
  { key: 'title', label: 'Title', placeholder: 'Publication title' },
  { key: 'publisher', label: 'Publisher', placeholder: 'Journal, conference, or publisher' },
  { key: 'date', label: 'Date', type: 'month' },
  { key: 'url', label: 'URL', type: 'url', placeholder: 'https://' },
];

const licenseFields: EntryField[] = [
  { key: 'name', label: 'License/Certification', placeholder: 'License name' },
  { key: 'issuer', label: 'Issuing Authority', placeholder: 'State board or organization' },
  { key: 'date', label: 'Date Obtained', type: 'month' },
];

const grantFields: EntryField[] = [
  { key: 'name', label: 'Grant/Fellowship Name', placeholder: 'Grant or fellowship name' },
  { key: 'amount', label: 'Amount', placeholder: '$10,000' },
  { key: 'date', label: 'Date', type: 'month' },
];

const conferenceFields: EntryField[] = [
  { key: 'name', label: 'Conference Name', placeholder: 'Conference or event name' },
  { key: 'role', label: 'Your Role', placeholder: 'Speaker, Attendee, Panelist...' },
  { key: 'date', label: 'Date', type: 'month' },
];

const barFields: EntryField[] = [
  { key: 'state', label: 'State', placeholder: 'California, New York...' },
  { key: 'date', label: 'Admission Date', type: 'month' },
];

const teachingFields: EntryField[] = [
  { key: 'institution', label: 'Institution', placeholder: 'University or school name' },
  { key: 'subject', label: 'Subject Taught', placeholder: 'Course or subject' },
  { key: 'date', label: 'Date', type: 'month' },
];

export function RoleSpecificForm({ resume, onUpdate }: RoleSpecificFormProps) {
  const t = useTranslations('resume-form');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{t('steps.roleSpecific')}</h2>
        <p className="text-foreground-secondary">{t('stepDescriptions.roleSpecific')}</p>
      </div>

      {/* Security Clearance */}
      <div className="space-y-2">
        <Label>Security Clearance</Label>
        <div className="relative">
          <select
            value={resume.securityClearance}
            onChange={(e) => onUpdate({ securityClearance: e.target.value })}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm appearance-none pr-8"
          >
            {SECURITY_CLEARANCE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt || 'None'}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tools & Technologies */}
      <div className="space-y-2">
        <Label>Tools & Technologies</Label>
        <SkillTagAutocomplete
          value={resume.tools}
          onChange={(tools) => onUpdate({ tools })}
          placeholder="Type a tool (React, Docker, Figma...)"
        />
        <p className="text-xs text-foreground-secondary">
          Appears in: software, technical, and creative templates
        </p>
      </div>

      {/* Core Competencies */}
      <TagArrayEditor
        value={resume.coreCompetencies}
        onChange={(coreCompetencies) => onUpdate({ coreCompetencies })}
        label="Core Competencies"
        placeholder="Type a competency (Strategic Planning, Team Leadership...)"
        autocompleteFieldType="coreCompetency"
      />

      {/* Key Achievements */}
      <TagArrayEditor
        value={resume.achievements}
        onChange={(achievements) => onUpdate({ achievements })}
        label="Key Achievements"
        placeholder="Type an achievement"
      />

      {/* Awards */}
      <TagArrayEditor
        value={resume.awards}
        onChange={(awards) => onUpdate({ awards })}
        label="Awards & Honors"
        placeholder="Type an award"
      />

      {/* Professional Affiliations */}
      <TagArrayEditor
        value={resume.affiliations}
        onChange={(affiliations) => onUpdate({ affiliations })}
        label="Professional Affiliations"
        placeholder="Type an organization"
      />

      {/* Clinical Skills */}
      <TagArrayEditor
        value={resume.clinicalSkills}
        onChange={(clinicalSkills) => onUpdate({ clinicalSkills })}
        label="Clinical Skills"
        placeholder="Type a clinical skill (Vital Signs, Phlebotomy, EKG...)"
        autocompleteFieldType="clinicalSkill"
      />

      {/* Practice Areas */}
      <TagArrayEditor
        value={resume.practiceAreas}
        onChange={(practiceAreas) => onUpdate({ practiceAreas })}
        label="Practice Areas"
        placeholder="Type a practice area (Corporate Law, Criminal Law...)"
        autocompleteFieldType="practiceArea"
      />

      {/* Divider */}
      <hr className="border-border" />

      {/* Publications */}
      <StructuredEntryEditor
        value={resume.publications}
        onChange={(publications) => onUpdate({ publications })}
        fields={publicationFields}
        createEmpty={() => ({
          id: crypto.randomUUID(),
          title: '',
          publisher: '',
          date: '',
          url: '',
        })}
        label="Publications"
        description="Journal articles, conference papers, books, or research publications"
      />

      {/* Licenses & Certifications */}
      <StructuredEntryEditor
        value={resume.licenses}
        onChange={(licenses) => onUpdate({ licenses })}
        fields={licenseFields}
        createEmpty={() => ({
          id: crypto.randomUUID(),
          name: '',
          issuer: '',
          date: '',
        })}
        label="Professional Licenses"
        description="Occupational or professional licenses (medical, engineering, real estate, etc.)"
      />

      {/* Grants & Fellowships */}
      <StructuredEntryEditor
        value={resume.grantsFellowships}
        onChange={(grantsFellowships) => onUpdate({ grantsFellowships })}
        fields={grantFields}
        createEmpty={() => ({
          id: crypto.randomUUID(),
          name: '',
          amount: '',
          date: '',
        })}
        label="Grants & Fellowships"
        description="Research grants, academic fellowships, or funding awards"
      />

      {/* Conferences */}
      <StructuredEntryEditor
        value={resume.conferences}
        onChange={(conferences) => onUpdate({ conferences })}
        fields={conferenceFields}
        createEmpty={() => ({
          id: crypto.randomUUID(),
          name: '',
          role: '',
          date: '',
        })}
        label="Conferences"
        description="Speaking engagements, panel participation, or attendance"
      />

      {/* Bar Admissions */}
      <StructuredEntryEditor
        value={resume.barAdmission}
        onChange={(barAdmission) => onUpdate({ barAdmission })}
        fields={barFields}
        createEmpty={() => ({
          id: crypto.randomUUID(),
          state: '',
          date: '',
        })}
        label="Bar Admissions"
        description="State bar admissions for legal professionals"
      />

      {/* Teaching Experience */}
      <StructuredEntryEditor
        value={resume.teachingExperience}
        onChange={(teachingExperience) => onUpdate({ teachingExperience })}
        fields={teachingFields}
        createEmpty={() => ({
          id: crypto.randomUUID(),
          institution: '',
          subject: '',
          date: '',
        })}
        label="Teaching Experience"
        description="Courses taught, guest lectures, or academic instruction"
      />

      {/* Teaching Philosophy */}
      <div className="space-y-2">
        <Label>Teaching Philosophy</Label>
        <Textarea
          value={resume.teachingPhilosophy}
          onChange={(e) => onUpdate({ teachingPhilosophy: e.target.value })}
          placeholder="Describe your approach to teaching and education..."
          className="min-h-[80px]"
        />
      </div>

      {/* Classroom Experience */}
      <div className="space-y-2">
        <Label>Classroom Experience</Label>
        <Textarea
          value={resume.classroomExperience}
          onChange={(e) => onUpdate({ classroomExperience: e.target.value })}
          placeholder="Describe your classroom management and teaching experience..."
          className="min-h-[80px]"
        />
      </div>
    </div>
  );
}
