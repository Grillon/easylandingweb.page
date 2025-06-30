import { TemplateType } from '../components/TemplateSelector';

export interface TemplateStyles {
  fontImport: string;
  bodyFont: string;
  titleFont: string;
  backgroundColor: string;
  textColor: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  headerBackground: string;
  sectionBackground: string;
  taglineBackground: string;
  infoBackground: string;
  footerBackground: string;
  footerTextColor: string;
  heroOverlay: string;
  titleAnimation: string;
  taglineAnimation: string;
  imageAnimation: string;
  socialAnimation: string;
  additionalCSS: string;
}

export function getTemplateStyles(template: TemplateType, darkMode: boolean = false): TemplateStyles {
  const baseStyles = getBaseTemplateStyles(template);
  
  if (darkMode) {
    return applyDarkMode(baseStyles, template);
  }
  
  return baseStyles;
}

function getBaseTemplateStyles(template: TemplateType): TemplateStyles {
  switch (template) {
    case 'zen':
      return {
        fontImport: '<link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500&family=Lora:wght@400;500&display=swap" rel="stylesheet">',
        bodyFont: "'Noto Sans', system-ui, sans-serif",
        titleFont: "'Lora', serif",
        backgroundColor: '#f9f9f6',
        textColor: '#2c2c2c',
        primaryColor: '#3A5A40',
        secondaryColor: '#4a6741',
        accentColor: '#8a9a8d',
        headerBackground: '#f9f9f6',
        sectionBackground: '#f9f9f6',
        taglineBackground: 'rgba(249, 249, 246, 0.95)',
        infoBackground: 'rgba(255, 255, 255, 0.7)',
        footerBackground: '#f5f5f2',
        footerTextColor: '#3A5A40',
        heroOverlay: 'linear-gradient(45deg, rgba(58, 90, 64, 0.05) 0%, rgba(138, 154, 141, 0.03) 50%, rgba(74, 103, 65, 0.05) 100%)',
        titleAnimation: '',
        taglineAnimation: '',
        imageAnimation: '',
        socialAnimation: '',
        additionalCSS: `
          /* Style minimaliste japonais */
          body {
            font-weight: 300;
            letter-spacing: 0.3px;
          }
          
          .title-section {
            padding: 4rem 2rem 3rem !important;
            background: #f9f9f6 !important;
            position: relative;
          }
          
          .title-section h1 {
            font-weight: 400 !important;
            text-shadow: none !important;
            letter-spacing: 1px !important;
            margin-bottom: 0 !important;
          }
          
          .hero {
            height: 60vh !important;
            border-radius: 0 !important;
          }
          
          .tagline {
            background: rgba(249, 249, 246, 0.95) !important;
            border: 1px solid rgba(58, 90, 64, 0.15) !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            backdrop-filter: none !important;
            font-weight: 300 !important;
            padding: 3rem 2rem !important;
            margin: 4rem auto !important;
            max-width: 600px !important;
          }
          
          .gallery-section {
            background: #f9f9f6 !important;
            padding: 5rem 3rem !important;
            margin: 0 !important;
          }
          
          .gallery-section::before,
          .gallery-section::after {
            display: none !important;
          }
          
          .gallery-title {
            font-weight: 400 !important;
            text-shadow: none !important;
            margin-bottom: 3rem !important;
            letter-spacing: 0.5px !important;
          }
          
          .gallery {
            gap: 3rem !important;
            max-width: 1000px !important;
          }
          
          .gallery img {
            border-radius: 0 !important;
            border: none !important;
            box-shadow: none !important;
            transition: opacity 0.3s ease !important;
          }
          
          .gallery img:hover {
            transform: none !important;
            box-shadow: none !important;
            opacity: 0.8 !important;
          }
          
          .info {
            background: rgba(255, 255, 255, 0.7) !important;
            border: 1px solid rgba(58, 90, 64, 0.1) !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            padding: 4rem 3rem !important;
            margin: 4rem auto !important;
            max-width: 700px !important;
          }
          
          .info-title {
            font-weight: 400 !important;
            text-shadow: none !important;
            margin-bottom: 3rem !important;
            letter-spacing: 0.5px !important;
          }
          
          .info p {
            font-weight: 300 !important;
            line-height: 1.8 !important;
            margin: 2rem 0 !important;
          }
          
          .info strong {
            font-weight: 400 !important;
          }
          
          .map-container iframe {
            border-radius: 0 !important;
            border: 1px solid rgba(58, 90, 64, 0.2) !important;
            box-shadow: none !important;
          }
          
          .socials {
            gap: 2rem !important;
            margin-bottom: 3rem !important;
          }
          
          .social-link {
            border-radius: 0 !important;
            font-weight: 400 !important;
            box-shadow: none !important;
            border: 1px solid rgba(255, 255, 255, 0.3) !important;
            padding: 1rem 2rem !important;
            text-transform: none !important;
            letter-spacing: 0.3px !important;
          }
          
          .social-link:hover {
            transform: none !important;
            box-shadow: none !important;
            opacity: 0.8 !important;
          }
          
          footer {
            background: #f5f5f2 !important;
            padding: 4rem 2rem !important;
            margin-top: 0 !important;
          }
          
          footer::before {
            display: none !important;
          }
          
          .footer-content p {
            font-weight: 300 !important;
            text-shadow: none !important;
            color: #3A5A40 !important;
            letter-spacing: 0.3px !important;
          }
          
          /* Responsive pour le style zen */
          @media (max-width: 768px) {
            .title-section {
              padding: 3rem 1.5rem 2rem !important;
            }
            
            .gallery-section {
              padding: 4rem 1.5rem !important;
            }
            
            .info {
              padding: 3rem 2rem !important;
              margin: 3rem 1rem !important;
            }
            
            .tagline {
              padding: 2.5rem 1.5rem !important;
              margin: 3rem 1rem !important;
            }
          }
        `
      };

    case 'street-food':
      return {
        fontImport: '<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Open+Sans:wght@400;500;600&display=swap" rel="stylesheet">',
        bodyFont: "'Open Sans', system-ui, sans-serif",
        titleFont: "'Fredoka', cursive",
        backgroundColor: '#fff8e1',
        textColor: '#2e2e2e',
        primaryColor: '#ff5722',
        secondaryColor: '#f4511e',
        accentColor: '#ffc107',
        headerBackground: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
        sectionBackground: 'linear-gradient(135deg, #ffe0b2 0%, #fff3e0 100%)',
        taglineBackground: 'rgba(255, 243, 224, 0.9)',
        infoBackground: 'rgba(255, 255, 255, 0.9)',
        footerBackground: 'linear-gradient(135deg, #bf360c 0%, #d84315 100%)',
        footerTextColor: '#fff3e0',
        heroOverlay: 'linear-gradient(45deg, rgba(255, 87, 34, 0.15) 0%, rgba(255, 193, 7, 0.1) 50%, rgba(244, 81, 30, 0.15) 100%)',
        titleAnimation: 'animation: streetBounce 2s ease-in-out infinite;',
        taglineAnimation: '',
        imageAnimation: '',
        socialAnimation: 'animation: streetPulse 3s ease-in-out infinite;',
        additionalCSS: `
          @keyframes streetBounce {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-5px); }
          }
          
          @keyframes streetPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          
          .title-section {
            position: relative;
            overflow: hidden;
          }
          
          .title-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="street-pattern" width="30" height="30" patternUnits="userSpaceOnUse"><rect x="0" y="0" width="15" height="15" fill="%23ff5722" opacity="0.05"/><rect x="15" y="15" width="15" height="15" fill="%23ffc107" opacity="0.05"/></pattern></defs><rect width="100" height="100" fill="url(%23street-pattern)"/></svg>');
            pointer-events: none;
          }
          
          .title-section h1 {
            text-shadow: 3px 3px 0px rgba(255, 193, 7, 0.3), 6px 6px 0px rgba(255, 87, 34, 0.2) !important;
          }
          
          .gallery img {
            border-radius: 15px !important;
            border: 3px solid #ffc107 !important;
            box-shadow: 0 8px 20px rgba(255, 87, 34, 0.3) !important;
            transform: rotate(-1deg);
          }
          
          .gallery img:nth-child(even) {
            transform: rotate(1deg);
          }
          
          .gallery img:hover {
            transform: rotate(0deg) scale(1.05) !important;
            box-shadow: 0 15px 35px rgba(255, 87, 34, 0.4) !important;
          }
          
          .social-link {
            border-radius: 25px !important;
            font-weight: 600 !important;
            text-transform: uppercase !important;
            letter-spacing: 0.5px !important;
            border: 2px solid rgba(255, 255, 255, 0.3) !important;
          }
          
          .info {
            border-radius: 20px !important;
            border: 3px solid rgba(255, 193, 7, 0.5) !important;
            box-shadow: 0 10px 30px rgba(255, 87, 34, 0.2) !important;
          }
          
          .tagline {
            border-radius: 20px !important;
            border: 3px solid rgba(255, 193, 7, 0.6) !important;
            font-weight: 500 !important;
            box-shadow: 0 8px 25px rgba(255, 87, 34, 0.2) !important;
          }
          
          .map-container iframe {
            border-radius: 15px !important;
            border: 3px solid #ffc107 !important;
          }
        `
      };

    case 'simple':
    default:
      return {
        fontImport: '<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Quicksand:wght@300;400;500;600&display=swap" rel="stylesheet">',
        bodyFont: "'Quicksand', system-ui, sans-serif",
        titleFont: "'Playfair Display', serif",
        backgroundColor: '#fff',
        textColor: '#333',
        primaryColor: '#8b4513',
        secondaryColor: '#6b4423',
        accentColor: '#daa520',
        headerBackground: 'linear-gradient(135deg, #fef9f3 0%, #ffe5b4 100%)',
        sectionBackground: 'linear-gradient(135deg, #ffe5b4 0%, #fef9f3 100%)',
        taglineBackground: 'rgba(254, 249, 243, 0.8)',
        infoBackground: 'rgba(254, 249, 243, 0.5)',
        footerBackground: 'linear-gradient(135deg, #2c1810 0%, #1a0f0a 100%)',
        footerTextColor: '#f5f5dc',
        heroOverlay: 'linear-gradient(45deg, rgba(139, 69, 19, 0.15) 0%, rgba(218, 165, 32, 0.1) 50%, rgba(139, 69, 19, 0.15) 100%)',
        titleAnimation: '',
        taglineAnimation: '',
        imageAnimation: '',
        socialAnimation: '',
        additionalCSS: ''
      };
  }
}

