import base from './airtable.service'
import * as imageService from './image.service'
import store from '../store/index'

const BASE_NAME = 'Location'
const locationService = {
  getLocationList () {
    return new Promise((resolve, reject) => {
      const locations = []
      base(BASE_NAME)
        .select({
          view: 'published',
          fields: ['Name', 'Type', 'Notes', 'Link', 'Latitude', 'Longitude', 'Image']
        }).eachPage(
          function page (partialRecords, fetchNextPage) {
            partialRecords.forEach((partialRecords) => {
              locations.push({
                id: partialRecords.id,
                name: partialRecords.fields?.Name,
                type: partialRecords.fields?.Type,
                image: partialRecords.fields?.Image,
                notes: partialRecords.fields?.Notes,
                link: partialRecords.fields?.Link,
                latitude: partialRecords.fields?.Latitude,
                longitude: partialRecords.fields?.Longitude
              })
            })
            fetchNextPage()
          }, function done (err) {
            if (err) {
              console.log(err)
              reject(err)
            }
            window.sessionStorage.setItem('locations', JSON.stringify(locations))
            resolve(locations)
          })
    })
  },

  postLocationWithoutImage (location) {
    base(BASE_NAME).create([
      {
        fields: {
          Name: location.name,
          Notes: location.description,
          Status: 'proposed',
          Latitude: location.latitude,
          Longitude: location.longitude,
          Type: location.type
        }
      }
    ], function (err) {
      if (err) {
        console.error(err)
      }
    })
  },

  postLocationWithImage (location, uploadedImage) {
    return new Promise((resolve, reject) => {
      base(BASE_NAME).create([
        {
          fields: {
            Name: location.name,
            Notes: location.description,
            Status: 'proposed',
            Latitude: location.latitude,
            Longitude: location.longitude,
            Type: location.type,
            Image: [
              {
                url: uploadedImage.File[0].url
              }
            ]
          }
        }
      ], function (err) {
        console.log('DONE')
        if (err) {
          console.error(err)
          reject(err.message)
        }
        resolve()
      })
    })
  },

  checkImageAndCreateLocation (location) {
    return new Promise((resolve, reject) => {
      if (location.image) {
        imageService.uploadFile(null, location.image).then((uploadedImage) => {
          this.postLocationWithImage(location, uploadedImage).then(() => {
            console.log('NACH  WITHIMAGE')
            imageService.deleteImageByUID(uploadedImage.deleteToken).then(() => {
              store.dispatch('updateShowLoadingSpinner', false)
              resolve()
            }).catch(error => {
              reject(error)
            })
          }).catch(error => {
            reject(error)
          })
        }).catch(error => {
          reject(error)
        })
      } else {
        this.postLocationWithoutImage(location)
        console.log('PostlocationWithNOImage')
        store.dispatch('updateShowLoadingSpinner', false)
        resolve()
      }
    })
  },

  getLocationTypeImage (location) {
    const imageName = location.type
      .toLowerCase()
      .replace(' ', '-')
      .replace('/', '-')
    try {
      return `/pins/${imageName}.png`
    } catch (e) {
      console.error(`No icon associated to this location type '${location.type}': ${imageName}.png`)
      return null
    }
  }
}

export default locationService
