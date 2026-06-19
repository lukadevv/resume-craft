import { Resume } from '@/types/resume';
import { templateDefinitionMap } from '@/lib/templates';
import { capitalize } from '@/utils/strings';

// Locale-aware labels for export
const localeLabels: Record<string, {
  present: string;
  monthNames: string[];
  section: {
    professionalSummary: string;
    workExperience: string;
    education: string;
    skills: string;
    projects: string;
    certifications: string;
    languages: string;
  };
  contact: { email: string; phone: string; location: string; website: string; linkedin: string };
  degreeField: string;
  at: string;
  gpa: string;
  technologies: string;
  issued: string;
  other: string;
  general: string;
}> = {
  en: {
    present: 'Present',
    monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    section: {
      professionalSummary: 'PROFESSIONAL SUMMARY',
      workExperience: 'WORK EXPERIENCE',
      education: 'EDUCATION',
      skills: 'SKILLS',
      projects: 'PROJECTS',
      certifications: 'CERTIFICATIONS',
      languages: 'LANGUAGES',
    },
    contact: { email: 'Email', phone: 'Phone', location: 'Location', website: 'Website', linkedin: 'LinkedIn' },
    degreeField: ' in ',
    at: ' at ',
    gpa: 'GPA: ',
    technologies: 'Technologies',
    issued: 'Issued',
    other: 'Other',
    general: 'General',
  },
  es: {
    present: 'Presente',
    monthNames: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    section: {
      professionalSummary: 'RESUMEN PROFESIONAL',
      workExperience: 'EXPERIENCIA LABORAL',
      education: 'EDUCACIÓN',
      skills: 'HABILIDADES',
      projects: 'PROYECTOS',
      certifications: 'CERTIFICACIONES',
      languages: 'IDIOMAS',
    },
    contact: { email: 'Email', phone: 'Teléfono', location: 'Ubicación', website: 'Sitio web', linkedin: 'LinkedIn' },
    degreeField: ' en ',
    at: ' en ',
    gpa: 'Promedio: ',
    technologies: 'Tecnologías',
    issued: 'Emitido',
    other: 'Otras',
    general: 'General',
  },
  fr: {
    present: 'Présent',
    monthNames: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
    section: {
      professionalSummary: 'RÉSUMÉ PROFESSIONNEL',
      workExperience: 'EXPÉRIENCE PROFESSIONNELLE',
      education: 'FORMATION',
      skills: 'COMPÉTENCES',
      projects: 'PROJETS',
      certifications: 'CERTIFICATIONS',
      languages: 'LANGUES',
    },
    contact: { email: 'Email', phone: 'Téléphone', location: 'Lieu', website: 'Site web', linkedin: 'LinkedIn' },
    degreeField: ' en ',
    at: ' chez ',
    gpa: 'Moyenne: ',
    technologies: 'Technologies',
    issued: 'Issued',
    other: 'Autres',
    general: 'Général',
  },
  de: {
    present: 'Heute',
    monthNames: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
    section: {
      professionalSummary: 'BERUFLICHER WERDEGANG',
      workExperience: 'BERUFSERFAHRUNG',
      education: 'BILDUNG',
      skills: 'FÄHIGKEITEN',
      projects: 'PROJEKTE',
      certifications: 'ZERTIFIZIERUNGEN',
      languages: 'SPRACHEN',
    },
    contact: { email: 'E-Mail', phone: 'Telefon', location: 'Standort', website: 'Webseite', linkedin: 'LinkedIn' },
    degreeField: ' – ',
    at: ' bei ',
    gpa: 'Notendurchschnitt: ',
    technologies: 'Technologien',
    issued: 'Ausgestellt',
    other: 'Sonstiges',
    general: 'Allgemein',
  },
  pt: {
    present: 'Presente',
    monthNames: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    section: {
      professionalSummary: 'RESUMO PROFISSIONAL',
      workExperience: 'EXPERIÊNCIA PROFISSIONAL',
      education: 'FORMAÇÃO ACADÊMICA',
      skills: 'HABILIDADES',
      projects: 'PROJETOS',
      certifications: 'CERTIFICAÇÕES',
      languages: 'IDIOMAS',
    },
    contact: { email: 'Email', phone: 'Telefone', location: 'Localização', website: 'Site', linkedin: 'LinkedIn' },
    degreeField: ' em ',
    at: ' na ',
    gpa: 'Média: ',
    technologies: 'Tecnologias',
    issued: 'Emitido',
    other: 'Outras',
    general: 'Geral',
  },
};

