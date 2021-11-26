/** urlBase => /Posts */
const resolveQuery = (urlBase: string, filters: any = []) => {
  if(filters.length === 0) {
    return urlBase
  }
  urlBase = urlBase + '?'

  const keys: string[] = Object.keys(filters)
  for(let x = 0; x < keys.length; x++) {
    const key: string = keys[x]
    const value: string = filters[key]

    if(x === keys.length - 1) {
      urlBase = `${urlBase}${key}=${value}`
    } else {
      urlBase = `${urlBase}${key}=${value}&`
    }
  }

  return `${urlBase}`
}
export default resolveQuery
