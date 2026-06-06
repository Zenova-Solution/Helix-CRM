const isGithub = process.env.GITHUB_PAGES === 'true';
const bp = isGithub ? (process.env.NEXT_PUBLIC_BASE_PATH || '') : '';

export default {
  output: 'export',
  trailingSlash: true,
  basePath: bp,
  assetPrefix: bp || undefined,
  images: { unoptimized: true },
};