function getLabels(locale?: string) {
  return localeLabels[locale ?? 'en'] ?? localeLabels.en;
}

/**
 * Formats a date range string
 */
function formatDateRange(start: string, end: string, current: boolean, labels: ReturnType<typeof getLabels>): string {
  if (!start) return '';
  const startStr = formatDate(start, labels.monthNames);
  if (current) return `${startStr} - ${labels.present}`;
  if (!end) return startStr;
  return `${startStr} - ${formatDate(end, labels.monthNames)}`;
}

/**
 * Formats YYYY-MM to readable format
 */
function formatDate(dateStr: string, monthNames: string[]): string {
  if (!dateStr) return '';
  const [year, month] = dateStr.split('-');
  return `${monthNames[parseInt(month, 10) - 1]} ${year}`;
}

/**
 * Converts resume to plain text format
 * @param resume - Resume data
 * @param locale - Optional locale for localized output (defaults to 'en')
 */
export function exportToText(resume: Resume, locale?: string): string {
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

  const labels = getLabels(locale);
  const lines: string[] = [];

  // Header
  lines.push(`${personalInfo.firstName} ${personalInfo.lastName}`.toUpperCase());
  lines.push('');

  // Contact
  const contact: string[] = [];
  if (personalInfo.email) contact.push(`${labels.contact.email}: ${personalInfo.email}`);
  if (personalInfo.phone) contact.push(`${labels.contact.phone}: ${personalInfo.phone}`);
  if (personalInfo.location) contact.push(`${labels.contact.location}: ${personalInfo.location}`);
  if (personalInfo.website) contact.push(`${labels.contact.website}: ${personalInfo.website}`);
  if (personalInfo.linkedin) contact.push(`${labels.contact.linkedin}: ${personalInfo.linkedin}`);
  lines.push(contact.join(' | '));
  lines.push('');

  // Summary
  if (summary) {
    lines.push(labels.section.professionalSummary);
    lines.push(summary);
    lines.push('');
  }

  // Experience
  if (workExperience.length > 0) {
    lines.push(labels.section.workExperience);
    workExperience.forEach((exp) => {
      lines.push(`${exp.position}${labels.at}${exp.company}`);
      lines.push(formatDateRange(exp.startDate, exp.endDate, exp.current, labels));
      if (exp.location) lines.push(exp.location);
      if (exp.description) lines.push(exp.description);
      lines.push('');
    });
  }

  // Education
  if (education.length > 0) {
    lines.push(labels.section.education);
    education.forEach((edu) => {
      lines.push(`${edu.degree}${edu.field ? `${labels.degreeField}${edu.field}` : ''}`);
      lines.push(edu.institution);
      if (edu.location) lines.push(edu.location);
      lines.push(formatDateRange(edu.startDate, edu.endDate, edu.current, labels));
      if (edu.gpa) lines.push(`${labels.gpa}${edu.gpa}`);
      if (edu.achievements) lines.push(edu.achievements);
      lines.push('');
    });
  }

  // Skills
  if (skills.length > 0) {
    lines.push(labels.section.skills);
    const skillGroups = skills.reduce(
      (acc, skill) => {
        const cat = skill.category || labels.other;
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
    lines.push(labels.section.projects);
    projects.forEach((proj) => {
      lines.push(proj.name);
      if (proj.description) lines.push(proj.description);
      if (proj.technologies.length > 0) lines.push(`${labels.technologies}: ${proj.technologies.join(', ')}`);
      if (proj.url) lines.push(proj.url);
      lines.push('');
    });
  }

  // Certifications
  if (certifications.length > 0) {
    lines.push(labels.section.certifications);
    certifications.forEach((cert) => {
      lines.push(`${cert.name} - ${cert.issuer}`);
      if (cert.date) lines.push(`${labels.issued}: ${formatDate(cert.date, labels.monthNames)}`);
      lines.push('');
    });
  }

  // Languages
  if (languages.length > 0) {
    lines.push(labels.section.languages);
    lines.push(languages.map((l) => `${l.name} (${capitalize(l.proficiency)})`).join(', '));
    lines.push('');
  }

  return lines.join('\n');
}

/**
 * Converts resume to HTML format
 */
export function exportToHTML(resume: Resume, locale?: string): string {
  const labels = getLabels(locale);
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
<html lang="${locale || 'en'}">
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
      <h2>${labels.section.professionalSummary}</h2>
      <p>${summary}</p>
    </section>
`;
  }

  if (hasContent(workExperience)) {
    html += `
    <section>
      <h2>${labels.section.workExperience}</h2>
      ${workExperience
        .map(
          (exp) => `
        <div class="item">
          <div class="item-header">
            <div>
              <div class="item-title">${exp.position}</div>
              <div class="item-subtitle">${exp.company}${exp.location ? `, ${exp.location}` : ''}</div>
            </div>
            <div class="item-date">${formatDateRange(exp.startDate, exp.endDate, exp.current, labels)}</div>
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
      <h2>${labels.section.education}</h2>
      ${education
        .map(
          (edu) => `
        <div class="item">
          <div class="item-header">
            <div>
              <div class="item-title">${edu.degree}${edu.field ? `${labels.degreeField}${edu.field}` : ''}</div>
              <div class="item-subtitle">${edu.institution}${edu.location ? `, ${edu.location}` : ''}</div>
            </div>
            <div class="item-date">${formatDateRange(edu.startDate, edu.endDate, edu.current, labels)}</div>
          </div>
          ${edu.gpa ? `<p>${labels.gpa}${edu.gpa}</p>` : ''}
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
      <h2>${labels.section.skills}</h2>
      <div class="skills">
        ${skills.map((s) => `<span class="skill">${s.name}</span>`).join('')}
      </div>
    </section>
`;
  }

  if (hasContent(projects)) {
    html += `
    <section>
      <h2>${labels.section.projects}</h2>
      ${projects
        .map(
          (proj) => `
        <div class="item">
          <div class="item-title">${proj.name}</div>
          ${hasString(proj.description) ? `<p>${proj.description}</p>` : ''}
          ${hasContent(proj.technologies) ? `<p><em>${labels.technologies}: ${proj.technologies.join(', ')}</em></p>` : ''}
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
      <h2>${labels.section.certifications}</h2>
      ${certifications
        .map(
          (cert) => `
        <div class="item">
          <div class="item-title">${cert.name}</div>
          <div class="item-subtitle">${cert.issuer}${cert.date ? ` - ${formatDate(cert.date, labels.monthNames)}` : ''}</div>
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
      <h2>${labels.section.languages}</h2>
      <p>${languages.map((l) => `${l.name} (${capitalize(l.proficiency)})`).join(', ')}</p>
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

// ── Print-friendly DOM transform ──────────────────────────────────────

/**
 * Parses rgba/rgb string into components.
 */
function parseRGBA(color: string): { r: number; g: number; b: number; a: number } | null {
  const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*([0-9.]+)?\)/);
  if (!match) return null;
  return {
    r: parseInt(match[1], 10),
    g: parseInt(match[2], 10),
    b: parseInt(match[3], 10),
    a: match[4] !== undefined ? parseFloat(match[4]) : 1,
  };
}

/**
 * Relative luminance 0–255 from an rgb(a) string.
 */
function luminance(color: string): number {
  const rgba = parseRGBA(color);
  if (!rgba) return 255;
  return 0.299 * rgba.r + 0.587 * rgba.g + 0.114 * rgba.b;
}

/**
 * Returns true when an element's background should be stripped to white
 * for print-friendly export.
 *
 * Strips if any of these are true:
 *  - Has background-image (gradient or image) — decorative
 *  - Background-color is semi-transparent (opacity < 0.3) — decorative tint
 *  - Background-color is dark (luminance < 128) — would waste ink
 */
function isBackgroundToStrip(style: CSSStyleDeclaration): boolean {
  // Background-image (gradient or image) — always decorative, strip
  const bgImage = style.backgroundImage;
  if (bgImage && bgImage !== 'none') return true;

  // Background-color
  const bgColor = style.backgroundColor;
  if (!bgColor || bgColor === 'transparent' || bgColor === 'rgba(0, 0, 0, 0)') return false;

  const rgba = parseRGBA(bgColor);
  if (!rgba) return false;

  // Semi-transparent / low opacity — decorative tint, strip
  if (rgba.a < 0.3) return true;

  // Dark background — would waste ink on print, strip
  if (luminance(bgColor) < 128) return true;

  return false;
}

/**
 * True when text color is too light to read on white (luminance > 150).
 * Catches text-white, text-gray-300 (212), and text-gray-400 (163).
 * Preserves text-gray-500 (114) and darker.
 */
function isLightColor(color: string): boolean {
  return luminance(color) > 150;
}

/**
 * True when border color is too pale to show on white (luminance > 150).
 */
function isLightBorderColor(color: string): boolean {
  return luminance(color) > 150;
}

const borderSides = [
  { cssName: 'top', styleKey: 'borderTopColor' as keyof CSSStyleDeclaration & string },
  { cssName: 'right', styleKey: 'borderRightColor' as keyof CSSStyleDeclaration & string },
  { cssName: 'bottom', styleKey: 'borderBottomColor' as keyof CSSStyleDeclaration & string },
  { cssName: 'left', styleKey: 'borderLeftColor' as keyof CSSStyleDeclaration & string },
];

/**
 * Deep-clones the export element and applies print-friendly style overrides
 * to every node. Reads computed styles from the ORIGINAL (in-DOM) element
 * so class-based styles resolve correctly, then writes overrides as inline
 * styles on the clone.
 */
function makePrintFriendly(element: HTMLElement): HTMLElement {
  const clone = element.cloneNode(true) as HTMLElement;

  // Transform the root element
  applyPrintStyles(element, clone);

  // Transform every descendant — querySelectorAll returns in document order,
  // so indices match between original and clone.
  const originals = element.querySelectorAll('*');
  const clones = clone.querySelectorAll('*');
  originals.forEach((orig, i) => {
    applyPrintStyles(orig as HTMLElement, clones[i] as HTMLElement);
  });

  return clone;
}

/**
 * Reads computed style from `original` and writes print-friendly inline
 * overrides onto `target`.
 */
function applyPrintStyles(original: HTMLElement, target: HTMLElement): void {
  const style = window.getComputedStyle(original);

  // ── Decorative/dark/colored backgrounds → white ──
  if (isBackgroundToStrip(style)) {
    target.style.backgroundColor = '#ffffff';
    target.style.backgroundImage = 'none';
  }

  // ── Backdrop filter → remove (wastes ink, glitchy on print) ──
  if (style.backdropFilter && style.backdropFilter !== 'none') {
    target.style.backdropFilter = 'none';
  }

  // ── Light text → dark (preserve opacity) ──
  const color = style.color;
  if (color && isLightColor(color)) {
    const rgba = parseRGBA(color);
    if (rgba && rgba.a < 1) {
      target.style.color = `rgba(17, 24, 39, ${rgba.a})`;
    } else {
      target.style.color = '#111827';
    }
  }

  // ── White/pale borders → subtle gray ──
  for (const side of borderSides) {
    const borderColor = style[side.styleKey] as string;
    if (borderColor && isLightBorderColor(borderColor)) {
      const rgba = parseRGBA(borderColor);
      const value = rgba && rgba.a < 1 ? `rgba(209, 213, 219, ${rgba.a})` : '#d1d5db';
      target.style.setProperty(`border-${side.cssName}-color`, value);
    }
  }

  // ── Box-shadow → remove ──
  if (style.boxShadow && style.boxShadow !== 'none') {
    target.style.boxShadow = 'none';
  }
}

/**
 * Exports resume to PDF using html2canvas-pro (supports modern CSS color
 * functions like lab/oklch natively) + jsPDF.
 *
 * Fills the A4 page with the captured image while maintaining aspect ratio.
 * Applies a white page background so any non-filled areas render cleanly,
 * and centers the image when the canvas aspect ratio differs from A4.
 *
 * When `options.whiteBackground` is true, the element is deep-cloned and
 * every node is transformed into a white-background / dark-text equivalent
 * before capture. This produces a print-friendly PDF suitable for physical
 * printing without wasting ink on dark gradients or coloured backgrounds.
 */
export async function exportToPDF(
  element: HTMLElement,
  filename: string,
  options?: { whiteBackground?: boolean }
): Promise<void> {
  const [html2canvasModule, { jsPDF }] = await Promise.all([
    import('html2canvas-pro'),
    import('jspdf'),
  ]);
  const html2canvas = html2canvasModule.default;

  // For the print-friendly variant, clone the element tree and transform it
  // into a white-background / dark-text equivalent before capture.
  let captureElement = element;
  let tempContainer: HTMLDivElement | null = null;

  if (options?.whiteBackground) {
    tempContainer = document.createElement('div');
    tempContainer.style.position = 'fixed';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '0';
    tempContainer.style.width = '210mm';
    tempContainer.style.backgroundColor = '#ffffff';

    const printFriendly = makePrintFriendly(element);
    tempContainer.appendChild(printFriendly);
    document.body.appendChild(tempContainer);
    captureElement = printFriendly;
  }

  let canvas: HTMLCanvasElement;
  try {
    canvas = await html2canvas(captureElement, {
      scale: 2,
      useCORS: true,
    });
  } finally {
    if (tempContainer) {
      tempContainer.remove();
    }
  }

  const imgData = canvas.toDataURL('image/jpeg', 0.95);
  const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });

  const A4_WIDTH = 210;
  const A4_HEIGHT = 297;

  const canvasAspect = canvas.width / canvas.height;
  const pageAspect = A4_WIDTH / A4_HEIGHT;

  let imgWidth: number;
  let imgHeight: number;
  let x: number;
  let y: number;

  if (canvasAspect > pageAspect) {
    imgHeight = A4_HEIGHT;
    imgWidth = A4_HEIGHT * canvasAspect;
    x = (A4_WIDTH - imgWidth) / 2;
    y = 0;
  } else {
    imgWidth = A4_WIDTH;
    imgHeight = A4_WIDTH / canvasAspect;
    x = 0;
    y = (A4_HEIGHT - imgHeight) / 2;
  }

  pdf.setFillColor(255, 255, 255);
  pdf.rect(0, 0, A4_WIDTH, A4_HEIGHT, 'F');

  pdf.addImage(imgData, 'JPEG', x, y, imgWidth, imgHeight);
  pdf.save(`${filename}.pdf`);
}

/**
 * Exports to DOCX (basic HTML to Word)
 */
export function exportToDOCX(resume: Resume, locale?: string): void {
  const html = exportToHTML(resume, locale);
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

/**
 * Exports to HTML rendered as an image of the template component.
 * Uses html2canvas to capture the rendered template (same as PDF)
 * so the HTML output looks identical to the Live Preview.
 */
export async function exportToHTMLWithImage(
  element: HTMLElement,
  resume: Resume,
  filename: string
): Promise<void> {
  const html2canvasModule = await import('html2canvas-pro');
  const html2canvas = html2canvasModule.default;

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
  });

  const imgData = canvas.toDataURL('image/jpeg', 0.95);

  // Determine if template is dark or light for the page background
  const definition = templateDefinitionMap[resume.template];
  const gradient = definition?.background?.gradient || '';
  const hexMatch = gradient.match(/#([0-9a-fA-F]{6})/);
  let isDark = false;
  if (hexMatch) {
    const hex = hexMatch[1];
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    isDark = 0.299 * r + 0.587 * g + 0.114 * b < 128;
  }

  const pageBg = isDark ? '#1a1a1a' : '#f0f0f0';
  const footerColor = isDark ? '#999' : '#888';

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${resume.personalInfo.firstName} ${resume.personalInfo.lastName} - Resume</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px 20px;
      background: ${pageBg};
      font-family: system-ui, -apple-system, sans-serif;
    }
    .resume-page {
      max-width: 210mm;
      width: 100%;
      box-shadow: 0 4px 24px rgba(0,0,0,0.12);
      border-radius: 4px;
      overflow: hidden;
    }
    .resume-page img {
      display: block;
      width: 100%;
      height: auto;
    }
    .footer {
      margin-top: 24px;
      font-size: 13px;
      color: ${footerColor};
      text-align: center;
    }
    @media print {
      body { padding: 0; background: white; }
      .resume-page { box-shadow: none; border-radius: 0; }
      .footer { display: none; }
    }
  </style>
</head>
<body>
  <div class="resume-page">
    <img src="${imgData}" alt="Resume" />
  </div>
  <div class="footer">
    Generated by Resume Craft
  </div>
</body>
</html>`;

  downloadFile(html, `${filename}.html`, 'text/html');
}
