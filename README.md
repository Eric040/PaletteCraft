# PaletteCraft
PaletteCraft génère des palettes à partir d’une couleur entrée (HEX ou input color). Modes clair/sombre, jeux complets : complémentaire, analogique, triadique, tétradique, scindée, monochrome, nuances. Copie HEX et historique local de 25 couleurs.

Live Demo : https://verdant-swan-21fe9e.netlify.app/

# PaletteCraft

PaletteCraft est une application front-end développée avec **React** et **TailwindCSS**.  
Elle génère automatiquement plusieurs types de palettes à partir d’une seule couleur fournie par l’utilisateur — via un input HEX ou un sélecteur color.

---

## Fonctionnalités

### Génération de palettes avancées
À partir d’une couleur, l’application génère :
- Palette **Complémentaire**
- Palette **Analogique**
- Palette **Triadique**
- Palette **Tétradique**
- Palette **Complémentaire scindée**
- Palette **Monochromatique**
- Palette **Nuances**

### ⚙️ Entrée utilisateur
- Saisie manuelle du **code HEX**
- Sélecteur intuitif via **input type="color"**

### 🌓 Mode Light / Dark
- Basculer entre les deux thèmes pour un confort visuel optimal.

### 📋 Copie rapide
- Chaque couleur générée peut être copiée d’un clic.

### 💾 Historique local
- Sauvegarde automatique des **25 dernières couleurs** entrées.
- Stockage via **LocalStorage**.

---

## 🧱 Stack technique

- **React + Vite**
- **TailwindCSS**
- **LocalStorage** pour la persistance
- **Color manipulation utils** (personnels)

---

## 📁 Structure du projet

src/
│── components/
│ ├── ColorCard.tsx
│ ├── PaletteGenerator.tsx
│ ├── Footer.tsx
│ ├── NavBar.tsx
│ ├── Theme.tsx
│── utils/
│ ├── colorUtils.js
│ ├── history.js
│── App.tsx
│── main.tsx
│── index.css


---

## ▶️ Installation

```bash
npm install
npm run dev


npm run build

🌍 Déploiement

Compatible avec :

Netlify

Vercel

GitHub Pages

Aucun backend, aucune configuration complexe.

✨ Auteur

Développé par M. Eric TOUMOUDAGOU — passionné de développement web et design UI/UX.
