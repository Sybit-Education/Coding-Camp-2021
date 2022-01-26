import Airtable from 'airtable'

export const base = new Airtable({
  apiKey: `${process.env.VUE_APP_AIRTABLE_TOKEN}`
}).base('appWyEiPQWXPnV3sD')

export default base
