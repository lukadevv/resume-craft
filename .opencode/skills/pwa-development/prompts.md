# PWA Development Skill

Build Progressive Web Apps that work offline, install like native apps, and deliver fast, reliable experiences.

## Core PWA Requirements

The three pillars of PWA:
1. **HTTPS** - Required for service workers (localhost allowed for dev)
2. **Service Worker** - JavaScript running in background, enables offline/caching
3. **Web App Manifest** - JSON describing app metadata, enables installation

## Installability Criteria

Must have ALL of:
- HTTPS (or localhost for dev)
- Service worker with fetch handler
- Web app manifest with: name, icons (192px + 512px), start_url, display: standalone

## Web App Manifest

### Required Fields

```json
{
  "name": "Resume Craft",
  "short_name": "ResumeCraft",
  "description": "Build professional resumes with AI assistance",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "/icons/icon-512-maskable.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}
```

### Enhanced Manifest

```json
{
  "name": "Resume Craft",
  "short_name": "ResumeCraft",
  "description": "Build professional resumes with AI assistance",
  "start_url": "/?source=pwa",
  "scope": "/",
  "display": "standalone",
  "orientation": "portrait-primary",
  "background_color": "#ffffff",
  "theme_color": "#3367D6",
  "categories": ["productivity", "utilities"],
  "icons": [
    { "src": "/icons/icon-72.png", "sizes": "72x72", "type": "image/png" },
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-384.png", "sizes": "384x384", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "/icons/icon-maskable.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ],
  "shortcuts": [
    { "name": "New Resume", "short_name": "New", "description": "Create a new resume", "url": "/resume/new?source=shortcut" }
  ]
}
```

## Service Worker Patterns

### Basic Service Worker (Cache First)

```javascript
const CACHE_NAME = 'resume-craft-v1';
const STATIC_ASSETS = ['/', '/index.html', '/offline.html'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => 
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
      .catch(() => caches.match('/offline.html'))
  );
});
```

### Registration

```javascript
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
      console.log('SW registered:', registration.scope);
    } catch (error) {
      console.error('SW registration failed:', error);
    }
  });
}
```

## Caching Strategies

| Strategy | Use Case |
|----------|----------|
| Cache First | Static assets (CSS, JS, images) |
| Network First | API responses, dynamic content |
| Stale While Revalidate | Semi-static content (resumes, templates) |

## Offline Experience

### Offline Page

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Offline - Resume Craft</title>
</head>
<body>
  <h1>You're offline</h1>
  <p>Your resume is saved locally. Connect to sync.</p>
</body>
</html>
```

### Online/Offline Detection

```javascript
window.addEventListener('online', () => document.body.dataset.connectionStatus = 'online');
window.addEventListener('offline', () => document.body.dataset.connectionStatus = 'offline');
```

## Install Prompt

```javascript
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferredPrompt = e; });

async function installApp() {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  deferredPrompt = null;
}
```

## Testing Checklist

- [ ] Install prompt appears
- [ ] App loads when offline
- [ ] Cached pages display correctly
- [ ] Offline fallback for uncached routes
- [ ] Lighthouse PWA audit passes

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Missing maskable icon | Add "purpose": "maskable" |
| No offline fallback | Create offline.html and cache it |
| No update mechanism | Implement skipWaiting() + reload |

## Project Structure

```
public/
├── manifest.json
├── sw.js
├── offline.html
└── icons/
    ├── icon-192.png
    ├── icon-512.png
    └── icon-maskable.png
```
