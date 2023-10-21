/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir:
    process.env.NODE_ENV !== "production"
      ? `.${process.env.NEXT_PUBLIC_BANK_CODE}-next`
      : ".next",
  experimental: {
    serverActions: true, //actions do lado servidor (mutations), propagação de alteração dos componentes que vão causar rerenderizações de forma instantanea, geranciado pelo next
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/bank-accounts",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
