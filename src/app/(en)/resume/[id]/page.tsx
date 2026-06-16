import { ResumeEditorClient } from './ResumeEditorClient';

/**
 * Generate static params for SSG
 * Returns placeholder IDs - actual resumes are created client-side
 */
export function generateStaticParams() {
  return [{ id: 'new' }, { id: 'preview' }];
}

export default function ResumeEditorPage() {
  return <ResumeEditorClient />;
}
