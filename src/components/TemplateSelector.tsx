import React from 'react';
import { Palette, Leaf, Utensils, Sun, Moon } from 'lucide-react';

export type TemplateType = 'simple' | 'zen' | 'street-food';

interface TemplateSelectorProps {
  selectedTemplate: TemplateType;
  onTemplateChange: (template: TemplateType) => void;
  darkMode: boolean;
  onDarkModeChange: (darkMode: boolean) => void;
}

const templates = [
  {
    id: 'simple' as TemplateType,
    name: 'Simple',
    description: 'Design classique et élégant',
    icon: Palette,
    colors: ['#8b4513', '#daa520', '#fef9f3'],
    preview: 'Couleurs chaudes, typographie classique'
  },
  {
    id: 'zen' as TemplateType,
    name: 'Zen',
    description: 'Minimaliste japonais moderne',
    icon: Leaf,
    colors: ['#3A5A40', '#8a9a8d', '#f9f9f6'],
    preview: 'Épuré, marges généreuses, sans fioritures'
  },
  {
    id: 'street-food' as TemplateType,
    name: 'Street Food',
    description: 'Dynamique et coloré',
    icon: Utensils,
    colors: ['#ff5722', '#ffc107', '#fff3e0'],
    preview: 'Couleurs vives, style urbain'
  }
];

export function TemplateSelector({ selectedTemplate, onTemplateChange, darkMode, onDarkModeChange }: TemplateSelectorProps) {
  return (
    <div className="mb-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border-2 border-indigo-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Palette className="text-indigo-600" size={24} />
          Choisissez votre template
        </h3>
        
        {/* Switch Mode Sombre */}
        <div className="flex items-center gap-3">
          <Sun className="text-yellow-500" size={20} />
          <button
            onClick={() => onDarkModeChange(!darkMode)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
              darkMode ? 'bg-indigo-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                darkMode ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <Moon className="text-indigo-600" size={20} />
          <span className="text-sm font-medium text-gray-700">
            {darkMode ? 'Sombre' : 'Normal'}
          </span>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-4">
        {templates.map((template) => {
          const Icon = template.icon;
          const isSelected = selectedTemplate === template.id;
          
          return (
            <button
              key={template.id}
              onClick={() => onTemplateChange(template.id)}
              className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                isSelected
                  ? 'border-indigo-500 bg-indigo-50 shadow-lg transform scale-105'
                  : 'border-gray-200 bg-white hover:border-indigo-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg ${
                  isSelected ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  <Icon size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{template.name}</h4>
                  <p className="text-sm text-gray-600">{template.description}</p>
                </div>
              </div>
              
              <div className="flex gap-2 mb-2">
                {template.colors.map((color, index) => (
                  <div
                    key={index}
                    className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              
              <p className="text-xs text-gray-500">{template.preview}</p>
              
              {isSelected && (
                <div className="mt-2 text-xs text-indigo-600 font-medium">
                  ✓ Template sélectionné
                </div>
              )}
            </button>
          );
        })}
      </div>
      
      {/* Indication du mode sombre */}
      {darkMode && (
        <div className="mt-4 p-3 bg-indigo-100 rounded-lg border border-indigo-200">
          <p className="text-sm text-indigo-700 flex items-center gap-2">
            <Moon size={16} />
            <strong>Mode sombre activé :</strong> Votre landing page utilisera des couleurs sombres et élégantes.
          </p>
        </div>
      )}
    </div>
  );
}