function fullImageUrlPoster(urlPath) {
  if (!urlPath) {
    return "https://i.ibb.co/yhsG2tv/2149558760.jpg";
  }
  const baseUrl = "https://image.tmdb.org/t/p/w500";
  return baseUrl + urlPath;
}

function fullImageUrlBackdrop(urlPath) {
  if (!urlPath) {
    return null;
  }
  const baseUrl = "https://image.tmdb.org/t/p/original";
  return baseUrl + urlPath;
}

module.exports = {
  fullImageUrlPoster,
  fullImageUrlBackdrop,
};
