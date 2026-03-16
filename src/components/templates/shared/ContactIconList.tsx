import { getContactIcon, ContactType } from '@/lib/iconRegistry';

export interface ContactItem {
  id: string;
  type: ContactType;
  label: string;
  value: string;
  customIconUrl?: string;
}

interface ContactIconListProps {
  items: ContactItem[];
  accentColor?: string;
}

export function ContactIconList({ items, accentColor = '#F97316' }: ContactIconListProps) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-3 text-sm text-white/80">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10"
            style={{ borderColor: accentColor, borderWidth: 1, borderStyle: 'solid' }}
          >
            {item.customIconUrl ? (
              <img src={item.customIconUrl} alt={item.label} className="h-5 w-5 object-contain" />
            ) : (
              getContactIcon(item.type)
            )}
          </span>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-white">{item.label}</span>
            <span className="text-xs text-white/60">{item.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
