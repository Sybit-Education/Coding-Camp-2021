import type Tip  from '@/types/tip'
import base from './airtable.service'
import { toast } from 'vuetify-sonner'
import { Attachment } from 'airtable'

const BASE_NAME = 'Tipp'

const tipService = {
  async getTipRecords (): Promise<Array<Tip>> {
    return new Promise((resolve, reject) => {
      const allTips: Array<Tip> = []
      base(BASE_NAME)
        .select({
          // Selecting the first 3 records in All:
          view: 'published',
          fields: ['Title', 'Teaser', 'TeaserImage', 'ImageSource', 'Article', 'MaterialCategory'],
          sort: [{ field: 'Published', direction: 'desc' }]
        })
        .eachPage(
          function page (partialTips, fetchNextPage) {
            // This function (`page`) will get called for each page of records.
            partialTips.forEach((partialTip) => {
              const item: Tip = {
                id: partialTip.id,
                title: partialTip.fields?.Title as string,
                teaser: partialTip.fields?.Teaser as string,
                teaserImage: partialTip.fields?.TeaserImage as Array<Attachment>,
                teaserImageSource: partialTip.fields?.ImageSource as string,
                article: partialTip.fields?.Article as string,
                materialCategory: partialTip.fields?.MaterialCategory as Array<string>,
                creationTime: partialTip._rawJson?.createdTime as string,
              }
              allTips.push(item)
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
            resolve(allTips)
          }
        )
    })
  },
  async getTip (id: string): Promise<Tip> {
    return new Promise((resolve, reject) => {
      base(BASE_NAME).find(id, function (err, record) {
        if (err) {
          console.error(err)
          reject(err)
        }
        if (!record) {
          reject(new Error('No record found'))
        } else {
          const tip: Tip = {
            id: record.id,
            title: record.fields.Title as string,
            teaser: record.fields.Teaser as string,
            teaserImage: record?.fields?.TeaserImage as Array<any>,
            teaserImageSource: record?.fields?.ImageSource as string,
            article: record.fields.Article as string,
            materialCategory: record.fields?.MaterialCategory as Array<string>,
            creationTime: record._rawJson?.createdTime as string,
          }
          resolve(tip)
        }

      })
    })
  }
}

export default tipService
