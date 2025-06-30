# EasyLandingWeb - Générateur de Landing Page Restaurant avec IA

Un générateur de landing pages professionnel pour restaurants avec personnalisation IA via GitHub.

## 🚀 Fonctionnalités

### ✨ Génération de Landing Page
- Interface intuitive pour saisir les informations du restaurant
- Génération automatique de HTML/CSS optimisé
- Aperçu en temps réel
- Téléchargement du fichier HTML final

### 🎨 Personnalisation IA
- **Authentification GitHub OAuth** pour une sécurité maximale
- **Personnalisation intelligente** via l'IA Claude
- **Workflow GitHub Actions** automatisé
- **Génération de CSS personnalisé** basé sur vos demandes

### 📱 Fonctionnalités Avancées
- Design responsive (mobile, tablette, desktop)
- Intégration Google Maps
- Gestion des réseaux sociaux
- Galerie d'images
- Import/Export des données
- Sauvegarde automatique locale

## 🔧 Architecture Technique

### Frontend
- **React 18** avec TypeScript
- **Tailwind CSS** pour le styling
- **Lucide React** pour les icônes
- **Vite** comme bundler

### Intégration GitHub
- **GitHub OAuth** pour l'authentification
- **GitHub Actions** pour l'exécution des workflows IA
- **Octokit** pour l'API GitHub
- **Anthropic Claude API** pour la génération de CSS

## 🎯 Comment utiliser la personnalisation IA

### 1. Authentification
```typescript
// L'utilisateur se connecte via GitHub OAuth
const handleLogin = () => {
  // Redirection vers GitHub OAuth
  window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&...`;
};
```

### 2. Demande de personnalisation
```typescript
// L'utilisateur décrit ses souhaits
const customization = "Couleurs chaudes, police moderne, animations subtiles";

// Déclenchement du workflow GitHub
await githubService.requestCustomization({
  restaurantName: "Mon Restaurant",
  customization: customization,
  currentData: restaurantData
});
```

### 3. Traitement IA
Le workflow GitHub Actions :
1. Reçoit la demande de personnalisation
2. Appelle l'API Claude avec le prompt optimisé
3. Génère du CSS personnalisé
4. Retourne le résultat à l'application

### 4. Application du style
```css
/* CSS généré automatiquement par l'IA */
:root {
  --ai-primary: #e74c3c;
  --ai-secondary: #c0392b;
  --ai-accent: #f39c12;
}

.title-section h1 {
  color: var(--ai-primary) !important;
  animation: aiGlow 2s ease-in-out infinite alternate !important;
}
```

## 🛠️ Configuration

### Variables d'environnement requises
```env
# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# API Anthropic (dans les secrets GitHub)
ANTHROPIC_API_KEY=your_anthropic_api_key
```

### Secrets GitHub Actions
Dans votre repository GitHub, ajoutez :
- `ANTHROPIC_API_KEY` : Votre clé API Anthropic Claude

## 📋 Workflow de personnalisation

```yaml
# .github/workflows/customize-landing.yml
name: Personnalisation IA Landing Page

on:
  workflow_dispatch:
    inputs:
      restaurant_name:
        description: 'Nom du restaurant'
        required: true
      customization_request:
        description: 'Demande de personnalisation'
        required: true
      # ... autres inputs
```

## 🎨 Exemples de personnalisations

### Couleurs chaudes
```
"Utilise des couleurs chaudes comme le rouge et l'orange, avec une ambiance méditerranéenne"
```

### Mode sombre
```
"Passe en mode sombre avec des accents dorés pour un restaurant haut de gamme"
```

### Style minimaliste
```
"Design épuré et minimaliste, couleurs neutres, beaucoup d'espace blanc"
```

### Animations
```
"Ajoute des animations subtiles et des micro-interactions pour plus de dynamisme"
```

## 🔒 Sécurité

- **GitHub OAuth** pour l'authentification sécurisée
- **Secrets GitHub** pour les clés API
- **Workflow isolé** pour l'exécution IA
- **Pas de stockage** des clés côté client

## 🚀 Déploiement

### Développement local
```bash
npm install
npm run dev
```

### Production
```bash
npm run build
npm run preview
```

## 📈 Évolutions futures

- [ ] Support d'autres modèles IA (GPT-4, Gemini)
- [ ] Templates prédéfinis par type de cuisine
- [ ] Intégration directe avec les plateformes de déploiement
- [ ] Système de versioning des designs
- [ ] Marketplace de templates communautaires

## 🤝 Contribution

Les contributions sont les bienvenues ! Voir [CONTRIBUTING.md](CONTRIBUTING.md) pour les détails.

## 📄 Licence

MIT License - voir [LICENSE](LICENSE) pour les détails.

---

**EasyLandingWeb** - Créez des landing pages professionnelles avec la puissance de l'IA ! 🚀