import { Resume } from '@/types/resume';

/**
 * Formats a date range string
 */
function formatDateRange(start: string, end: string, current: boolean): string {
  if (!start) return '';
  const startStr = formatDate(start);
  if (current) return `${startStr} - Present`;
  if (!end) return startStr;
  return `${startStr} - ${formatDate(end)}`;
}

/**
 * Formats YYYY-MM to readable format
 */
function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const [year, month] = dateStr.split('-');
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return `${monthNames[parseInt(month, 10) - 1]} ${year}`;
}

/**
 * Converts resume to plain text format
 */
export function exportToText(resume: Resume): string {
  const {
    personalInfo,
    summary,
    workExperience,
    education,
    skills,
    projects,
    certifications,
    languages,
  } = resume;

  const lines: string[] = [];

  // Header
  lines.push(`${personalInfo.firstName} ${personalInfo.lastName}`.toUpperCase());
  lines.push('');

  // Contact
  const contact: string[] = [];
  if (personalInfo.email) contact.push(`Email: ${personalInfo.email}`);
  if (personalInfo.phone) contact.push(`Phone: ${personalInfo.phone}`);
  if (personalInfo.location) contact.push(`Location: ${personalInfo.location}`);
  if (personalInfo.website) contact.push(`Website: ${personalInfo.website}`);
  if (personalInfo.linkedin) contact.push(`LinkedIn: ${personalInfo.linkedin}`);
  lines.push(contact.join(' | '));
  lines.push('');

  // Summary
  if (summary) {
    lines.push('PROFESSIONAL SUMMARY');
    lines.push(summary);
    lines.push('');
  }

  // Experience
  if (workExperience.length > 0) {
    lines.push('WORK EXPERIENCE');
    workExperience.forEach((exp) => {
      lines.push(`${exp.position} at ${exp.company}`);
      lines.push(formatDateRange(exp.startDate, exp.endDate, exp.current));
      if (exp.location) lines.push(exp.location);
      if (exp.description) lines.push(exp.description);
      lines.push('');
    });
  }

  // Education
  if (education.length > 0) {
    lines.push('EDUCATION');
    education.forEach((edu) => {
      lines.push(`${edu.degree}${edu.field ? ` in ${edu.field}` : ''}`);
      lines.push(edu.institution);
      if (edu.location) lines.push(edu.location);
      lines.push(formatDateRange(edu.startDate, edu.endDate, edu.current));
      if (edu.gpa) lines.push(`GPA: ${edu.gpa}`);
      if (edu.achievements) lines.push(edu.achievements);
      lines.push('');
    });
  }

  // Skills
  if (skills.length > 0) {
    lines.push('SKILLS');
    const skillGroups = skills.reduce(
      (acc, skill) => {
        const cat = skill.category || 'Other';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(skill.name);
        return acc;
      },
      {} as Record<string, string[]>
    );

    Object.entries(skillGroups).forEach(([category, names]) => {
      lines.push(`${category}: ${names.join(', ')}`);
    });
    lines.push('');
  }

  // Projects
  if (projects.length > 0) {
    lines.push('PROJECTS');
    projects.forEach((proj) => {
      lines.push(proj.name);
      if (proj.description) lines.push(proj.description);
      if (proj.technologies.length > 0) lines.push(`Technologies: ${proj.technologies.join(', ')}`);
      if (proj.url) lines.push(proj.url);
      lines.push('');
    });
  }

  // Certifications
  if (certifications.length > 0) {
    lines.push('CERTIFICATIONS');
    certifications.forEach((cert) => {
      lines.push(`${cert.name} - ${cert.issuer}`);
      if (cert.date) lines.push(`Issued: ${formatDate(cert.date)}`);
      lines.push('');
    });
  }

  // Languages
  if (languages.length > 0) {
    lines.push('LANGUAGES');
    lines.push(languages.map((l) => `${l.name} (${l.proficiency})`).join(', '));
    lines.push('');
  }

  return lines.join('\n');
}

/**
 * Converts resume to HTML format
 */
