import React from 'react';
import { Plus, X } from 'lucide-react';
import { FormField } from './FormField';

interface ImageUploadSectionProps {
  images: string[];
  onChange: (images: string[]) => void;
}

export function ImageUploadSection({ images, onChange }: ImageUploadSectionProps) {
  const addImage = () => {
    if (images.length < 5) {
      onChange([...images, '']);
    }
  };

  const updateImage = (index: number, url: string) => {
    const newImages = [...images];
    newImages[index] = url;
    onChange(newImages);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
  };

  return (
    <FormField label="Galerie d'images (URLs)">
      <div className="space-y-3">
        {images.map((image, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="url"
              value={image}
              onChange={(e) => updateImage(index, e.target.value)}
              placeholder="https://exemple.com/image.jpg"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        ))}
        
        {images.length < 5 && (
          <button
            type="button"
            onClick={addImage}
            className="flex items-center gap-2 px-4 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <Plus size={16} />
            Ajouter une image ({images.length}/5)
          </button>
        )}
      </div>
    </FormField>
  );
}