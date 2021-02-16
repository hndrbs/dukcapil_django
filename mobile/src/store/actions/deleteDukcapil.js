import axiosInstance from './config'

const deleteDukcapil = id => (dispatch, getState) => (
  axiosInstance({
    url: `/dukcapil/${id}/`,
    method: 'DELETE'
  })
    .then(() => {
      const prevData = getState().dukcapilReducer.dukcapilData
      const filteredData = prevData.filter(datum => datum.dukcapil_data_id !== id)
      dispatch({
        type: 'dukcapil/setDukcapil',
        payload: filteredData
      })
    })
    .catch(err => {
      dispatch({
        type: 'dukcapil/setError',
        payload: err
      })
    })
)

export default deleteDukcapil