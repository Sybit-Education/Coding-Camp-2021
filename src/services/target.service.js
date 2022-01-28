import base from './airtable.service'

const targetService = {
  async getTargetRecords () {
    return new Promise((resolve, reject) => {
      const allTargets = []
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
                name: partialTarget?.fields?.Name,
                color: partialTarget?.fields?.Color,
                images: partialTarget?.fields?.Image,
                description: partialTarget?.fields?.Description,
                targetAction: partialTarget.fields?.TargetAction,
                targetLink: partialTarget.fields?.TargetLink,
                targetLabel: partialTarget.fields?.TargetLabel,
                type: partialTarget.fields?.Type
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
            resolve(allTargets)
          }
        )
    })
  }
}

export default targetService
