# sIDE-Frontend

sIDE-Frontend is the frontend application for sIDE — a lightweight, browser-based source code editor / IDE. This repository contains the UI, editor integration, and client-side features that allow users to write, run, and debug code in the sIDE platform.

---

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Quick start](#quick-start)
- [Project structure](#project-structure)
- [Deployments](#deployments)
- [Contact](#contact)

---

## Features

- Rich text/code editor integration (Monaco) with features like auto-save
- Syntax highlighting and auto-complete support
- File explorer and workspace management
- Multi-language support
- Code upload/download
- Code sharing

---

## Tech stack


- Framework: ReactJS
- Language: JavaScript
- Build tool: Create React App
- Editor integration: Monaco Editor
- State management: Context API
- Styling: CSS Modules / Bootstrap

---

## Getting started

### Prerequisites

- Node.js >= 16 (or the version used in this repo)
- npm >= 8

### Quick start

1. Clone the repository  
   ```bash
   git clone https://github.com/soham1260/sIDE-Frontend.git
   cd sIDE-Frontend
   ```

2. Install dependencies 
     ```bash
     npm install
     ```

3. Start the server  
     ```bash
     npm start
     ```

5. Open your browser  
   Visit http://localhost:3000 (or the URL printed by the dev server)

---

## Project structure

- public/ — static assets
- src/
  - assets/ — images, fonts
  - components/ — reusable UI components
  - data/ — default snippets
- package.json — scripts & dependencies

---

## Deployments

- Static hosting: Vercel / Netlify / GitHub Pages (for SPA)
- Containerized: Docker image pushed to registry
- CI/CD: GitHub Actions / other pipeline

Example: Build and deploy to Netlify or Vercel by connecting the repo and pointing the build command to `npm run build` and the output directory to `dist` (or `build`).

---


## Contact

Maintainer: 1260soham@gmail.com

---