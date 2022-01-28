import base from './airtable.service'

const BASE_NAME = 'Problemstoffmobil'

const problemstoffmobilService = {
  async getEventRecords () {
    return new Promise((resolve, reject) => {
      const allRecords = []
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
                date: partialRecord.get('DATUM'),
                municipality: partialRecord.get('GEMEINDE'),
                district: partialRecord.get('ORTSTEIL'),
                timeFrom: partialRecord.get('VON UHR'),
                timeTo: partialRecord.get('BIS UHR'),
                collectionPoint: partialRecord.get('SAMMELSTELLE')
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
              reject(err)
            }
            resolve(allRecords)
          }
        )
    })
  }
}

export default problemstoffmobilService
