import type Event  from '@/types/event'
import base from './airtable.service'
import { toast } from 'vuetify-sonner'

const BASE_NAME = 'Problemstoffmobil'

const problemstoffmobilService = {
  async getEventRecords (): Promise<Array<Event>> {
    return new Promise((resolve, reject) => {
      const allRecords: Array<Event> = []
      base(BASE_NAME)
        .select({
          view: 'public'
        })
        .eachPage(
          function page (partialRecords, fetchNextPage) {
            // This function (`page`) will get called for each page of records.
            partialRecords.forEach((partialRecord) => {
              allRecords.push({
                id: partialRecord.id,
                date: partialRecord.get('DATUM') as string,
                municipality: partialRecord.get('GEMEINDE') as string,
                district: partialRecord.get('ORTSTEIL') as string,
                timeFrom: partialRecord.get('VON UHR') as string,
                timeTo: partialRecord.get('BIS UHR') as string,
                collectionPoint: partialRecord.get('SAMMELSTELLE') as string
              })
            })
            // To fetch the next page of records, call `fetchNextPage`.
            // If there are more records, `page` will get called again.
            // If there are no more records, `done` will get called.
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
            resolve(allRecords)
          }
        )
    })
  }
}

export default problemstoffmobilService
