# Internlog — Career & Skill Tracker

Internlog is a React and TypeScript single-page application for tracking internship applications, documenting skill development, and viewing career progress through a centralized dashboard.

It provides a simple way to manage internship application stages, maintain a skill journal, track learning hours, and review derived career-development statistics.

## ✨ Features

### 📊 Dashboard
- Overview of internship application progress
- Application pipeline distribution
- Weekly activity statistics
- Interview conversion rate
- Total learning hours
- Skill goal progress
- Learning suggestions based on current skill data
- 
 ## 🌐 Live Demo

https://internlog-coral.vercel.app

### 💼 Internship Tracker
- Add internship applications
- Edit internship details
- Delete internship records with confirmation
- Track application status through:
  - Applied
  - Shortlisted
  - Interview
  - Offer
  - Rejected
- One-click advancement through the application pipeline
- View application progress through the dashboard

### 📚 Skill Journal
- Add skills to your personal skill journal
- Organize skills by category
- Track proficiency using a 1–5 scale
- Record learning hours
- Filter skills by category
- View skill entries in a date-sorted timeline
- Delete skill entries with confirmation

### 👤 Profile
- Edit personal profile information
- Store profile changes locally
- Add LinkedIn and GitHub profile links
- Persist profile information across browser sessions

### 📦 Data Management
- Persistent browser-based storage using `localStorage`
- Defensive handling of stored JSON data
- Automatic migration from legacy storage keys
- Export profile, internship, and skill data as a JSON file

### 🎨 User Interface
- Responsive layout
- Dashboard-based navigation
- Animated splash screen
- Dark/light theme support
- Custom CSS animations
- Lucide icons
- Confirmation dialogs for destructive actions

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | Frontend UI |
| TypeScript 5 | Type-safe development |
| Vite 5 | Development and build tooling |
| Tailwind CSS 3 | Responsive styling |
| Lucide React | Icons |
| localStorage | Client-side data persistence |
| ESLint | Code quality and linting |

## 🏗️ Architecture

Internlog is a **frontend-only React SPA**.

The application uses shared TypeScript domain models and browser-based persistence rather than a backend or external database.

```text
User
  ↓
React UI Components
  ↓
Application State
  ↓
Internship / Skill Management
  ↓
localStorage
  ↓
Dashboard & Derived Analytics
