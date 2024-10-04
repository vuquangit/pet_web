const dataURItoBlob = (dataURI: string) => {
  const bytes =
    dataURI.split(',')[0].indexOf('base64') >= 0
      ? atob(dataURI.split(',')[1])
      : unescape(dataURI.split(',')[1])
  const mime = dataURI.split(',')[0].split(':')[1].split(';')[0]
  const max = bytes.length
  const ia = new Uint8Array(max)
  for (let i = 0; i < max; i += 1) ia[i] = bytes.charCodeAt(i)
  return new Blob([ia], { type: mime })
}

const blobToFile = (theBlob: Blob, fileName: string): File => {
  return new File(
    [theBlob as any], // cast as any
    fileName,
    {
      lastModified: new Date().getTime(),
      type: theBlob.type,
    }
  )
}

export const resizeImage = ({ file, maxSize }: { file: File; maxSize: number }) => {
  const reader = new FileReader()
  const image = new Image()
  const canvas = document.createElement('canvas')

  const resize = () => {
    let { width, height } = image

    if (width > height) {
      if (width > maxSize) {
        height *= maxSize / width
        width = maxSize
      }
    } else if (height > maxSize) {
      width *= maxSize / height
      height = maxSize
    }

    canvas.width = width
    canvas.height = height
    canvas.getContext('2d')?.drawImage(image, 0, 0, width, height)

    const dataUrl = canvas.toDataURL(file.type)

    const blob = dataURItoBlob(dataUrl)
    return blobToFile(blob, file.name)
  }

  return new Promise((resolve, reject) => {
    if (!file.type.match(/image.*/)) {
      reject(new Error('Not an image'))
      return
    }

    reader.onload = (readerEvent) => {
      image.onload = () => resolve(resize())
      // @ts-ignore
      image.src = readerEvent.target?.result
    }

    reader.readAsDataURL(file)
  })
}
