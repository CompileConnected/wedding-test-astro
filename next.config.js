module.exports = {
    async headers() {
        return [
            {
                key: 'X-DNS-Prefetch-Control',
                value: 'on'
            },
            {
                key: 'X-XSS-Protection',
                value: '1; mode=block'
            },
            {
                key: 'X-Frame-Options',
                value: 'DENY'
            },
            {
                key: 'Strict-Transport-Security',
                value: 'max-age=63072000; includeSubDomains; preload'
            },
            {
                key: 'X-Content-Type-Options',
                value: 'nosniff'
            }
        ]
    }
}