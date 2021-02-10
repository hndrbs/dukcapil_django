import axiosInstance from './config'

const fetchDukcapil = () => dispatch => {
  axiosInstance({
    url: '/dukcapil/',
    method: 'GET',
  })
    .then(({ data }) => {
      dispatch({
        type: 'dukcapil/setDukcapil',
        payload: data
      })
    })
    .catch(err => {
      dispatch({
        type: 'dukcapil/setError',
        payload: err
      })
    })
}

export default fetchDukcapil