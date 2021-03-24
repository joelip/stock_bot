export function buildCookieStringToObject(cookieString) {
  var cookies = {};
  const arrayOfCookieKeyValPairs = cookieString.split('; ');

  arrayOfCookieKeyValPairs.forEach((keyValString) => {
    const [key, value] = keyValString.split('=');
    cookies[key] = value;
  });

  return cookies;
}
