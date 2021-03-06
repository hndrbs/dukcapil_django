import axiosInstance from './config'

const fetchDukcapilDetail = (id) => dispatch => {
  dispatch({ type:'dukcapilDetail/setLoading' })
  axiosInstance({
    url: `/dukcapil/${id}/`,
    method:'GET'
  })
    .then(({ data }) => {
      dispatch({
        type: 'dukcapilDetail/setDukcapilDetail',
        payload: data
      })
    })
    .catch(err => {
      dispatch({
        type: 'dukcapilDetail/setError',
        payload: err
      })
    })
}

export default fetchDukcapilDetail