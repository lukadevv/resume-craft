'use client';

import { Certification } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

interface CertificationsFormProps {
  data: Certification[];
  onUpdate: (data: Certification[]) => void;
}

export function CertificationsForm({ data, onUpdate }: CertificationsFormProps) {
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
          <h2 className="text-2xl font-bold">Certifications</h2>
          <p className="text-foreground-secondary">Add your professional certifications</p>
        </div>
        <Button onClick={addCertification} className="gap-2">
          <Plus className="h-4 w-4" /> Add
        </Button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-border rounded-lg">
          <p className="text-foreground-secondary mb-4">No certifications added yet</p>
          <Button onClick={addCertification} variant="outline">
            Add Certification
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
                    <Label>Certification Name</Label>
                    <Input
                      value={cert.name}
                      onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                      placeholder="AWS Solutions Architect"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Issuing Organization</Label>
                    <Input
                      value={cert.issuer}
                      onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                      placeholder="Amazon Web Services"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Date Obtained</Label>
                    <Input
                      type="month"
                      value={cert.date}
                      onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Expiry Date</Label>
                    <Input
                      type="month"
                      value={cert.expiryDate}
                      onChange={(e) => updateCertification(cert.id, 'expiryDate', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Credential ID</Label>
                    <Input
                      value={cert.credentialId}
                      onChange={(e) => updateCertification(cert.id, 'credentialId', e.target.value)}
                      placeholder="ABC123XYZ"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Credential URL</Label>
                    <Input
                      value={cert.url}
                      onChange={(e) => updateCertification(cert.id, 'url', e.target.value)}
                      placeholder="https://..."
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
