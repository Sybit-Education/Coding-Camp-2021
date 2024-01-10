import type Location  from '@/types/location'
import base from './airtable.service'
import { toast } from 'vuetify-sonner'

const BASE_NAME = 'Location'
const locationService = {
  async getLocationList (): Promise<Array<Location>> {
    return new Promise((resolve, reject) => {
      const locations: Array<Location> = []
      base(BASE_NAME)
        .select({
          view: 'published',
          fields: ['Name', 'Type', 'Notes', 'Link', 'Latitude', 'Longitude', 'Image']
        }).eachPage(
          function page (partialRecords, fetchNextPage) {
            partialRecords.forEach((partialRecords) => {
              const item: Location = {
                id: partialRecords.id,
                name: partialRecords.fields?.Name as string,
                type: partialRecords.fields?.Type as string,
                image: partialRecords.fields?.Image as Array<any>,
                notes: partialRecords.fields?.Notes as string,
                link: partialRecords.fields?.Link as string,
                latitude: partialRecords.fields?.Latitude as number,
                longitude: partialRecords.fields?.Longitude as number
              }
              locations.push(item)
            })
            fetchNextPage()
          }, function done (err) {
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
            resolve(locations)
          })
    })
  },

  getLocationTypeImage (location: Location): string {
    const imageName = location.type
      .toLowerCase()
      .replace(' ', '-')
      .replace('/', '-')
    try {
      return `/pins/${imageName}.png`
    } catch (e) {
      console.error(`No icon associated to this location type '${location.type}': ${imageName}.png`)
      return '/pins/default.png'
    }
  }
}

export default locationService
