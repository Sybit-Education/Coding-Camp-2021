import base from './airtable.service'

const materialService = {
  async getMaterialRecords () {
    return new Promise((resolve, reject) => {
      const allRecords = []
      base('Material')
        .select({
          view: 'published',
          fields: ['Name', 'Notes', 'Target', 'Synonyme', 'Category'],
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
                synonyms: partialRecord?.fields?.Synonyme,
                category: partialRecord?.fields?.Category,
                targets: partialRecord.fields.Target,
                creationTime: partialRecord?._rawJson?.createdTime
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
            window.sessionStorage.setItem('material', JSON.stringify(allRecords))
            resolve(allRecords)
          }
        )
    })
  },
  async getPopularRecords () {
    return new Promise((resolve, reject) => {
      const allRecords = []
      base('Material')
        .select({
          view: 'popular',
          fields: ['Name', 'Notes', 'Target', 'Synonyme', 'Category']
        })
        .eachPage(
          function page (partialRecords, fetchNextPage) {
            partialRecords.forEach((partialRecord) => {
              allRecords.push({
                id: partialRecord.id,
                name: partialRecord.fields?.Name,
                notes: partialRecord.fields?.Notes,
                synonyms: partialRecord.fields?.Synonyme,
                category: partialRecord.fields?.Category,
                targets: partialRecord.fields?.Target,
                creationTime: partialRecord._rawJson?.createdTime
              })
            })
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
  },
  async getAllNames () {
    return new Promise((resolve, reject) => {
      const allnames = []
      base('Material')
        .select({
          view: 'All',
          fields: ['Name']
        })
        .eachPage(
          function page (partialRecords, fetchNextPage) {
            partialRecords.forEach((partialRecord) => {
              allnames.push(partialRecord.fields?.Name)
            })
            fetchNextPage()
          },
          function done (err) {
            if (err) {
              console.error(err)
              reject(err)
            }
            resolve(allnames)
          }
        )
    })
  },
  async addMaterial (material) {
    await base('Material').create([
      {
        fields: {
          Name: material.name,
          Notes: material.notes,
          Status: 'zu klären',
          Synonyme: material.synonyms,
          InternalComment: material.requester.email ? `Online Anfrage von: ${material.requester.email}, Ort: ${material.requester.city ? material.requester.city : 'unbekannt'}` : ''
        }
      }
    ], function (err) {
      if (err) {
        console.error(err)
      }
    })
  }
}

export default materialService
