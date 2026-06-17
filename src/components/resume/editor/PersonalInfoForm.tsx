'use client';

import { useTranslations } from 'next-intl';
import { PersonalInfo } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AutocompleteInput } from '@/components/ui/AutocompleteInput';

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onUpdate: (data: PersonalInfo) => void;
}

export function PersonalInfoForm({ data, onUpdate }: PersonalInfoFormProps) {
  const t = useTranslations('resume-form');

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onUpdate({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{t('sectionHeadings.personalInformation')}</h2>
        <p className="text-foreground-secondary">{t('stepDescriptions.personal')}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">{t('fields.firstName')}</Label>
          <Input
            id="firstName"
            value={data.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            placeholder={t('placeholders.firstName')}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">{t('fields.lastName')}</Label>
          <Input
            id="lastName"
            value={data.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            placeholder={t('placeholders.lastName')}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">{t('fields.email')}</Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder={t('placeholders.email')}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">{t('fields.phone')}</Label>
          <Input
            id="phone"
            type="tel"
            value={data.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder={t('placeholders.phone')}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">{t('fields.location')}</Label>
        <AutocompleteInput
          value={data.location}
          onChange={(value) => handleChange('location', value)}
          fieldType="city"
          placeholder={t('placeholders.location')}
          className="w-full"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="website">{t('fields.website')}</Label>
          <Input
            id="website"
            value={data.website}
            onChange={(e) => handleChange('website', e.target.value)}
            placeholder={t('placeholders.website')}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="linkedin">{t('fields.linkedin')}</Label>
          <Input
            id="linkedin"
            value={data.linkedin}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            placeholder={t('placeholders.linkedin')}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="portfolio">{t('fields.portfolio')}</Label>
        <Input
          id="portfolio"
          value={data.portfolio}
          onChange={(e) => handleChange('portfolio', e.target.value)}
          placeholder={t('placeholders.portfolio')}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary">{t('steps.summary')}</Label>
        <Textarea
          id="summary"
          value={data.summary}
          onChange={(e) => handleChange('summary', e.target.value)}
          placeholder={t('placeholders.summary')}
          className="min-h-[120px]"
        />
      </div>
    </div>
  );
}
