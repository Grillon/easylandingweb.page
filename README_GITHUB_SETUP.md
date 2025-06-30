# Configuration GitHub OAuth

## Étapes pour configurer l'authentification GitHub

### 1. Créer une application GitHub OAuth

1. Allez sur [GitHub Developer Settings](https://github.com/settings/developers)
2. Cliquez sur "New OAuth App"
3. Remplissez les informations :
   - **Application name** : EasyLandingWeb
   - **Homepage URL** : `http://localhost:5173` (pour le développement)
   - **Authorization callback URL** : `http://localhost:5173`
   - **Application description** : Générateur de landing pages pour restaurants

### 2. Récupérer les clés

Après avoir créé l'application, vous obtiendrez :
- **Client ID** : À utiliser dans `REACT_APP_GITHUB_CLIENT_ID`
- **Client Secret** : À utiliser côté serveur uniquement

### 3. Configuration pour la production

Pour la production, vous devrez :

1. **Créer un backend API** pour gérer l'échange du code OAuth contre un token
2. **Mettre à jour les URLs** dans les paramètres de l'application GitHub
3. **Sécuriser le client secret** côté serveur

### 4. Exemple d'endpoint backend (Node.js/Express)

```javascript
app.post('/api/auth/github', async (req, res) => {
  const { code } = req.body;
  
  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Authentication failed' });
  }
});
```

### 5. Permissions requises

L'application demande les permissions suivantes :
- `repo` : Pour créer et gérer les repositories
- `user:email` : Pour récupérer l'email de l'utilisateur

### 6. Fonctionnalités

Une fois configuré, les utilisateurs pourront :
- Se connecter avec leur compte GitHub
- Créer automatiquement un repository pour leur landing page
- Déployer sur GitHub Pages en un clic
- Mettre à jour leur site facilement

### 7. Mode démo

En attendant la configuration complète, l'application fonctionne en mode démo avec un utilisateur fictif pour tester les fonctionnalités.