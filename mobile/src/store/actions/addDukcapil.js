import axiosInstance from './config'

const addDukcapil = (payload) => (dispatch, getState) => (
  axiosInstance({
    method: 'POST',
    data: payload,
    url: '/dukcapil/'
  })
  .then(({ data }) => {
    const prevData = getState().dukcapilReducer.dukcapilData
    const updatedData = [data, ...prevData]
    dispatch({
      type: 'dukcapil/setDukcapil',
      payload: updatedData
    })
  })
  .catch(err => {
    dispatch({
      type: 'dukcapil/setError',
      payload: err
    })
  })
)

export default addDukcapil