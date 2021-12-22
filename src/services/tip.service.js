import base from './airtable.service'

const BASE_NAME = 'Tipp'

const tipService = {
  async getTipRecords () {
    return new Promise((resolve, reject) => {
      const allTips = []
      base(BASE_NAME)
        .select({
          // Selecting the first 3 records in All:
          view: 'published',
          fields: ['Title', 'Teaser', 'TeaserImage', 'Article', 'MaterialCategory'],
          sort: [{ field: 'Published', direction: 'desc' }]
        })
        .eachPage(
          function page (partialTips, fetchNextPage) {
            // This function (`page`) will get called for each page of records.
            partialTips.forEach((partialTip) => {
              allTips.push({
                id: partialTip?.id,
                title: partialTip?.fields?.Title,
                teaser: partialTip?.fields?.Teaser,
                teaserImage: partialTip?.fields?.TeaserImage,
                article: partialTip?.fields?.Article,
                materialCategory: partialTip?.fields?.MaterialCategory
              })
            })
            fetchNextPage()
          },
          function done (err) {
            if (err) {
              console.error(err)
              reject(err)
            }
            resolve(allTips)
          }
        )
    })
  },
  async getTip (id) {
    return new Promise((resolve, reject) => {
      base(BASE_NAME).find(id, function (err, record) {
        if (err) {
          console.error(err)
          reject(err)
        }
        const tip = {
          id: record.id,
          title: record.fields.Title,
          teaser: record.fields.Teaser,
          teaserImage: record?.fields?.TeaserImage,
          article: record.fields.Article,
          lang: record.fields.Lang,
          creationTime: record._rawJson?.createdTime
        }
        resolve(tip)
      })
    })
  }
}

export default tipService
