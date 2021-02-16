import axiosInstance from './config'

const fetchDukcapil = () => dispatch => {
  dispatch({ type: 'dukcapil/setLoading' })
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