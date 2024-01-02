import config from "@/web/config"
import axios from "axios"

const parseUrl = (resource) => {
  if (!Array.isArray(resource)) {
    return `/api/${resource}`
  }

  const [resourceName, resourceId] = resource

  return `/api/${resourceName}/${resourceId}`
}
const makeResource =
  (method) =>
  (resource, { data = {}, options = {} } = {}) => {
    const token = localStorage.getItem(config.security.session.key)
    const headers = token ? { Authorization: token } : {}

    return axios({
      url: parseUrl(resource),
      method,
      data: method === "GET" || method === "DELETE" ? null : data,
      withCredentials: true,
      headers,
      ...options,
    })
  }

export const createResource = makeResource("POST")
export const readResource = makeResource("GET")
export const updateResource = makeResource("PATCH")
export const deleteResource = makeResource("DELETE")
