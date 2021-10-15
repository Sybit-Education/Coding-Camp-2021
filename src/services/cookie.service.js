const MINUTES = 60
const MULTIPLIER = 1000

export function setCookie (cookieName, cookieValue, minutesTillExpiration) {
  const date = new Date()
  date.setTime(date.getTime() + (minutesTillExpiration * MINUTES * MULTIPLIER))
  const expires = 'expires=' + date.toUTCString()
  document.cookie = cookieName + '=' + cookieValue + ';' + expires + ';path=/'
}

export function getCookie (cookieKey) {
  const result = document.cookie
    .split(';')
    .map(convertPlainCookiesToKeyValue)
    .find(getCookieByCookieKey)
  if (!result) {
    return
  }
  return result[1]

  function convertPlainCookiesToKeyValue (entry) {
    return entry.split('=')
  }

  function getCookieByCookieKey ([currentCookieKey]) {
    return currentCookieKey.trim() === cookieKey
  }
}