export function exportToHTML(resume: Resume): string {
  const {
    personalInfo,
    summary,
    workExperience,
    education,
    skills,
    projects,
    certifications,
    languages,
  } = resume;
  const themeColor = resume.themeColor || '#3ECF8E';

  const hasContent = (arr: unknown[]) => arr && arr.length > 0;
  const hasString = (str: string) => str && str.trim().length > 0;

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${personalInfo.firstName} ${personalInfo.lastName} - Resume</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 800px; margin: 0 auto; padding: 40px; }
    header { text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 3px solid ${themeColor}; }
    h1 { font-size: 2.5em; color: ${themeColor}; }
    .contact { display: flex; flex-wrap: wrap; gap: 15px; justify-content: center; margin-top: 10px; font-size: 0.9em; }
    section { margin-bottom: 25px; }
    h2 { font-size: 1.2em; color: ${themeColor}; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 15px; padding-bottom: 5px; border-bottom: 1px solid #ddd; }
    .item { margin-bottom: 15px; }
    .item-header { display: flex; justify-content: space-between; align-items: baseline; }
    .item-title { font-weight: bold; font-size: 1.1em; }
    .item-subtitle { color: #666; }
    .item-date { font-size: 0.9em; color: #888; }
    .skills { display: flex; flex-wrap: wrap; gap: 8px; }
    .skill { background: #f0f0f0; padding: 4px 12px; border-radius: 15px; font-size: 0.9em; }
    @media print { body { -webkit-print-color-adjust: exact; } }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>${personalInfo.firstName} ${personalInfo.lastName}</h1>
      <div class="contact">
        ${hasString(personalInfo.email) ? `<span>${personalInfo.email}</span>` : ''}
        ${hasString(personalInfo.phone) ? `<span>${personalInfo.phone}</span>` : ''}
        ${hasString(personalInfo.location) ? `<span>${personalInfo.location}</span>` : ''}
        ${hasString(personalInfo.website) ? `<span>${personalInfo.website}</span>` : ''}
        ${hasString(personalInfo.linkedin) ? `<span>${personalInfo.linkedin}</span>` : ''}
      </div>
    </header>
`;

  if (hasString(summary)) {
    html += `
    <section>
      <h2>Professional Summary</h2>
      <p>${summary}</p>
    </section>
`;
  }

  if (hasContent(workExperience)) {
    html += `
    <section>
      <h2>Work Experience</h2>
      ${workExperience
        .map(
          (exp) => `
        <div class="item">
          <div class="item-header">
            <div>
              <div class="item-title">${exp.position}</div>
              <div class="item-subtitle">${exp.company}${exp.location ? `, ${exp.location}` : ''}</div>
            </div>
            <div class="item-date">${formatDateRange(exp.startDate, exp.endDate, exp.current)}</div>
          </div>
          ${hasString(exp.description) ? `<p>${exp.description}</p>` : ''}
        </div>
      `
        )
        .join('')}
    </section>
`;
  }

  if (hasContent(education)) {
    html += `
    <section>
      <h2>Education</h2>
      ${education
        .map(
          (edu) => `
        <div class="item">
          <div class="item-header">
            <div>
              <div class="item-title">${edu.degree}${edu.field ? ` in ${edu.field}` : ''}</div>
              <div class="item-subtitle">${edu.institution}${edu.location ? `, ${edu.location}` : ''}</div>
            </div>
            <div class="item-date">${formatDateRange(edu.startDate, edu.endDate, edu.current)}</div>
          </div>
          ${edu.gpa ? `<p>GPA: ${edu.gpa}</p>` : ''}
        </div>
      `
        )
        .join('')}
    </section>
`;
  }

  if (hasContent(skills)) {
    html += `
    <section>
      <h2>Skills</h2>
      <div class="skills">
        ${skills.map((s) => `<span class="skill">${s.name}</span>`).join('')}
      </div>
    </section>
`;
  }

  if (hasContent(projects)) {
    html += `
    <section>
      <h2>Projects</h2>
      ${projects
        .map(
          (proj) => `
        <div class="item">
          <div class="item-title">${proj.name}</div>
          ${hasString(proj.description) ? `<p>${proj.description}</p>` : ''}
          ${hasContent(proj.technologies) ? `<p><em>${proj.technologies.join(', ')}</em></p>` : ''}
        </div>
      `
        )
        .join('')}
    </section>
`;
  }

  if (hasContent(certifications)) {
    html += `
    <section>
      <h2>Certifications</h2>
      ${certifications
        .map(
          (cert) => `
        <div class="item">
          <div class="item-title">${cert.name}</div>
          <div class="item-subtitle">${cert.issuer}${cert.date ? ` - ${formatDate(cert.date)}` : ''}</div>
        </div>
      `
        )
        .join('')}
    </section>
`;
  }

  if (hasContent(languages)) {
    html += `
    <section>
      <h2>Languages</h2>
      <p>${languages.map((l) => `${l.name} (${l.proficiency})`).join(', ')}</p>
    </section>
`;
  }

  html += `
  </div>
</body>
</html>`;

  return html;
}

/**
 * Exports resume to JSON format
 */
export function exportToJSON(resume: Resume): string {
  return JSON.stringify(resume, null, 2);
}

/**
 * Downloads a file
 */
export function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Exports resume to PDF using html2pdf
 */
export async function exportToPDF(element: HTMLElement, filename: string): Promise<void> {
  const html2pdf = (await import('html2pdf.js')).default;

  const opt = {
    margin: 0,
    filename: `${filename}.pdf`,
    image: { type: 'jpeg' as const, quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const },
  };

  await html2pdf().set(opt).from(element).save();
}

/**
 * Exports to DOCX (basic HTML to Word)
 */
export function exportToDOCX(resume: Resume): void {
  const html = exportToHTML(resume);
  const doc = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head><meta charset="utf-8"><title>${resume.personalInfo.firstName} ${resume.personalInfo.lastName} - Resume</title></head><body>${html}</body></html>`;

  const blob = new Blob([doc], { type: 'application/msword' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${resume.personalInfo.firstName}_${resume.personalInfo.lastName}_resume.doc`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
