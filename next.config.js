/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
}

/* const ContentSecurityPolicy = `font-src data: https://* http://*` */

module.exports = nextConfig;

/* async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/(.*)',
        headers:[  
          {
            key: 'Content-Security-Policy',
            value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
          }
        ]
      },
    ]
  } */