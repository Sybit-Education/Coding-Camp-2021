import type Target from '@/types/target'
import base from './airtable.service'
import { toast } from 'vuetify-sonner'

const targetService = {
  async getTargetRecords (): Promise<Array<Target>> {
    return new Promise((resolve, reject) => {
      const allTargets: Array<Target> = []
      base('Target')
        .select({
          // Selecting the first 3 records in All:
          view: 'All',
          fields: ['Name', 'Description', 'Color', 'Image', 'TargetAction', 'TargetLink', 'TargetLabel'],
          sort: [{ field: 'Name', direction: 'asc' }]
        })
        .eachPage(
          function page (partialTargets, fetchNextPage) {
            // This function (`page`) will get called for each page of records.
            partialTargets.forEach((partialTarget) => {
              allTargets.push({
                id: partialTarget?.id,
                name: partialTarget?.fields?.Name as string,
                color: partialTarget?.fields?.Color as string,
                images: partialTarget?.fields?.Image as Array<any>,
                description: partialTarget?.fields?.Description as string,
                targetAction: partialTarget.fields?.TargetAction as string,
                targetLink: partialTarget.fields?.TargetLink as string,
                targetLabel: partialTarget.fields?.TargetLabel as string,
                type: partialTarget.fields?.Type as string
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
            resolve(allTargets)
          }
        )
    })
  }
}

export default targetService
