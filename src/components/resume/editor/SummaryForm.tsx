'use client';

import { Textarea } from '@/components/ui/textarea';

interface SummaryFormProps {
  data: string;
  onUpdate: (data: string) => void;
}

export function SummaryForm({ data, onUpdate }: SummaryFormProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Professional Summary</h2>
        <p className="text-foreground-secondary">
          Write a compelling summary that highlights your achievements
        </p>
      </div>

      <Textarea
        value={data}
        onChange={(e) => onUpdate(e.target.value)}
        placeholder="Results-driven software engineer with 5+ years of experience in building scalable web applications..."
        className="min-h-[200px]"
      />

      <div className="rounded-lg bg-surface p-4">
        <h3 className="font-medium mb-2">Tips for a great summary:</h3>
        <ul className="text-sm text-foreground-secondary space-y-1">
          <li>• Keep it concise (3-5 sentences)</li>
          <li>• Highlight your key strengths and achievements</li>
          <li>• Mention years of experience and key skills</li>
          <li>• Include your career goals</li>
        </ul>
      </div>
    </div>
  );
}
