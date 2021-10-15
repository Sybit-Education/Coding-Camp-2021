import Compressor from 'compressorjs'

const CLOUDNAME = process.env.VUE_APP_CLOUDINARY_CLOUDNAME
const UPLOAD_PRESET = process.env.VUE_APP_CLOUDINARY_UPLOAD_PRESET

export function deleteImageByUID (deleteToken) {
  return new Promise((resolve, reject) => {
    const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUDNAME}/delete_by_token`

    const formData = new FormData()
    formData.append('token', deleteToken)

    const request = new XMLHttpRequest()
    request.open('POST', CLOUDINARY_URL, true)
    request.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
    request.onreadystatechange = () => {
      // File uploaded successfully
      if (request.status === 200) {
        resolve()
      }
    }
    request.onerror = (err) => {
      alert('error: ' + err)
      reject(err)
    }
    request.send(formData)
  }
  )
}

export function uploadFile (dataSet, image) {
  return new Promise((resolve, reject) => {
    let resizedFile

    // eslint-disable-next-line no-new
    new Compressor(image, {
      quality: 0.6,
      maxWidth: 1024,

      // The compression process is asynchronous,
      // which means you have to access the `result` in the `success` hook function.
      success (result) {
        resizedFile = result

        return new Promise(function (resolve, reject) {
          const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUDNAME}/upload`

          const formData = new FormData()
          formData.append('upload_preset', UPLOAD_PRESET)
          formData.append('folder', 'TrashCans')
          formData.append('file', resizedFile)

          const request = new XMLHttpRequest()
          request.open('POST', CLOUDINARY_URL, true)
          request.setRequestHeader('X-Requested-With', 'XMLHttpRequest')

          request.onreadystatechange = () => {
            // File uploaded successfully
            if (request.readyState === 4 && request.status === 200) {
              const response = JSON.parse(request.responseText)
              const data = {
                Status: 'requested',
                File: [{ url: response.secure_url }],
                deleteToken: response.delete_token,
                ...dataSet
              }
              resolve(data)
            }

            // Not succesfull, let find our what happened
            if (request.status !== 200) {
              const response = JSON.parse(request.responseText)
              const error = response.error.message
              alert('error, status code not 200 ' + error)
              reject(error)
            }
          }

          request.onerror = (err) => {
            alert('error: ' + err)
            reject(err)
          }

          request.send(formData)
        }).then((response) => {
          resolve(response)
        })
      },
      error (err) {
        reject(err.message)
      }
    })
  })
}
