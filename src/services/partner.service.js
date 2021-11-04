import base from './airtable.service'

const partnerService = {
  async getPartnerRecords () {
    return new Promise((resolve, reject) => {
      const allRecords = []
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
                name: partialRecord?.fields.Name,
                notes: partialRecord?.fields?.Notes,
                logo: partialRecord?.fields?.Logo,
                website: partialRecord?.fields?.Website
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
            window.sessionStorage.setItem('partner', JSON.stringify(allRecords))
            resolve(allRecords)
          }
        )
    })
  }
}

export default partnerService