function applyDarkMode(baseStyles: TemplateStyles, template: TemplateType): TemplateStyles {
  switch (template) {
    case 'zen':
      return {
        ...baseStyles,
        backgroundColor: '#1a1a1a',
        textColor: '#e0e0e0',
        primaryColor: '#7fb069',
        secondaryColor: '#6a9c5a',
        accentColor: '#a8b5a8',
        headerBackground: '#1a1a1a',
        sectionBackground: '#1a1a1a',
        taglineBackground: 'rgba(26, 26, 26, 0.95)',
        infoBackground: 'rgba(40, 40, 40, 0.7)',
        footerBackground: '#0f0f0f',
        footerTextColor: '#7fb069',
        heroOverlay: 'linear-gradient(45deg, rgba(127, 176, 105, 0.1) 0%, rgba(168, 181, 168, 0.05) 50%, rgba(106, 156, 90, 0.1) 100%)',
        additionalCSS: baseStyles.additionalCSS.replace(/#f9f9f6/g, '#1a1a1a').replace(/#f5f5f2/g, '#0f0f0f').replace(/rgba\(255, 255, 255, 0\.7\)/g, 'rgba(40, 40, 40, 0.7)').replace(/#3A5A40/g, '#7fb069')
      };

    case 'street-food':
      return {
        ...baseStyles,
        backgroundColor: '#1a1a1a',
        textColor: '#e0e0e0',
        primaryColor: '#ff7043',
        secondaryColor: '#ff5722',
        accentColor: '#ffb74d',
        headerBackground: 'linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 100%)',
        sectionBackground: 'linear-gradient(135deg, #1a1a1a 0%, #2c2c2c 100%)',
        taglineBackground: 'rgba(44, 44, 44, 0.9)',
        infoBackground: 'rgba(60, 60, 60, 0.9)',
        footerBackground: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)',
        footerTextColor: '#ffb74d',
        heroOverlay: 'linear-gradient(45deg, rgba(255, 112, 67, 0.2) 0%, rgba(255, 183, 77, 0.15) 50%, rgba(255, 87, 34, 0.2) 100%)'
      };

    case 'simple':
    default:
      return {
        ...baseStyles,
        backgroundColor: '#1a1a1a',
        textColor: '#e0e0e0',
        primaryColor: '#d4a574',
        secondaryColor: '#c19660',
        accentColor: '#f4d03f',
        headerBackground: 'linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 100%)',
        sectionBackground: 'linear-gradient(135deg, #1a1a1a 0%, #2c2c2c 100%)',
        taglineBackground: 'rgba(44, 44, 44, 0.8)',
        infoBackground: 'rgba(60, 60, 60, 0.5)',
        footerBackground: 'linear-gradient(135deg, #0f0f0f 0%, #000000 100%)',
        footerTextColor: '#f4d03f',
        heroOverlay: 'linear-gradient(45deg, rgba(212, 165, 116, 0.15) 0%, rgba(244, 208, 63, 0.1) 50%, rgba(193, 150, 96, 0.15) 100%)'
      };
  }
}