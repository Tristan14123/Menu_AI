if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const swPath = import.meta.env.DEV ? '/service-worker.js' : '/Menu_AI/service-worker.js';
    navigator.serviceWorker.register(swPath)
      .then(reg => console.log('Service Worker enregistré', reg))
      .catch(err => console.error('Erreur Service Worker', err));
  });
}
