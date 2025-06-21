const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:3001',
            changeOrigin: true,
        })
    );

    app.use(
        '/admin',
        createProxyMiddleware({
            target: 'http://localhost:3001',
            changeOrigin: true,
        })
    );

    // Не проксируем статические файлы
    app.use(
        createProxyMiddleware(['/favicon.ico', '/manifest.json'], {
            target: 'http://localhost:3001',
            changeOrigin: true,
        })
    );
};