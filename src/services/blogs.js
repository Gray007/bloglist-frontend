import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const updateLike = async id => {
  const config = {
    headers: { Authorization: token },
  }

  const request = await axios.put(`${baseUrl}/${id}/like`, {}, config)
  return request.data
}

const update = async (id, newObject) => {
  const request = await axios.put(`${baseUrl}/${id}`, newObject)
  return request.data
}

const deleteBlog = async id => {
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.delete(`${baseUrl}/${id}`, config)
  return request.data
}

export default {
  getAll,
  create,
  updateLike,
  update,
  deleteBlog,
  setToken
}