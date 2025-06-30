import { TemplateType } from '../components/TemplateSelector';
import { getTemplateStyles } from './templateStyles';

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
  customization?: string;
  customCSS?: string;
  template?: TemplateType;
  darkMode?: boolean;
  aiCustomizationEnabled?: boolean;
}

export function generateHTML(data: RestaurantData): string {
  const template = data.template || 'simple';
  const darkMode = data.darkMode || false;
  const aiEnabled = data.aiCustomizationEnabled || false;
  
  // Si l'IA est activée, on utilise un template de base et on applique la personnalisation IA
  const styles = aiEnabled ? getBaseStyles() : getTemplateStyles(template, darkMode);
  
  // Générer du CSS personnalisé basé sur la demande de l'utilisateur (seulement si IA activée)
  const customCSS = aiEnabled ? generateCustomCSS(data.customization || '', template, darkMode) : '';
  
  const htmlTemplate = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{nom}}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  ${getCustomFontImports(data.customization || '', aiEnabled)}
  ${styles.fontImport}
  <style>
    * {
      box-sizing: border-box;
    }
    
    body {
      margin: 0;
      font-family: ${styles.bodyFont};
      background: ${styles.backgroundColor};
      color: ${styles.textColor};
      line-height: 1.6;
    }
    
    .title-section {
      text-align: center;
      padding: 3rem 1rem 2rem;
      background: ${styles.headerBackground};
      position: relative;
      overflow: hidden;
    }
    
    .title-section h1 {
      font-family: ${styles.titleFont};
      font-size: clamp(2.5rem, 5vw, 4rem);
      font-weight: 700;
      margin: 0;
      color: ${styles.primaryColor};
      text-shadow: 0 2px 4px ${styles.primaryColor}20;
      position: relative;
      z-index: 1;
      ${styles.titleAnimation}
    }
    
    .hero {
      background: url('{{banniere_url}}') center/cover no-repeat;
      height: 70vh;
      position: relative;
      overflow: hidden;
    }
    
    .hero::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: ${styles.heroOverlay};
      pointer-events: none;
    }
    
    .tagline {
      text-align: center;
      font-size: 1.3rem;
      font-weight: 500;
      color: ${styles.secondaryColor};
      margin: 2rem auto;
      max-width: 700px;
      padding: 2rem 1rem;
      background: ${styles.taglineBackground};
      border-radius: 15px;
      border: 2px solid ${styles.accentColor}40;
      box-shadow: 0 4px 15px ${styles.primaryColor}20;
      backdrop-filter: blur(10px);
      ${styles.taglineAnimation}
    }
    
    .gallery-section {
      background: ${styles.sectionBackground};
      padding: 4rem 2rem;
      margin: 3rem 0;
      position: relative;
    }
    
    .gallery-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, transparent, ${styles.accentColor}, transparent);
    }
    
    .gallery-section::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, transparent, ${styles.accentColor}, transparent);
    }
    
    .gallery-title {
      font-family: ${styles.titleFont};
      font-size: 2.5rem;
      font-weight: 600;
      text-align: center;
      color: ${styles.primaryColor};
      margin-bottom: 2rem;
      text-shadow: 0 2px 4px ${styles.primaryColor}20;
    }
    
    .gallery {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .gallery img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: 15px;
      box-shadow: 0 8px 25px ${styles.primaryColor}30;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      border: 3px solid ${styles.accentColor}40;
      ${styles.imageAnimation}
    }
    
    .gallery img:hover {
      transform: translateY(-5px) scale(1.02);
      box-shadow: 0 15px 35px ${styles.primaryColor}40;
    }
    
    .info {
      text-align: center;
      padding: 3rem 2rem;
      background: ${styles.infoBackground};
      margin: 2rem 0;
      border-radius: 20px;
      max-width: 800px;
      margin-left: auto;
      margin-right: auto;
      border: 2px solid ${styles.accentColor}30;
    }
    
    .info-title {
      font-family: ${styles.titleFont};
      font-size: 2rem;
      font-weight: 600;
      color: ${styles.primaryColor};
      margin-bottom: 2rem;
      text-shadow: 0 2px 4px ${styles.primaryColor}20;
    }
    
    .info p {
      margin: 15px 0;
      font-size: 1.1rem;
      font-weight: 400;
      color: ${styles.textColor};
    }
    
    .info strong {
      color: ${styles.primaryColor};
      font-weight: 600;
    }
    
    .map-container {
      margin: 2.5rem auto;
      max-width: 700px;
      text-align: center;
      padding: 0 1rem;
    }
    
    .map-container iframe {
      width: 100%;
      height: 350px;
      border: 0;
      border-radius: 15px;
      box-shadow: 0 10px 30px ${styles.primaryColor}30;
      border: 3px solid ${styles.accentColor}50;
    }
    
    .socials {
      display: flex;
      justify-content: center;
      gap: 15px;
      margin-bottom: 2rem;
      flex-wrap: wrap;
      padding: 0 1rem;
    }
    
    .social-link {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 20px;
      text-decoration: none;
      color: white;
      font-weight: 600;
      font-family: ${styles.bodyFont};
      border-radius: 25px;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
      border: 2px solid rgba(255, 255, 255, 0.2);
      ${styles.socialAnimation}
    }
    
    .social-link:hover {
      transform: translateY(-3px) scale(1.05);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
      border-color: rgba(255, 255, 255, 0.4);
    }
    
    .social-facebook { 
      background: linear-gradient(135deg, #1877F2, #0d5dbf);
    }
    .social-instagram { 
      background: linear-gradient(135deg, #F56040, #E1306C, #C13584, #833AB4);
    }
    .social-x { 
      background: linear-gradient(135deg, #000000, #333333);
    }
    .social-youtube { 
      background: linear-gradient(135deg, #FF0000, #cc0000);
    }
    .social-linkedin { 
      background: linear-gradient(135deg, #0A66C2, #084d94);
    }
    .social-site-web { 
      background: linear-gradient(135deg, #10B981, #059669);
    }
    
    .social-icon {
      width: 22px;
      height: 22px;
      fill: currentColor;
      filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
    }
    
    footer {
      text-align: center;
      padding: 3rem 1rem;
      background: ${styles.footerBackground};
      color: ${styles.footerTextColor};
      margin-top: 4rem;
      position: relative;
      overflow: hidden;
    }
    
    footer::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, ${styles.accentColor}, ${styles.primaryColor}, ${styles.accentColor});
    }
    
    .footer-content p {
      margin: 0;
      font-size: 1rem;
      font-weight: 500;
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
    }
    
    ${styles.additionalCSS}
    
    /* CSS personnalisé généré par IA - APPLIQUÉ EN DERNIER POUR PRIORITÉ MAXIMALE */
    ${customCSS}
    
    /* Responsive Design */
    @media (max-width: 768px) {
      .title-section {
        padding: 2rem 1rem;
      }
      
      .hero {
        height: 50vh;
      }
      
      .tagline {
        font-size: 1.1rem;
        margin: 1.5rem auto;
        padding: 1.5rem 1rem;
      }
      
      .gallery-section {
        padding: 3rem 1rem;
      }
      
      .gallery {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 15px;
      }
      
      .gallery img {
        height: 180px;
      }
      
      .info {
        padding: 2rem 1rem;
        margin: 1.5rem 1rem;
      }
      
      .social-link {
        padding: 10px 16px;
        font-size: 0.9rem;
      }
      
      .socials {
        gap: 10px;
        margin-bottom: 1.5rem;
      }
    }
  </style>
</head>
<body>
  <div class="title-section">
    <h1>{{nom}}</h1>
  </div>

  <header class="hero"></header>

  <div class="tagline">
    <p>{{accroche}}</p>
  </div>

  <section class="gallery-section">
    <h2 class="gallery-title">Notre Galerie</h2>
    <div class="gallery">
      {{#images}}
      <img src="{{.}}" alt="photo">
      {{/images}}
    </div>
  </section>

  <section class="info">
    <h2 class="info-title">Informations Pratiques</h2>
    <p><strong>Adresse :</strong> {{adresse}}</p>
    
    {{#maps_url}}
    <div class="map-container">
      <iframe src="{{maps_url}}" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
    {{/maps_url}}
    
    <p><strong>Téléphone :</strong> {{telephone}}</p>
    <p><strong>Horaires :</strong><br>{{horaires}}</p>
  </section>

  <footer>
    <div class="socials">
      {{#socials}}
      <a href="{{url}}" target="_blank" class="social-link social-{{class}}">
        {{#icon}}{{icon}}{{/icon}}
        {{nom}}
      </a>
      {{/socials}}
    </div>
    
    <div class="footer-content">
      <p>Page générée avec ❤️ par <strong>EasyLandingWeb</strong></p>
    </div>
  </footer>
</body>
</html>`;

  // Remplacer les variables simples
  let result = htmlTemplate
    .replace(/{{nom}}/g, escapeHtml(data.nom))
    .replace(/{{accroche}}/g, escapeHtml(data.accroche))
    .replace(/{{banniere_url}}/g, data.banniere_url)
    .replace(/{{adresse}}/g, escapeHtml(data.adresse).replace(/\n/g, '<br>'))
    .replace(/{{telephone}}/g, escapeHtml(data.telephone))
    .replace(/{{horaires}}/g, escapeHtml(data.horaires).replace(/\n/g, '<br>'));

  // Remplacer la section images
  const imagesSection = data.images
    .filter(img => img.trim() !== '') // Filtrer les URLs vides
    .map(img => `      <img src="${img}" alt="photo">`)
    .join('\n');
  
  result = result.replace(
    /{{#images}}[\s\S]*?{{\/images}}/g,
    imagesSection
  );

  // Remplacer la section Google Maps
  const mapsSection = data.maps_url.trim() !== '' 
    ? `    <div class="map-container">
      <iframe src="${data.maps_url}" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>`
    : '';
  
  result = result.replace(
    /{{#maps_url}}[\s\S]*?{{\/maps_url}}/g,
    mapsSection
  );

  // Remplacer la section réseaux sociaux avec icônes
  const socialIcons = {
    'Facebook': '<svg class="social-icon" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
    'Instagram': '<svg class="social-icon" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>',
    'X (Twitter)': '<svg class="social-icon" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
    'YouTube': '<svg class="social-icon" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
    'LinkedIn': '<svg class="social-icon" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
    'Site Web': '<svg class="social-icon" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>'
  };

  const socialsSection = data.socials
    .filter(social => social.nom.trim() !== '' && social.url.trim() !== '') // Filtrer les entrées vides
    .map(social => {
      const socialClass = social.nom.toLowerCase().replace(/[^a-z0-9]/g, '-');
      const icon = socialIcons[social.nom as keyof typeof socialIcons] || socialIcons['Site Web'];
      
      return `      <a href="${social.url}" target="_blank" class="social-link social-${socialClass}">
        ${icon}
        ${escapeHtml(social.nom)}
      </a>`;
    })
    .join('\n');
  
  result = result.replace(
    /{{#socials}}[\s\S]*?{{\/socials}}/g,
    socialsSection
  );

  return result;
}

// Nouvelle fonction pour gérer les imports de polices personnalisées
function getCustomFontImports(customization: string, aiEnabled: boolean): string {
  if (!aiEnabled || !customization.trim()) return '';

  const lowerCustomization = customization.toLowerCase();
  let fontImports = '';

  // Détection du style manuscrit avec imports spécialisés
  if (lowerCustomization.includes('manuscrit') || 
      lowerCustomization.includes('handwriting') || 
      lowerCustomization.includes('écrit à la main') ||
      lowerCustomization.includes('ecriture') ||
      lowerCustomization.includes('script') ||
      lowerCustomization.includes('calligraphie')) {
    
    fontImports += '<link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&family=Kalam:wght@300;400;700&family=Caveat:wght@400;500;600;700&family=Amatic+SC:wght@400;700&family=Satisfy&display=swap" rel="stylesheet">\n';
  }

  // Autres polices spécialisées selon le contexte
  if (lowerCustomization.includes('élégant') || lowerCustomization.includes('luxe')) {
    fontImports += '<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Cinzel:wght@400;500;600&display=swap" rel="stylesheet">\n';
  }

  if (lowerCustomization.includes('moderne') || lowerCustomization.includes('futuriste')) {
    fontImports += '<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&family=Exo+2:wght@300;400;500;600;700&display=swap" rel="stylesheet">\n';
  }

  return fontImports;
}

// Styles de base pour le mode IA
function getBaseStyles() {
  return {
    fontImport: '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet">',
    bodyFont: "'Inter', system-ui, sans-serif",
    titleFont: "'Playfair Display', serif",
    backgroundColor: '#ffffff',
    textColor: '#1f2937',
    primaryColor: '#3b82f6',
    secondaryColor: '#1e40af',
    accentColor: '#60a5fa',
    headerBackground: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    sectionBackground: 'linear-gradient(135deg, #e2e8f0 0%, #f8fafc 100%)',
    taglineBackground: 'rgba(248, 250, 252, 0.9)',
    infoBackground: 'rgba(255, 255, 255, 0.8)',
    footerBackground: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    footerTextColor: '#f1f5f9',
    heroOverlay: 'linear-gradient(45deg, rgba(59, 130, 246, 0.1) 0%, rgba(96, 165, 250, 0.05) 50%, rgba(30, 64, 175, 0.1) 100%)',
    titleAnimation: '',
    taglineAnimation: '',
    imageAnimation: '',
    socialAnimation: '',
    additionalCSS: ''
  };
}

function generateCustomCSS(customization: string, template: TemplateType, darkMode: boolean): string {
  if (!customization.trim()) return '';

  const lowerCustomization = customization.toLowerCase();
  let customCSS = '\n/* 🎨 PERSONNALISATION IA - SYSTÈME DE COULEURS AVANCÉ */\n';
  
  // 🎨 SYSTÈME DE COULEURS INTELLIGENT ET CUMULABLE
  const colorSystem = analyzeColorRequest(lowerCustomization);
  
  if (colorSystem.hasColors) {
    customCSS += `
/* 🎨 PALETTE DE COULEURS PERSONNALISÉE */
:root {
  --ai-primary: ${colorSystem.primary};
  --ai-secondary: ${colorSystem.secondary};
  --ai-accent: ${colorSystem.accent};
  --ai-background: ${colorSystem.background};
  --ai-surface: ${colorSystem.surface};
  --ai-text: ${colorSystem.text};
  --ai-text-light: ${colorSystem.textLight};
}

/* APPLICATION DES COULEURS AVEC PRIORITÉ MAXIMALE */
body {
  background: var(--ai-background) !important;
  color: var(--ai-text) !important;
}

.title-section {
  background: var(--ai-surface) !important;
  color: var(--ai-text) !important;
}

.title-section h1 {
  color: var(--ai-primary) !important;
  text-shadow: 0 2px 8px var(--ai-primary)40 !important;
}

.gallery-section {
  background: var(--ai-background) !important;
}

.gallery-title, .info-title {
  color: var(--ai-primary) !important;
  text-shadow: 0 2px 6px var(--ai-primary)30 !important;
}

.tagline {
  background: var(--ai-surface) !important;
  color: var(--ai-text) !important;
  border-color: var(--ai-accent) !important;
  box-shadow: 0 8px 25px var(--ai-primary)20 !important;
}

.info {
  background: var(--ai-surface) !important;
  color: var(--ai-text) !important;
  border-color: var(--ai-accent) !important;
}

.info p {
  color: var(--ai-text-light) !important;
}

.info strong {
  color: var(--ai-primary) !important;
}

.gallery img {
  border-color: var(--ai-accent) !important;
  box-shadow: 0 8px 25px var(--ai-primary)30 !important;
}

.gallery img:hover {
  box-shadow: 0 15px 40px var(--ai-primary)40 !important;
}

.map-container iframe {
  border-color: var(--ai-accent) !important;
  box-shadow: 0 10px 30px var(--ai-primary)25 !important;
}

footer {
  background: linear-gradient(135deg, var(--ai-primary), var(--ai-secondary)) !important;
  color: white !important;
}

footer::before {
  background: linear-gradient(90deg, var(--ai-accent), var(--ai-primary), var(--ai-accent)) !important;
}`;
  }

  // ✍️ STYLE MANUSCRIT AMÉLIORÉ
  if (lowerCustomization.includes('manuscrit') || 
      lowerCustomization.includes('handwriting') || 
      lowerCustomization.includes('écrit à la main') ||
      lowerCustomization.includes('ecriture') ||
      lowerCustomization.includes('script') ||
      lowerCustomization.includes('calligraphie')) {
    
    customCSS += `
/* 🖋️ STYLE MANUSCRIT PROFESSIONNEL */
.title-section h1 {
  font-family: 'Dancing Script', 'Amatic SC', cursive !important;
  font-weight: 700 !important;
  font-size: clamp(3.5rem, 8vw, 7rem) !important;
  transform: rotate(-3deg) !important;
  text-shadow: 4px 4px 8px rgba(0,0,0,0.4) !important;
  letter-spacing: 3px !important;
  line-height: 1.1 !important;
  margin: 1rem 0 !important;
  position: relative !important;
}

.title-section h1::after {
  content: '' !important;
  position: absolute !important;
  bottom: -10px !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  width: 80% !important;
  height: 3px !important;
  background: linear-gradient(90deg, transparent, currentColor, transparent) !important;
  opacity: 0.6 !important;
}

.info-title, .gallery-title {
  font-family: 'Caveat', 'Kalam', cursive !important;
  font-weight: 700 !important;
  transform: rotate(-1.5deg) !important;
  font-size: 3rem !important;
  text-shadow: 3px 3px 6px rgba(0,0,0,0.3) !important;
  letter-spacing: 1px !important;
  margin-bottom: 2.5rem !important;
}

.tagline p {
  font-family: 'Satisfy', 'Kalam', cursive !important;
  font-style: italic !important;
  transform: rotate(1deg) !important;
  font-size: 1.6rem !important;
  font-weight: 400 !important;
  line-height: 1.7 !important;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.2) !important;
  letter-spacing: 0.5px !important;
}

.info strong {
  font-family: 'Caveat', cursive !important;
  font-weight: 700 !important;
  font-size: 1.2em !important;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.1) !important;
}

.info p {
  font-family: 'Kalam', cursive !important;
  font-weight: 400 !important;
  line-height: 1.8 !important;
  font-size: 1.1rem !important;
}

@keyframes handwritingFlow {
  0%, 100% { transform: rotate(-3deg) translateY(0px) scale(1); }
  25% { transform: rotate(-2.5deg) translateY(-2px) scale(1.01); }
  50% { transform: rotate(-3.5deg) translateY(-1px) scale(0.99); }
  75% { transform: rotate(-2deg) translateY(-3px) scale(1.02); }
}

.title-section h1 {
  animation: handwritingFlow 6s ease-in-out infinite !important;
}

@keyframes subtitleSway {
  0%, 100% { transform: rotate(-1.5deg) translateX(0px); }
  50% { transform: rotate(-1deg) translateX(2px); }
}

.info-title, .gallery-title {
  animation: subtitleSway 8s ease-in-out infinite !important;
}`;
  }

  // ✨ ANIMATIONS AVANCÉES
  if (lowerCustomization.includes('animation') || lowerCustomization.includes('animé') || lowerCustomization.includes('dynamique')) {
    customCSS += `
/* ✨ ANIMATIONS SOPHISTIQUÉES */
@keyframes aiGlow {
  0%, 100% { text-shadow: 0 0 10px currentColor; }
  50% { text-shadow: 0 0 30px currentColor, 0 0 40px currentColor; }
}

@keyframes aiFloat {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes aiPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes aiSlideIn {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.title-section h1 {
  animation: aiGlow 3s ease-in-out infinite alternate !important;
}

.gallery img {
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
}

.gallery img:hover {
  transform: translateY(-15px) scale(1.08) rotate(3deg) !important;
  animation: aiFloat 2s ease-in-out infinite !important;
}

.tagline {
  animation: aiFloat 4s ease-in-out infinite !important;
}

.social-link {
  animation: aiPulse 3s ease-in-out infinite !important;
}

.info, .gallery-section {
  animation: aiSlideIn 1s ease-out !important;
}`;
  }

  // 🎭 STYLES THÉMATIQUES AVANCÉS
  if (lowerCustomization.includes('élégant') || lowerCustomization.includes('luxe') || lowerCustomization.includes('chic') || lowerCustomization.includes('raffiné') || lowerCustomization.includes('gastronomique')) {
    customCSS += `
/* 🎩 ÉLÉGANCE ET RAFFINEMENT */
.title-section h1 {
  font-family: 'Cormorant Garamond', 'Cinzel', serif !important;
  font-weight: 300 !important;
  letter-spacing: 6px !important;
  text-transform: uppercase !important;
  font-size: clamp(2rem, 4vw, 3.5rem) !important;
}

.tagline {
  font-style: italic !important;
  font-weight: 300 !important;
  border: 1px solid rgba(0,0,0,0.1) !important;
  background: rgba(255,255,255,0.95) !important;
  backdrop-filter: blur(20px) !important;
}

.gallery img {
  border-radius: 0 !important;
  filter: grayscale(30%) contrast(1.1) !important;
  border: 1px solid rgba(0,0,0,0.1) !important;
}

.gallery img:hover {
  filter: grayscale(0%) contrast(1.2) !important;
  transform: scale(1.02) !important;
}

.info {
  border: 1px solid rgba(0,0,0,0.1) !important;
  background: rgba(255,255,255,0.95) !important;
  backdrop-filter: blur(20px) !important;
}`;
  }

  // 🔥 AMBIANCE CHALEUREUSE
  if (lowerCustomization.includes('chaleureux') || lowerCustomization.includes('familial') || lowerCustomization.includes('convivial') || lowerCustomization.includes('accueillant')) {
    customCSS += `
/* 🔥 CHALEUR ET CONVIVIALITÉ */
.gallery img {
  border-radius: 20px !important;
  border: 4px solid #fff !important;
  box-shadow: 0 15px 35px rgba(0,0,0,0.2) !important;
}

.gallery img:hover {
  transform: translateY(-8px) scale(1.05) !important;
}

.tagline, .info {
  background: rgba(255, 255, 255, 0.9) !important;
  border: 2px solid rgba(255,255,255,0.5) !important;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1) !important;
}`;
  }

  // ✨ EFFETS DORÉS
  if (lowerCustomization.includes('doré') || lowerCustomization.includes('or') || lowerCustomization.includes('gold')) {
    customCSS += `
/* ✨ LUXE DORÉ */
.social-link:hover {
  box-shadow: 0 0 25px #ffd700 !important;
  border-color: #ffd700 !important;
  transform: translateY(-5px) scale(1.1) !important;
}

.gallery img:hover {
  border-color: #ffd700 !important;
  box-shadow: 0 0 40px rgba(255, 215, 0, 0.6) !important;
}

.title-section h1 {
  text-shadow: 0 0 20px #ffd700, 0 2px 4px rgba(255, 215, 0, 0.5) !important;
}

.info-title, .gallery-title {
  text-shadow: 0 0 15px #ffd700 !important;
}`;
  }

  // 🚀 STYLE MODERNE
  if (lowerCustomization.includes('moderne') || lowerCustomization.includes('contemporain') || lowerCustomization.includes('futuriste')) {
    customCSS += `
/* 🚀 MODERNITÉ ET INNOVATION */
.title-section h1 {
  font-family: 'Orbitron', 'Exo 2', sans-serif !important;
  font-weight: 900 !important;
  background: linear-gradient(45deg, var(--ai-primary, #3b82f6), var(--ai-accent, #60a5fa)) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  background-clip: text !important;
  text-shadow: none !important;
}

.gallery img {
  border-radius: 25px !important;
  box-shadow: 0 25px 50px rgba(0,0,0,0.15) !important;
  border: none !important;
}

.gallery img:hover {
  box-shadow: 0 35px 70px rgba(0,0,0,0.25) !important;
}

.info, .tagline {
  border-radius: 25px !important;
  backdrop-filter: blur(20px) !important;
  border: 1px solid rgba(255,255,255,0.2) !important;
}`;
  }

  // 🎯 STYLE MINIMALISTE
  if (lowerCustomization.includes('minimaliste') || lowerCustomization.includes('épuré') || lowerCustomization.includes('simple')) {
    customCSS += `
/* 🎯 MINIMALISME RAFFINÉ */
.title-section {
  background: #ffffff !important;
  padding: 4rem 2rem !important;
}

.title-section h1 {
  font-weight: 300 !important;
  color: var(--ai-primary, #1f2937) !important;
  text-shadow: none !important;
}

.gallery img {
  border-radius: 0 !important;
  border: none !important;
  box-shadow: none !important;
}

.gallery img:hover {
  transform: none !important;
  opacity: 0.8 !important;
}

.tagline, .info {
  background: #ffffff !important;
  border: 1px solid #e5e7eb !important;
  border-radius: 0 !important;
  box-shadow: none !important;
}

.gallery-section::before, .gallery-section::after {
  display: none !important;
}`;
  }

  return customCSS;
}

// 🎨 FONCTION D'ANALYSE INTELLIGENTE DES COULEURS
function analyzeColorRequest(text: string): {
  hasColors: boolean;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textLight: string;
} {
  const defaultColors = {
    hasColors: false,
    primary: '#3b82f6',
    secondary: '#1e40af',
    accent: '#60a5fa',
    background: '#ffffff',
    surface: 'rgba(255, 255, 255, 0.9)',
    text: '#1f2937',
    textLight: '#6b7280'
  };

  // 🔴 ROUGE / COULEURS CHAUDES
  if (text.includes('rouge') || text.includes('red') || text.includes('chaudes')) {
    return {
      hasColors: true,
      primary: '#dc2626',
      secondary: '#b91c1c',
      accent: '#f87171',
      background: 'linear-gradient(135deg, #fef2f2, #fee2e2)',
      surface: 'rgba(254, 242, 242, 0.9)',
      text: '#7f1d1d',
      textLight: '#991b1b'
    };
  }

  // 🟠 ORANGE
  if (text.includes('orange')) {
    return {
      hasColors: true,
      primary: '#ea580c',
      secondary: '#c2410c',
      accent: '#fb923c',
      background: 'linear-gradient(135deg, #fff7ed, #fed7aa)',
      surface: 'rgba(255, 247, 237, 0.9)',
      text: '#9a3412',
      textLight: '#c2410c'
    };
  }

  // 🟡 JAUNE
  if (text.includes('jaune') || text.includes('yellow') || text.includes('doré') || text.includes('or')) {
    return {
      hasColors: true,
      primary: '#d97706',
      secondary: '#b45309',
      accent: '#fbbf24',
      background: 'linear-gradient(135deg, #fffbeb, #fef3c7)',
      surface: 'rgba(255, 251, 235, 0.9)',
      text: '#92400e',
      textLight: '#b45309'
    };
  }

  // 🟢 VERT
  if (text.includes('vert') || text.includes('green')) {
    return {
      hasColors: true,
      primary: '#16a34a',
      secondary: '#15803d',
      accent: '#4ade80',
      background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
      surface: 'rgba(240, 253, 244, 0.9)',
      text: '#14532d',
      textLight: '#166534'
    };
  }

  // 🔵 BLEU (par défaut si pas d'autre couleur spécifiée)
  if (text.includes('bleu') || text.includes('blue') || text.includes('froides')) {
    return {
      hasColors: true,
      primary: '#2563eb',
      secondary: '#1d4ed8',
      accent: '#60a5fa',
      background: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
      surface: 'rgba(239, 246, 255, 0.9)',
      text: '#1e3a8a',
      textLight: '#1e40af'
    };
  }

  // 🟣 VIOLET
  if (text.includes('violet') || text.includes('purple')) {
    return {
      hasColors: true,
      primary: '#9333ea',
      secondary: '#7c3aed',
      accent: '#a855f7',
      background: 'linear-gradient(135deg, #faf5ff, #e9d5ff)',
      surface: 'rgba(250, 245, 255, 0.9)',
      text: '#581c87',
      textLight: '#6b21a8'
    };
  }

  // 🌸 ROSE
  if (text.includes('rose') || text.includes('pink')) {
    return {
      hasColors: true,
      primary: '#e11d48',
      secondary: '#be185d',
      accent: '#f472b6',
      background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)',
      surface: 'rgba(253, 242, 248, 0.9)',
      text: '#831843',
      textLight: '#9d174d'
    };
  }

  // 🌙 MODE SOMBRE
  if (text.includes('sombre') || text.includes('dark') || text.includes('nocturne') || text.includes('noir')) {
    return {
      hasColors: true,
      primary: '#60a5fa',
      secondary: '#3b82f6',
      accent: '#93c5fd',
      background: 'linear-gradient(135deg, #0f172a, #1e293b)',
      surface: 'rgba(30, 41, 59, 0.9)',
      text: '#f1f5f9',
      textLight: '#cbd5e1'
    };
  }

  // 🎨 COULEURS MÉDITERRANÉENNES
  if (text.includes('méditerranéen') || text.includes('italien') || text.includes('grec')) {
    return {
      hasColors: true,
      primary: '#0ea5e9',
      secondary: '#0284c7',
      accent: '#38bdf8',
      background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)',
      surface: 'rgba(240, 249, 255, 0.9)',
      text: '#0c4a6e',
      textLight: '#075985'
    };
  }

  return defaultColors;
}

function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

export function downloadHTML(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}