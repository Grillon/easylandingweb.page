import React, { useRef } from 'react';
import { Upload, Download } from 'lucide-react';

interface RestaurantData {
  nom: string;
  accroche: string;
  banniere_url: string;
  images: string[];
  adresse: string;
  maps_url: string;
  telephone: string;
  horaires: string;
  socials: Array<{ nom: string; url: string; }>;
}

interface ImportExportSectionProps {
  data: RestaurantData;
  onImport: (data: RestaurantData) => void;
}

export function ImportExportSection({ data, onImport }: ImportExportSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${data.nom || 'restaurant'}-data.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string);
        onImport(importedData);
        alert('Données importées avec succès !');
      } catch (error) {
        alert('Erreur lors de l\'importation du fichier. Vérifiez que le fichier JSON est valide.');
      }
    };
    reader.readAsText(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        onClick={handleExport}
        className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
      >
        <Download size={16} />
        Exporter JSON
      </button>

      <button
        type="button"
        onClick={triggerFileInput}
        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
      >
        <Upload size={16} />
        Importer JSON
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleImport}
        className="hidden"
      />
    </div>
  );
}