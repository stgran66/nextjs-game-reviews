/** @type {import ('next').NextConfig} */
module.exports = {
  output: 'export',
  images: {
    loader: 'custom',
    loaderFile: './lib/loader.ts',
  },
};

function toRemotePattern(urlString) {
  const url = new URL(urlString);
  return {
    protocol: url.protocol.replace(':', ''),
    hostname: url.hostname,
    port: url.port,
    pathname: url.pathname,
  };
}
