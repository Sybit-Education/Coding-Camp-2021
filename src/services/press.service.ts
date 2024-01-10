import { toast } from 'vuetify-sonner'
import base from './airtable.service'
import type Press from '@/types/press'

const BASE_NAME = 'Presse'

const pressService = {
  async getPressRecords (): Promise<Array<Press>> {
    return new Promise((resolve, reject) => {
      const allItems = Array<Press>()
      base(BASE_NAME)
        .select({
          // Selecting the first 3 records in All:
          view: 'published',
          fields: ['title', 'teaser', 'source', 'published', 'link'],
          sort: [{ field: 'published', direction: 'desc' }]
        })
        .eachPage(
          function page (partials, fetchNextPage) {
            // This function (`page`) will get called for each page of records.
            partials.forEach((item) => {
              allItems.push({
                id: item?.id,
                title: item.fields?.title as string,
                teaser: item.fields?.teaser as string,
                source: item.fields?.source as string,
                published: item.fields?.published as string,
                link: item.fields?.link as string
              })
            })
            fetchNextPage()
          },
          function done (err) {
            if (err) {
              console.error(err)
              toast("Kommunikationsfehler", {
                description: err.message,
                cardProps: {
                  color: 'error',
                }
              })
              reject(err)
            }
            resolve(allItems)
          }
        )
    })
  }
}

export default pressService
