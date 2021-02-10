import axiosInstance from './config'

const fetchReligions = () => dispatch => (
  axiosInstance.get('/religion/')
    .then(({ data }) => {
      dispatch({
        type: 'mixState/setReligion',
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

export default fetchReligions