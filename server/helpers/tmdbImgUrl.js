function fullImageUrlPoster(urlPath) {
  const baseUrl = "https://image.tmdb.org/t/p/w500/";
  return baseUrl + urlPath;
}

function fullImageUrlBackdrop(urlPath) {
  const baseUrl = "https://image.tmdb.org/t/p/original/";
  return baseUrl + urlPath;
}

module.exports = {
  fullImageUrlPoster,
  fullImageUrlBackdrop,
};
