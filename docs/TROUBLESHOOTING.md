# 🛠️ CodeQuest 2.3 - Guide de dépannage

## 🚨 Problèmes fréquents et solutions

### 1. Installation Node.js

#### ❌ Erreur: "node n'est pas reconnu comme commande"
**Cause**: Node.js n'est pas installé ou pas dans le PATH

**Solutions**:
```bash
# Windows
# 1. Télécharger depuis https://nodejs.org (version LTS 18+)
# 2. Relancer PowerShell après installation
# 3. Vérifier:
node --version

# Mac/Linux
# Via homebrew (Mac):
brew install node
# Via apt (Ubuntu/Debian):
sudo apt update && sudo apt install nodejs npm
```

#### ❌ Version Node.js trop ancienne
**Symptôme**: `Node.js v14.x.x trop ancien (besoin >= 16)`

**Solution**:
```bash
# Windows: télécharger nouvelle version sur nodejs.org
# Mac: brew upgrade node
# Linux: 
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

---

### 2. Problèmes de permissions

#### ❌ Windows: "Execution Policy restrictive"
**Symptôme**: Scripts PowerShell bloqués

**Solution**:
```powershell
# Ouvrir PowerShell en Admin
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
# Confirmer avec 'Y'
```

#### ❌ Mac/Linux: "Permission denied"
**Symptôme**: Impossible d'exécuter les scripts

**Solution**:
```bash
# Donner permissions d'exécution
chmod +x scripts/*.js
chmod +x setup.sh
```

#### ❌ "EACCES" lors de npm install
**Symptôme**: Erreur permissions sur node_modules

**Solution**:
```bash
# Windows (PowerShell Admin)
npm install

# Mac/Linux (éviter sudo si possible)
npm config set prefix ~/.npm
export PATH=~/.npm/bin:$PATH
npm install
```

---

### 3. Problèmes de port

#### ❌ "Port 3000 déjà utilisé"
**Symptôme**: EADDRINUSE lors du démarrage

**Solutions**:
```bash
# Solution 1: Trouver et tuer le processus
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :3000
kill -9 <PID>

# Solution 2: Utiliser un autre port
PORT=3001 npm run control-room
```

---

### 4. Antivirus et pare-feu

#### ❌ Windows Defender bloque les fichiers
**Symptôme**: Fichiers supprimés ou quarantaine

**Solutions**:
1. Ajouter une exclusion dans Windows Defender:
   - Paramètres → Mise à jour et sécurité → Sécurité Windows
   - Protection contre les virus → Gérer les paramètres
   - Exclusions → Ajouter le dossier CodeQuest

2. Temporairement désactiver la protection temps réel pendant l'installation

#### ❌ Pare-feu bloque localhost:3000
**Symptôme**: Page ne charge pas malgré serveur démarré

**Solution**:
- Autoriser Node.js dans le pare-feu
- Windows: une popup devrait apparaître au premier lancement
- Accepter "Réseaux privés"

---

### 5. Problèmes de chemins

#### ❌ Espaces dans les chemins (Windows)
**Symptôme**: Erreurs "file not found" avec chemins tronqués

**Solution**:
```bash
# MAUVAIS: C:\Users\Jean Dupont\CodeQuest
# BON: C:\CodeQuest ou C:\Users\JeanDupont\CodeQuest

# Si impossible de changer:
cd "C:\Users\Jean Dupont\CodeQuest"  # Guillemets obligatoires
```

#### ❌ Caractères spéciaux dans chemins
**Symptôme**: Erreurs parsing ou encoding

**Solution**:
- Éviter: é, è, à, ç, &, #, @ dans les chemins
- Utiliser: lettres, chiffres, -, _

---

### 6. Problèmes Git

#### ❌ "git n'est pas reconnu"
**Note**: Git est optionnel mais recommandé

**Installation**:
```bash
# Windows: https://git-scm.com/download/win
# Mac: xcode-select --install
# Linux: sudo apt install git
```

#### ❌ "Please tell me who you are"
**Solution**:
```bash
git config --global user.name "Votre Nom"
git config --global user.email "email@example.com"
```

---

### 7. Problèmes d'affichage

#### ❌ Emojis ne s'affichent pas (Windows)
**Cause**: Terminal ne supporte pas UTF-8

**Solutions**:
1. Utiliser Windows Terminal (recommandé)
2. PowerShell: `chcp 65001`
3. Utiliser Git Bash

#### ❌ Interface Control Room cassée
**Symptôme**: CSS/JS ne charge pas

**Solutions**:
1. Vider cache navigateur (Ctrl+Shift+R)
2. Essayer autre navigateur (Chrome/Firefox/Edge)
3. Vérifier console navigateur (F12)

---

### 8. Problèmes spécifiques OS

#### 🪟 Windows

**WSL (Windows Subsystem for Linux)**:
```bash
# Si utilisation WSL, attention aux chemins
# Accéder à C:\ depuis WSL:
cd /mnt/c/CodeQuest

# Problème de performance sur /mnt/c:
# Copier dans home WSL:
cp -r /mnt/c/CodeQuest ~/CodeQuest
```

**Antivirus tiers** (Avast, Norton, etc.):
- Ajouter exclusion pour dossier CodeQuest
- Désactiver scan temps réel pendant installation

#### 🍎 macOS

**Gatekeeper bloque exécution**:
```bash
# Si "impossible d'ouvrir car développeur non identifié"
xattr -d com.apple.quarantine scripts/*.js
```

**Rosetta pour M1/M2**:
```bash
# Si problèmes avec packages natifs
arch -x86_64 npm install
```

#### 🐧 Linux

**Problème de build-essential**:
```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install build-essential

# Fedora
sudo dnf groupinstall "Development Tools"
```

---

### 9. Mode offline

#### ❌ "Cannot find module"
**Cause**: Dependencies manquantes en offline

**Solution**:
1. Utiliser le kit offline complet
2. Décompresser node_modules.tar.gz fourni
3. Ou copier node_modules depuis installation fonctionnelle

#### ❌ CDN non accessible
**Solution**: Tous les assets sont locaux, pas besoin de réseau

---

### 10. Debug avancé

#### 📊 Diagnostic complet
```bash
# Lancer le smoke test
npm run smoke-test

# Vérifier environnement
node -v && npm -v && git --version

# Tester serveur minimaliste
node -e "require('http').createServer((req,res)=>res.end('OK')).listen(3000,()=>console.log('Test OK sur :3000'))"
```

#### 📝 Logs détaillés
```bash
# Mode verbose
DEBUG=* npm run control-room

# Logs dans fichier
npm run control-room 2>&1 | tee debug.log
```

#### 🔍 Vérifier intégrité
```bash
# Lister fichiers critiques
ls -la src/cli/cli-v2.js
ls -la control-room/roadmap.html
ls -la levels/act-1/

# Vérifier permissions
find . -type f -name "*.js" ! -perm -644 -ls
```

---

## 💡 Tips de dépannage

### Ordre de résolution recommandé:
1. **Smoke test** d'abord: `npm run smoke-test`
2. **Vérifier versions**: Node.js 16+, npm 7+
3. **Permissions**: Admin/sudo si nécessaire
4. **Ports**: Libérer 3000 ou changer
5. **Antivirus**: Exclusions si nécessaire
6. **Reinstall** propre si échec:
   ```bash
   rm -rf node_modules package-lock.json
   npm cache clean --force
   npm install
   ```

### En cas d'urgence en classe:
1. **Plan B**: Utiliser la version démo en ligne
2. **Plan C**: Partager un poste fonctionnel
3. **Plan D**: Mode "papier" avec les énoncés imprimés

---

## 📞 Support

### Canaux d'aide:
- **Issues GitHub**: github.com/codequest/issues
- **Wiki**: github.com/codequest/wiki
- **Email formateur**: support@codequest.dev

### Informations à fournir:
```bash
# Générer rapport de diagnostic
npm run diagnostic > rapport.txt 2>&1

# Inclure:
# - OS et version
# - Node.js version
# - Message d'erreur complet
# - Étapes reproduire
# - Solutions tentées
```

---

## ✅ Checklist pré-cours

**La veille:**
- [ ] Node.js 16+ installé
- [ ] Git installé (optionnel)
- [ ] CodeQuest téléchargé et décompressé
- [ ] `npm install` réussi
- [ ] `npm run smoke-test` tout vert
- [ ] `npm run control-room` accessible sur http://localhost:3000

**Le jour J:**
- [ ] Arriver 30min avant pour setup
- [ ] Tester un poste "cobaye"
- [ ] Préparer clés USB avec kit offline
- [ ] Avoir ce guide sous la main
- [ ] Numéro support dans téléphone

---

*Document maintenu par l'équipe CodeQuest - Dernière mise à jour: 2024*