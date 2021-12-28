import axios from 'axios'

export default function getCategories () {
  const baseURL = axios.defaults.baseURL

  return axios({
    method: 'get',
    url: baseURL + 'categories'
  }).then((res) => {
    return res.data
  })
}
