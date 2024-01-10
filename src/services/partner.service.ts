import Partner from '@/types/partner'
import base from './airtable.service'
import { toast } from 'vuetify-sonner'
import { Attachment } from 'airtable'

const partnerService = {
  async getPartnerRecords (): Promise<Array<Partner>> {
    return new Promise((resolve, reject) => {
      const allRecords = Array<Partner>()
      base('Partner')
        .select({
          view: 'published',
          fields: ['Name', 'Notes', 'Logo', 'Website'],
          sort: [{ field: 'Name', direction: 'asc' }]
        })
        .eachPage(
          function page (partialRecords, fetchNextPage) {
            // This function (`page`) will get called for each page of records.
            partialRecords.forEach((partialRecord) => {
              allRecords.push({
                id: partialRecord.id,
                name: partialRecord?.fields.Name as string,
                notes: partialRecord?.fields?.Notes as string,
                logo: partialRecord?.fields?.Logo as Array<Attachment>,
                website: partialRecord?.fields?.Website as string
              })
            })
            // To fetch the next page of records, call `fetchNextPage`.
            // If there are more records, `page` will get called again.
            // If there are no more records, `done` will get called.
            fetchNextPage()
          },
          function done (err: Error) {
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
            resolve(allRecords)
          }
        )
    })
  }
}

export default partnerService
