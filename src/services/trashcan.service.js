import base from './airtable.service'
import * as imageService from './image.service'
import store from '../store/index'

export function getTrashCans () {
  return new Promise((resolve, reject) => {
    const allTrashCans = []
    base('Location')
      .select({
        view: 'published',
        fields: ['Type', 'Notes', 'Latitude', 'Longitude', 'Image']
      }).eachPage(
        function page (partialRecords, fetchNextPage) {
          partialRecords.forEach((partialRecords) => {
            allTrashCans.push({
              id: partialRecords?.id,
              type: partialRecords?.fields?.Type,
              image: partialRecords?.fields?.Image,
              notes: partialRecords?.fields?.Notes,
              latitude: partialRecords?.fields?.Latitude,
              longitude: partialRecords?.fields?.Longitude
            })
          })
          fetchNextPage()
        }, function done (err) {
          if (err) {
            console.log(err)
            reject(err)
          }
          window.sessionStorage.setItem('trashCans', JSON.stringify(allTrashCans))
          resolve(allTrashCans)
        })
  })
}

function postTrashCanWithoutImage (trashCan) {
  base('Location').create([
    {
      fields: {
        Name: trashCan.name,
        Notes: trashCan.description,
        Status: 'proposed',
        Latitude: trashCan.latitude,
        Longitude: trashCan.longitude,
        Type: trashCan.type
      }
    }
  ], function (err) {
    if (err) {
      console.error(err)
    }
  })
}

function postTrashCanWithImage (trashCan, uploadedImage) {
  return new Promise((resolve, reject) => {
    base('Location').create([
      {
        fields: {
          Name: trashCan.name,
          Notes: trashCan.description,
          Status: 'proposed',
          Latitude: trashCan.latitude,
          Longitude: trashCan.longitude,
          Type: trashCan.type,
          Image: [
            {
              url: uploadedImage.File[0].url
            }
          ]
        }
      }
    ], function (err) {
      if (err) {
        console.error(err)
        reject(err.message)
      }
      resolve()
    })
  })
}

export function checkImageAndCreateTrashCan (trashCan) {
  return new Promise((resolve, reject) => {
    if (trashCan.image) {
      imageService.uploadFile(null, trashCan.image).then((uploadedImage) => {
        postTrashCanWithImage(trashCan, uploadedImage).then(() => {
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
      postTrashCanWithoutImage(trashCan)
      store.dispatch('updateShowLoadingSpinner', false)
      resolve()
    }
  })
}
