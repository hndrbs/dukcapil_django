import axios from 'axios'
const baseURL = 'http://127.0.0.1:8000/dukcapil/api'
const axiosInstance = axios.create({ baseURL })

const fetchDukcapil = () => {
  return dispatch => {
    axiosInstance({
      url: '/',
      method: 'GET',
    })
      .then(({ data }) => {
        return dispatch({
          type: 'dukcapil/setDukcapil',
          payload: data
        })
      })
      .catch(err => {
        return dispatch({
          type: 'dukcapil/setError',
          payload: err
        })
      })
  }
}

export default fetchDukcapil