import base from './airtable.service'

const BASE_NAME = 'Problemstoffmobil'

const problemstoffmobilService = {
  async getRecords () {
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
                date: partialRecord?.fields.DATUM,
                municipality: partialRecord?.fields.GEMEINDE,
                district: partialRecord?.fields.ORTSTEIL,
                timeFrom: partialRecord?.fields['VON UHR'],
                timeTo: partialRecord.fields['BIS UHR'],
                collectionPoint: partialRecord.fields.SAMMELSTELLE
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
            window.sessionStorage.setItem(BASE_NAME, JSON.stringify(allRecords))
            resolve(allRecords)
          }
        )
    })
  }
}

export default problemstoffmobilService
