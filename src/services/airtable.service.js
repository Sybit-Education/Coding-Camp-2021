import { getCookie } from './cookie.service'
import store from '../store/index'
import Airtable from 'airtable'

export const base = new Airtable({
  apiKey: `${process.env.VUE_APP_AIRTABLE_TOKEN}`
}).base('appWyEiPQWXPnV3sD')

export function getRecordsFromSessionStorage (key) {
  const cookie = getCookie('recordsExpiryCookie')
  if (cookieIsValid()) {
    const itemStr = sessionStorage.getItem(key)
    // if the item doesn't exist, return null
    if (!itemStr) {
      return
    }
    return JSON.parse(itemStr)
  }
  sessionStorage.clear()
  store.dispatch('getMaterialAndTargets')

  function cookieIsValid () {
    return cookie !== '' && cookie !== undefined && cookie !== null
  }
}

export default base
