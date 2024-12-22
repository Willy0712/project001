/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "buseuhfvqjhrdpyhubtg.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/pictures/**",
      },
    ],
  },
};

export default nextConfig;
