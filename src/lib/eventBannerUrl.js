const fallbackBanner = "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1500";

function isWebUrl(url) {
  return url && ["http:", "https:"].includes(url.protocol) && !url.username && !url.password;
}

export function eventBannerUrl(bannerImage, assetBase = import.meta.env.VITE_EVENT_BANNER_BASE_URL) {
  const banner = typeof bannerImage === "string" ? bannerImage.trim() : "";
  if (!banner || banner === "test.jpg") return fallbackBanner;

  const absolute = URL.parse(banner);
  if (absolute) return isWebUrl(absolute) ? absolute.href : fallbackBanner;

  const directory = assetBase ? URL.parse(assetBase.trim()) : null;
  if (!isWebUrl(directory) || directory.search || directory.hash) return fallbackBanner;

  // Filenames are relative to the configured directory. Rooted paths use its origin.
  if (!directory.pathname.endsWith("/")) directory.pathname += "/";
  const resolved = URL.parse(banner, directory);
  return resolved?.origin === directory.origin ? resolved.href : fallbackBanner;
}
