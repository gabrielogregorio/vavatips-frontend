/** urlBase => /Posts */
const resolveQuery = (urlBase: string, filters: any = []) => {
  console.log(filters)
  if(filters.length === 0) {
    return urlBase
  }
  urlBase = urlBase + '?'

  let keys: string[] = Object.keys(filters)
  for(let x: number = 0; x < keys.length; x++) {
    let key: string = keys[x]
    let value: string = filters[key]

    if(x === keys.length - 1) {
      urlBase = `${urlBase}${key}=${value}`
    } else {
      urlBase = `${urlBase}${key}=${value}&`
    }
  }

  return `${urlBase}`
}
export default resolveQuery
