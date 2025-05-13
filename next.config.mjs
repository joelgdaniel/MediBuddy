/** @type {import('next').NextConfig} */
const nextConfig = {
    // (Optional) Export as a standalone site
    // See https://nextjs.org/docs/pages/api-reference/next-config-js/output#automatically-copying-traced-files
    output: 'standalone',
    
    // Indicate that these packages should not be bundled by webpack
    experimental: {
        serverComponentsExternalPackages: ['sharp', 'onnxruntime-node'],
        serverActions: {
            bodySizeLimit: '10mb',
        },
    },

    // Configure API and server settings
    api: {
        responseLimit: '8mb',
        bodyParser: {
            sizeLimit: '10mb',
        },
    },

    // Configure webpack for better performance
    webpack: (config, { dev, isServer }) => {
        // Optimize production builds
        if (!dev) {
            config.optimization.minimize = true;
        }
        return config;
    },

    // Configure images domain if needed
    images: {
        domains: ['localhost'],
        unoptimized: process.env.NODE_ENV !== 'production',
    },
};

export default nextConfig;
