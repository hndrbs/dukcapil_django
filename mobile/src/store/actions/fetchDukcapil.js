import axiosInstance from './config'

const fetchDukcapil = () => dispatch => {
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

export default fetchDukcapil