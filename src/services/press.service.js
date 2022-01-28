import base from './airtable.service'

const BASE_NAME = 'Presse'

const pressService = {
  async getPressRecords () {
    return new Promise((resolve, reject) => {
      const allItems = []
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
                title: item.fields?.title,
                teaser: item.fields?.teaser,
                source: item.fields?.source,
                published: item.fields?.published,
                link: item.fields?.link
              })
            })
            fetchNextPage()
          },
          function done (err) {
            if (err) {
              console.error(err)
              reject(err)
            }
            resolve(allItems)
          }
        )
    })
  }
}

export default pressService
