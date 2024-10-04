import humps from 'humps'
import { cloneDeep } from 'lodash'

export const convertObjectToFormData = (obj: any) => {
  // convert to FormData
  const formData = new FormData()
  const dataDecamelize = cloneDeep(humps.decamelizeKeys(obj))

  for (const key in dataDecamelize) {
    formData.append(key, dataDecamelize[key])
  }

  return formData
}
