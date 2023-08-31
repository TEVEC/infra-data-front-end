export const cleanData = data => {
  return data.map(item => {
    const newItem = {}
    for (const key in item) {
      if (Object.hasOwnProperty.call(item, key)) {
        const cleanedKey = key.replace(/^[\s\uFEFF\xA0]+/, '') // Remove non-printable characters
        newItem[cleanedKey] = item[key]
      }
    }
    return newItem
  })
}
