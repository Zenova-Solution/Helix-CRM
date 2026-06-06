const cp = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default {
  output: "export",
  trailingSlash: true,
  basePath: cp,
  assetPrefix: cp || undefined,
  images: { unoptimized: true },
};
