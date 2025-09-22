export function notFoundHandler(_req, res) {
  res.status(404).render('pages/404', { title: 'Introuvable' });
}

export function errorHandler(err, _req, res, _next) {
  console.error('[500]', err);
 
  if (res.headersSent) return;

  const errorId = Date.now().toString(36);
  res.status(500).render('pages/500', { title: 'Erreur serveur', errorId });
}
