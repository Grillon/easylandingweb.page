import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Linkedin, Globe } from 'lucide-react';

interface SocialMedia {
  nom: string;
  url: string;
}

interface SocialMediaBannerProps {
  socials: SocialMedia[];
  onChange: (socials: SocialMedia[]) => void;
}

const socialPlatforms = [
  {
    name: 'Facebook',
    icon: Facebook,
    baseUrl: 'https://facebook.com/',
    placeholder: 'nom-du-restaurant',
    color: 'bg-blue-600 hover:bg-blue-700'
  },
  {
    name: 'Instagram',
    icon: Instagram,
    baseUrl: 'https://instagram.com/',
    placeholder: 'nom_du_restaurant',
    color: 'bg-pink-600 hover:bg-pink-700'
  },
  {
    name: 'X (Twitter)',
    icon: Twitter,
    baseUrl: 'https://x.com/',
    placeholder: 'nom_restaurant',
    color: 'bg-black hover:bg-gray-800'
  },
  {
    name: 'YouTube',
    icon: Youtube,
    baseUrl: 'https://youtube.com/@',
    placeholder: 'nomdurestaurant',
    color: 'bg-red-600 hover:bg-red-700'
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    baseUrl: 'https://linkedin.com/company/',
    placeholder: 'nom-du-restaurant',
    color: 'bg-blue-700 hover:bg-blue-800'
  },
  {
    name: 'Site Web',
    icon: Globe,
    baseUrl: 'https://',
    placeholder: 'www.monrestaurant.com',
    color: 'bg-green-600 hover:bg-green-700'
  }
];

export function SocialMediaBanner({ socials, onChange }: SocialMediaBannerProps) {
  const toggleSocial = (platformName: string) => {
    const existingIndex = socials.findIndex(s => s.nom === platformName);
    
    if (existingIndex >= 0) {
      // Supprimer le réseau social
      const newSocials = socials.filter((_, i) => i !== existingIndex);
      onChange(newSocials);
    } else {
      // Ajouter le réseau social
      const platform = socialPlatforms.find(p => p.name === platformName);
      if (platform) {
        onChange([...socials, { nom: platformName, url: platform.baseUrl }]);
      }
    }
  };

  const updateSocialUrl = (platformName: string, username: string) => {
    const platform = socialPlatforms.find(p => p.name === platformName);
    if (!platform) return;

    const newSocials = socials.map(social => {
      if (social.nom === platformName) {
        return {
          ...social,
          url: platform.baseUrl + username
        };
      }
      return social;
    });
    onChange(newSocials);
  };

  const getSocialUsername = (platformName: string): string => {
    const social = socials.find(s => s.nom === platformName);
    const platform = socialPlatforms.find(p => p.name === platformName);
    
    if (!social || !platform) return '';
    
    return social.url.replace(platform.baseUrl, '');
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-semibold text-gray-700">
        Réseaux sociaux
      </label>
      
      {/* Banderole de sélection */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {socialPlatforms.map((platform) => {
          const Icon = platform.icon;
          const isSelected = socials.some(s => s.nom === platform.name);
          
          return (
            <button
              key={platform.name}
              type="button"
              onClick={() => toggleSocial(platform.name)}
              className={`flex items-center gap-2 p-3 rounded-lg transition-all ${
                isSelected 
                  ? `${platform.color} text-white shadow-lg` 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              <Icon size={20} />
              <span className="text-sm font-medium">{platform.name}</span>
            </button>
          );
        })}
      </div>

      {/* Champs de saisie pour les réseaux sélectionnés */}
      {socials.length > 0 && (
        <div className="space-y-3 mt-6">
          <h4 className="text-sm font-medium text-gray-700">Configurez vos réseaux sociaux :</h4>
          {socials.map((social) => {
            const platform = socialPlatforms.find(p => p.name === social.nom);
            if (!platform) return null;

            const Icon = platform.icon;
            
            return (
              <div key={social.nom} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className={`p-2 rounded ${platform.color.split(' ')[0]} text-white`}>
                  <Icon size={16} />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    {social.nom}
                  </label>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-1">{platform.baseUrl}</span>
                    <input
                      type="text"
                      value={getSocialUsername(social.nom)}
                      onChange={(e) => updateSocialUrl(social.nom, e.target.value)}
                      placeholder={platform.placeholder}
                      className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}