import MaterialRequest from '@/types/material-request'
import type Material from '@/types/material'
import base from './airtable.service'
import { toast } from 'vuetify-sonner'
import { useTargetStore } from '@/store/target.store'

const materialService = {
  async getMaterialRecords (): Promise<Array<Material>> {
    return new Promise((resolve, reject) => {
      const targetStore = useTargetStore()
      targetStore.getTargetRecords()
      const allRecords: Array<Material> = []

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
              const item: Material = {
                id: partialRecord.id,
                name: partialRecord.fields.Name as string,
                notes: partialRecord.fields?.Notes as string,
                synonyms: partialRecord.fields?.Synonyme as string,
                category: partialRecord.fields?.Category  as Array<string>,
                targets: partialRecord.fields.Target as Array<string>,
                creationTime: partialRecord._rawJson?.createdTime as string
              }
              allRecords.push(item)
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
  },
  async getPopularRecords (): Promise<Array<Material>> {
    return new Promise((resolve, reject) => {
      const allRecords: Array<Material> = []
      base('Material')
        .select({
          view: 'popular',
          fields: ['Name', 'Notes', 'Target', 'Synonyme', 'Category']
        })
        .eachPage(
          function page (partialRecords, fetchNextPage) {
            partialRecords.forEach((partialRecord) => {
              const item: Material = {
                id: partialRecord.id,
                name: partialRecord.fields.Name as string,
                notes: partialRecord.fields?.Notes as string,
                synonyms: partialRecord.fields?.Synonyme as string,
                category: partialRecord.fields?.Category  as Array<string>,
                targets: partialRecord.fields.Target as Array<string>,
                creationTime: partialRecord._rawJson?.createdTime as string
              }
              allRecords.push(item)
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
  async getAllNames (): Promise<Array<string>> {
    return new Promise((resolve, reject) => {
      const allnames: Array<string> = []
      base('Material')
        .select({
          view: 'All',
          fields: ['Name']
        })
        .eachPage(
          function page (partialRecords, fetchNextPage) {
            partialRecords.forEach((partialRecord) => {
              allnames.push(partialRecord.fields?.Name as string)
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
  async addMaterial (material: MaterialRequest) {
    await base('Material').create([
      {
        fields: {
          Name: material.name,
          Notes: material.notes,
          Status: 'zu klären',
          Synonyme: material.synonyms,
          InternalComment: material.requester.email ? `Online Anfrage von: ${material.requester.name} (${material.requester.email}), Ort: ${material.requester.city ? material.requester.city : 'unbekannt'}` : ''
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
