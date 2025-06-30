import React from 'react';
import { Plus, X } from 'lucide-react';
import { FormField } from './FormField';

interface SocialMedia {
  nom: string;
  url: string;
}

interface SocialMediaSectionProps {
  socials: SocialMedia[];
  onChange: (socials: SocialMedia[]) => void;
}

export function SocialMediaSection({ socials, onChange }: SocialMediaSectionProps) {
  const addSocial = () => {
    onChange([...socials, { nom: '', url: '' }]);
  };

  const updateSocial = (index: number, field: keyof SocialMedia, value: string) => {
    const newSocials = [...socials];
    newSocials[index][field] = value;
    onChange(newSocials);
  };

  const removeSocial = (index: number) => {
    const newSocials = socials.filter((_, i) => i !== index);
    onChange(newSocials);
  };

  return (
    <FormField label="Réseaux sociaux">
      <div className="space-y-3">
        {socials.map((social, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={social.nom}
              onChange={(e) => updateSocial(index, 'nom', e.target.value)}
              placeholder="Facebook, Instagram..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <input
              type="url"
              value={social.url}
              onChange={(e) => updateSocial(index, 'url', e.target.value)}
              placeholder="https://facebook.com/..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <button
              type="button"
              onClick={() => removeSocial(index)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        ))}
        
        <button
          type="button"
          onClick={addSocial}
          className="flex items-center gap-2 px-4 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
        >
          <Plus size={16} />
          Ajouter un réseau social
        </button>
      </div>
    </FormField>
  );
}