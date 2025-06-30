import React from 'react';
import { X, ExternalLink, Github, Upload, Settings, Globe } from 'lucide-react';

interface DocumentationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DocumentationModal({ isOpen, onClose }: DocumentationModalProps) {
  if (!isOpen) return null;

  const openGitHubSignup = () => {
    window.open('https://github.com/join', '_blank');
  };

  const openNewRepo = () => {
    window.open('https://github.com/new', '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-900 rounded-lg">
              <Github className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-semibold">Guide de déploiement GitHub Pages</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="prose max-w-none">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-800 font-medium mb-2">
                🚀 Déployez votre landing page gratuitement sur GitHub Pages en quelques étapes simples !
              </p>
              <p className="text-blue-700 text-sm">
                GitHub Pages vous permet d'héberger votre site web gratuitement avec une URL personnalisée.
              </p>
            </div>

            {/* Étape 1 */}
            <div className="mb-8 p-6 bg-gray-50 rounded-lg border-l-4 border-gray-900">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Créer un compte GitHub</h3>
              </div>
              
              <p className="text-gray-700 mb-4">
                Si vous n'avez pas encore de compte GitHub, créez-en un gratuitement :
              </p>
              
              <button
                onClick={openGitHubSignup}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                <Github size={18} />
                Créer un compte GitHub
                <ExternalLink size={16} />
              </button>
              
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                <p className="text-yellow-800 text-sm">
                  💡 <strong>Conseil :</strong> Choisissez un nom d'utilisateur professionnel, il apparaîtra dans l'URL de votre site.
                </p>
              </div>
            </div>

            {/* Étape 2 */}
            <div className="mb-8 p-6 bg-green-50 rounded-lg border-l-4 border-green-600">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <h3 className="text-lg font-semibold text-green-800">Créer un repository public</h3>
              </div>
              
              <p className="text-gray-700 mb-4">
                Créez un nouveau repository pour héberger votre landing page :
              </p>
              
              <button
                onClick={openNewRepo}
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium mb-4"
              >
                <Github size={18} />
                Créer un nouveau repository
                <ExternalLink size={16} />
              </button>
              
              <div className="bg-white p-4 rounded border">
                <h4 className="font-semibold mb-2">Paramètres recommandés :</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• <strong>Repository name :</strong> nom-de-votre-restaurant (ex: restaurant-chez-mario)</li>
                  <li>• <strong>Description :</strong> Site web de [Nom du restaurant]</li>
                  <li>• <strong>Visibilité :</strong> Public (obligatoire pour GitHub Pages gratuit)</li>
                  <li>• <strong>Initialize :</strong> Cochez "Add a README file"</li>
                </ul>
              </div>
            </div>

            {/* Étape 3 */}
            <div className="mb-8 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-600">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <h3 className="text-lg font-semibold text-blue-800">Uploader le fichier index.html</h3>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-700">
                  Une fois votre repository créé, uploadez votre fichier index.html :
                </p>
                
                <div className="bg-white p-4 rounded border">
                  <div className="flex items-center gap-2 mb-3">
                    <Upload className="text-blue-600" size={18} />
                    <h4 className="font-semibold">Méthode simple (interface web) :</h4>
                  </div>
                  <ol className="space-y-2 text-sm text-gray-700 ml-4">
                    <li>1. Cliquez sur "Add file" → "Upload files" dans votre repository</li>
                    <li>2. Glissez-déposez votre fichier <code className="bg-gray-100 px-1 rounded">index.html</code></li>
                    <li>3. Ajoutez un message de commit : "Ajout de la landing page"</li>
                    <li>4. Cliquez sur "Commit changes"</li>
                  </ol>
                </div>
                
                <div className="p-3 bg-orange-50 border border-orange-200 rounded">
                  <p className="text-orange-800 text-sm">
                    ⚠️ <strong>Important :</strong> Le fichier doit s'appeler exactement <code className="bg-orange-100 px-1 rounded">index.html</code> pour fonctionner avec GitHub Pages.
                  </p>
                </div>
              </div>
            </div>

            {/* Étape 4 */}
            <div className="mb-8 p-6 bg-purple-50 rounded-lg border-l-4 border-purple-600">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <h3 className="text-lg font-semibold text-purple-800">Activer GitHub Pages</h3>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-700">
                  Activez GitHub Pages pour rendre votre site accessible en ligne :
                </p>
                
                <div className="bg-white p-4 rounded border">
                  <div className="flex items-center gap-2 mb-3">
                    <Settings className="text-purple-600" size={18} />
                    <h4 className="font-semibold">Configuration GitHub Pages :</h4>
                  </div>
                  <ol className="space-y-2 text-sm text-gray-700 ml-4">
                    <li>1. Dans votre repository, cliquez sur l'onglet <strong>"Settings"</strong></li>
                    <li>2. Faites défiler jusqu'à la section <strong>"Pages"</strong> dans le menu de gauche</li>
                    <li>3. Sous "Source", sélectionnez <strong>"Deploy from a branch"</strong></li>
                    <li>4. Choisissez la branche <strong>"main"</strong> et le dossier <strong>"/ (root)"</strong></li>
                    <li>5. Cliquez sur <strong>"Save"</strong></li>
                  </ol>
                </div>
                
                <div className="p-3 bg-green-50 border border-green-200 rounded">
                  <p className="text-green-800 text-sm">
                    ✅ <strong>Succès :</strong> GitHub va maintenant construire et déployer votre site. Cela peut prendre quelques minutes.
                  </p>
                </div>
              </div>
            </div>

            {/* Étape 5 */}
            <div className="mb-8 p-6 bg-indigo-50 rounded-lg border-l-4 border-indigo-600">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                  5
                </div>
                <h3 className="text-lg font-semibold text-indigo-800">Accéder à votre site</h3>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-700">
                  Une fois le déploiement terminé, votre site sera accessible à l'adresse :
                </p>
                
                <div className="bg-white p-4 rounded border">
                  <div className="flex items-center gap-2 mb-3">
                    <Globe className="text-indigo-600" size={18} />
                    <h4 className="font-semibold">URL de votre site :</h4>
                  </div>
                  <div className="bg-gray-100 p-3 rounded font-mono text-sm">
                    https://<span className="text-indigo-600">[votre-nom-utilisateur]</span>.github.io/<span className="text-green-600">[nom-du-repository]</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    Exemple : https://johndoe.github.io/restaurant-chez-mario
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded border">
                  <h4 className="font-semibold mb-2">Comment trouver l'URL :</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Retournez dans l'onglet "Settings" → "Pages"</li>
                    <li>• L'URL apparaîtra en haut avec un message "Your site is published at..."</li>
                    <li>• Vous pouvez aussi la voir dans l'onglet "Actions" une fois le déploiement terminé</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Conseils supplémentaires */}
            <div className="p-6 bg-yellow-50 rounded-lg border border-yellow-200">
              <h3 className="text-lg font-semibold text-yellow-800 mb-4">💡 Conseils supplémentaires</h3>
              <ul className="space-y-2 text-sm text-yellow-800">
                <li>• <strong>Mise à jour :</strong> Pour modifier votre site, remplacez simplement le fichier index.html dans votre repository</li>
                <li>• <strong>Délai :</strong> Les changements peuvent prendre 5-10 minutes pour apparaître en ligne</li>
                <li>• <strong>Domaine personnalisé :</strong> Vous pouvez configurer votre propre nom de domaine dans les paramètres Pages</li>
                <li>• <strong>HTTPS :</strong> GitHub Pages active automatiquement HTTPS pour sécuriser votre site</li>
                <li>• <strong>Statistiques :</strong> Utilisez Google Analytics pour suivre les visiteurs de votre site</li>
              </ul>
            </div>

            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
              <p className="text-green-800 font-medium">
                🎉 Félicitations ! Votre restaurant a maintenant sa propre présence en ligne professionnelle !
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}