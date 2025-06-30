import React, { useState } from 'react';
import { Eye, Download, Save, ListRestart as Restaurant, BookOpen, Sparkles, Palette } from 'lucide-react';
import { FormField } from './components/FormField';
import { ImageUploadSection } from './components/ImageUploadSection';
import { SocialMediaBanner } from './components/SocialMediaBanner';
import { ImportExportSection } from './components/ImportExportSection';
import { PreviewModal } from './components/PreviewModal';
import { DocumentationModal } from './components/DocumentationModal';
import { TemplateSelector, TemplateType } from './components/TemplateSelector';
import { useLocalStorage } from './hooks/useLocalStorage';
import { generateHTML, downloadHTML } from './utils/templateGenerator';

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
  template: TemplateType;
  darkMode: boolean;
  customization: string;
  aiCustomizationEnabled: boolean;
}

const initialData: RestaurantData = {
  nom: '',
  accroche: '',
  banniere_url: '',
  images: [],
  adresse: '',
  maps_url: '',
  telephone: '',
  horaires: '',
  socials: [],
  template: 'simple',
  darkMode: false,
  customization: '',
  aiCustomizationEnabled: false
};

function App() {
  const [data, setData] = useLocalStorage<RestaurantData>('restaurant-data', initialData);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isDocumentationOpen, setIsDocumentationOpen] = useState(false);
  const [generatedHTML, setGeneratedHTML] = useState('');

  const updateField = <K extends keyof RestaurantData>(field: K, value: RestaurantData[K]) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handlePreview = () => {
    const html = generateHTML(data);
    setGeneratedHTML(html);
    setIsPreviewOpen(true);
  };

  const handleDownload = () => {
    const html = generateHTML(data);
    downloadHTML(html, 'index.html');
  };

  const handleSave = () => {
    // Les données sont déjà sauvegardées automatiquement grâce à useLocalStorage
    alert('Données sauvegardées avec succès !');
  };

  const handleImport = (importedData: RestaurantData) => {
    setData(importedData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Badge Bolt officiel - Respecte les guidelines */}
      <a
        href="https://bolt.new/"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed top-4 right-4 z-50 group"
        style={{ opacity: 0.85 }}
      >
        <div className="bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105 border border-gray-200 p-2">
          <img 
            src="/white_circle_360x360.png" 
            alt="Made with Bolt"
            className="w-24 h-24 object-contain"
          />
        </div>
      </a>

      {/* Bouton Aperçu Flottant - Avec espacement parfait */}
      <button
        onClick={handlePreview}
        className="fixed top-40 right-4 z-50 group bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-110 border-2 border-blue-500 p-4"
        title="Aperçu rapide"
      >
        <Eye size={28} className="drop-shadow-sm" />
        <div className="absolute -left-20 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          Aperçu rapide
        </div>
      </button>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-full">
              <Restaurant className="text-white" size={32} />
            </div>
            <h1 className="text-4xl font-bold text-gray-800">
              EasyLandingWeb
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Créez une landing page professionnelle pour votre restaurant en quelques minutes
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Switch Personnalisation IA */}
            <div className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-600 rounded-lg">
                    <Sparkles className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Mode Personnalisation IA
                  </h3>
                </div>
                
                {/* Switch Principal */}
                <div className="flex items-center gap-3">
                  <Palette className="text-purple-600" size={20} />
                  <button
                    onClick={() => updateField('aiCustomizationEnabled', !data.aiCustomizationEnabled)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                      data.aiCustomizationEnabled ? 'bg-purple-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        data.aiCustomizationEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  <Sparkles className="text-purple-600" size={20} />
                  <span className="text-sm font-medium text-gray-700">
                    {data.aiCustomizationEnabled ? 'IA Activée' : 'Templates'}
                  </span>
                </div>
              </div>

              {data.aiCustomizationEnabled ? (
                // Mode Personnalisation IA
                <div>
                  <div className="mb-4 p-4 bg-white rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-800 mb-2">🎨 Ce que vous pouvez personnaliser :</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                      <div>
                        <p className="font-medium text-purple-700 mb-1">🎨 Couleurs :</p>
                        <ul className="list-disc list-inside space-y-1 text-xs">
                          <li>Couleurs chaudes (rouge, orange, jaune)</li>
                          <li>Couleurs froides (bleu, vert, violet)</li>
                          <li>Palette méditerranéenne, asiatique, moderne</li>
                          <li>Couleurs de votre marque spécifique</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-medium text-purple-700 mb-1">✍️ Typographie :</p>
                        <ul className="list-disc list-inside space-y-1 text-xs">
                          <li>Police moderne, classique, élégante</li>
                          <li>Style manuscrit, serif, sans-serif</li>
                          <li>Taille et espacement personnalisés</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-medium text-purple-700 mb-1">✨ Animations :</p>
                        <ul className="list-disc list-inside space-y-1 text-xs">
                          <li>Animations subtiles ou dynamiques</li>
                          <li>Effets de survol personnalisés</li>
                          <li>Transitions fluides</li>
                          <li>Micro-interactions</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-medium text-purple-700 mb-1">🎭 Ambiance :</p>
                        <ul className="list-disc list-inside space-y-1 text-xs">
                          <li>Luxueux, décontracté, familial</li>
                          <li>Rustique, moderne, minimaliste</li>
                          <li>Romantique, festif, professionnel</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <FormField label="Décrivez votre vision en langage naturel">
                    <textarea
                      value={data.customization}
                      onChange={(e) => updateField('customization', e.target.value)}
                      placeholder="Exemple : Je veux des couleurs chaudes comme le rouge et l'orange pour mon restaurant italien, avec une police élégante et des animations subtiles. L'ambiance doit être chaleureuse et familiale, avec des effets de survol dorés sur les boutons."
                      rows={4}
                      className="w-full px-4 py-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-vertical"
                    />
                  </FormField>

                  <div className="mt-4 grid md:grid-cols-2 gap-4">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <p className="text-sm font-medium text-purple-800 mb-1">💡 Exemples de demandes :</p>
                      <ul className="text-xs text-purple-700 space-y-1">
                        <li>"Style japonais zen avec du vert et beige"</li>
                        <li>"Couleurs vives pour un food truck mexicain"</li>
                        <li>"Élégant et sombre pour un restaurant gastronomique"</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-pink-100 rounded-lg">
                      <p className="text-sm font-medium text-pink-800 mb-1">🚀 Fonctionnalités :</p>
                      <ul className="text-xs text-pink-700 space-y-1">
                        <li>Génération automatique de CSS</li>
                        <li>Adaptation intelligente</li>
                        <li>Styles personnalisés uniques</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>✨ Mode IA Activé :</strong> La personnalisation IA remplace les templates prédéfinis. 
                      Plus votre description est détaillée, plus le résultat sera précis !
                    </p>
                  </div>
                </div>
              ) : (
                // Mode Templates classiques
                <div className="text-center">
                  <p className="text-gray-600 mb-4">
                    Utilisez les templates prédéfinis ou activez la personnalisation IA pour un design unique
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                    <Palette size={16} />
                    <span>Templates classiques actifs</span>
                  </div>
                </div>
              )}
            </div>

            {/* Sélecteur de template - Affiché seulement si IA désactivée */}
            {!data.aiCustomizationEnabled && (
              <TemplateSelector
                selectedTemplate={data.template}
                onTemplateChange={(template) => updateField('template', template)}
                darkMode={data.darkMode}
                onDarkModeChange={(darkMode) => updateField('darkMode', darkMode)}
              />
            )}

            {/* Section Import/Export */}
            <div className="mb-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Gestion des données</h3>
              <ImportExportSection data={data} onImport={handleImport} />
            </div>

            <form className="space-y-8">
              {/* Informations de base */}
              <div className="grid md:grid-cols-2 gap-6">
                <FormField label="Nom du restaurant *">
                  <input
                    type="text"
                    value={data.nom}
                    onChange={(e) => updateField('nom', e.target.value)}
                    placeholder="Le Petit Bistrot"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </FormField>

                <FormField label="Téléphone">
                  <input
                    type="tel"
                    value={data.telephone}
                    onChange={(e) => updateField('telephone', e.target.value)}
                    placeholder="01 23 45 67 89"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </FormField>
              </div>

              <FormField label="Accroche du restaurant">
                <input
                  type="text"
                  value={data.accroche}
                  onChange={(e) => updateField('accroche', e.target.value)}
                  placeholder="Une cuisine authentique dans un cadre chaleureux"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </FormField>

              <FormField label="URL de l'image de bannière">
                <input
                  type="url"
                  value={data.banniere_url}
                  onChange={(e) => updateField('banniere_url', e.target.value)}
                  placeholder="https://exemple.com/banniere.jpg"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </FormField>

              <ImageUploadSection
                images={data.images}
                onChange={(images) => updateField('images', images)}
              />

              <FormField label="Adresse complète">
                <textarea
                  value={data.adresse}
                  onChange={(e) => updateField('adresse', e.target.value)}
                  placeholder="123 Rue de la Paix&#10;75001 Paris&#10;France"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-vertical"
                />
              </FormField>

              <FormField label="URL Google Maps (optionnel)">
                <input
                  type="url"
                  value={data.maps_url}
                  onChange={(e) => updateField('maps_url', e.target.value)}
                  placeholder="https://www.google.com/maps/embed?pb=..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <p className="text-sm text-gray-500 mt-1">
                  💡 Pour obtenir l'URL : allez sur Google Maps, recherchez votre adresse, cliquez sur "Partager" → "Intégrer une carte" et copiez l'URL dans src=""
                </p>
              </FormField>

              <FormField label="Horaires d'ouverture">
                <textarea
                  value={data.horaires}
                  onChange={(e) => updateField('horaires', e.target.value)}
                  placeholder="Lundi - Vendredi : 12h - 14h30 et 19h - 22h30&#10;Samedi : 19h - 23h&#10;Dimanche : Fermé"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-vertical"
                />
              </FormField>

              <SocialMediaBanner
                socials={data.socials}
                onChange={(socials) => updateField('socials', socials)}
              />
            </form>

            {/* Boutons d'action */}
            <div className="flex flex-wrap gap-4 mt-12 pt-8 border-t">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                <Save size={18} />
                Sauvegarder
              </button>

              <button
                onClick={handlePreview}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Eye size={18} />
                Aperçu
              </button>

              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
              >
                <Download size={18} />
                Télécharger HTML
              </button>

              <button
                onClick={() => setIsDocumentationOpen(true)}
                className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                <BookOpen size={18} />
                Documentation
              </button>
            </div>

            {/* Indication de sauvegarde automatique */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                💡 <strong>Sauvegarde automatique :</strong> Vos données sont automatiquement sauvegardées dans votre navigateur pendant que vous saisissez.
              </p>
            </div>
          </div>
        </div>
      </div>

      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        htmlContent={generatedHTML}
      />

      <DocumentationModal
        isOpen={isDocumentationOpen}
        onClose={() => setIsDocumentationOpen(false)}
      />
    </div>
  );
}

export default App;