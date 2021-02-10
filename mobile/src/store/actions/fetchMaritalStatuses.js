import axiosInstance from './config'

const fetchMaritalStatuses = () => dispatch => (
  axiosInstance.get('/marital_status/')
    .then(({ data }) => {
      dispatch({
        type: 'mixState/setMaritalStatuses',
        payload: data
      })
    })
    .catch(err => {
      dispatch({
        type: 'mixState/setError',
        payload: err
      })
    })
)

export default fetchMaritalStatuses