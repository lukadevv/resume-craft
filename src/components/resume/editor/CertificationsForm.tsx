'use client';

import { useTranslations } from 'next-intl';
import { Certification } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { AutocompleteInput } from '@/components/ui/AutocompleteInput';
import { Plus, Trash2, Calendar } from 'lucide-react';

interface CertificationsFormProps {
  data: Certification[];
  onUpdate: (data: Certification[]) => void;
}

export function CertificationsForm({ data, onUpdate }: CertificationsFormProps) {
  const t = useTranslations('resume-form');

  const addCertification = () => {
    const newCert: Certification = {
      id: crypto.randomUUID(),
      name: '',
      issuer: '',
      date: '',
      expiryDate: '',
      credentialId: '',
      url: '',
    };
    onUpdate([...data, newCert]);
  };

  const updateCertification = (id: string, field: keyof Certification, value: string) => {
    onUpdate(data.map((cert) => (cert.id === id ? { ...cert, [field]: value } : cert)));
  };

  const removeCertification = (id: string) => {
    onUpdate(data.filter((cert) => cert.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{t('steps.certifications')}</h2>
          <p className="text-foreground-secondary">{t('stepDescriptions.certifications')}</p>
        </div>
        <Button onClick={addCertification} className="gap-2">
          <Plus className="h-4 w-4" /> {t('labels.add')}
        </Button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-border rounded-lg">
          <p className="text-foreground-secondary mb-4">{t('emptyStates.certifications')}</p>
          <Button onClick={addCertification} variant="outline">
            {t('labels.addCertification')}
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {data.map((cert) => (
            <div key={cert.id} className="relative rounded-lg border border-border p-4">
              <button
                onClick={() => removeCertification(cert.id)}
                className="absolute right-4 top-4 text-foreground-secondary hover:text-destructive cursor-pointer"
              >
                <Trash2 className="h-4 w-4" />
              </button>

              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>{t('fields.certificationName')}</Label>
                    <AutocompleteInput
                      value={cert.name}
                      onChange={(value) => updateCertification(cert.id, 'name', value)}
                      fieldType="certification"
                      placeholder={t('placeholders.certificationName')}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('fields.issuingOrganization')}</Label>
                    <AutocompleteInput
                      value={cert.issuer}
                      onChange={(value) => updateCertification(cert.id, 'issuer', value)}
                      fieldType="certificationIssuer"
                      placeholder={t('placeholders.issuingOrganization')}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Date Obtained</Label>
                    <div className="relative">
                      <Input
                        type="month"
                        value={cert.date}
                        onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                        className="pr-9 [&::-webkit-calendar-picker-indicator]:opacity-0"
                      />
                      <Calendar className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-secondary" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Expiry Date</Label>
                    <div className="relative">
                      <Input
                        type="month"
                        value={cert.expiryDate}
                        onChange={(e) => updateCertification(cert.id, 'expiryDate', e.target.value)}
                        className="pr-9 [&::-webkit-calendar-picker-indicator]:opacity-0"
                      />
                      <Calendar className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-secondary" />
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>{t('fields.credentialId')}</Label>
                    <Input
                      value={cert.credentialId}
                      onChange={(e) => updateCertification(cert.id, 'credentialId', e.target.value)}
                      placeholder={t('placeholders.credentialId')}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('fields.credentialUrl')}</Label>
                    <Input
                      value={cert.url}
                      onChange={(e) => updateCertification(cert.id, 'url', e.target.value)}
                      placeholder={t('placeholders.credentialUrl')}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
