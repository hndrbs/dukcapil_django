import axiosInstance from './config'

const editDukcapil = (id, payload) => (dispatch, getState) => (
  axiosInstance({
    url: `/dukcapil/${id}/`,
    data: payload,
    method: 'PUT'
  })
    .then(({ data }) => {
      const prevData = getState().dukcapilReducer.dukcapilData
      const updatedData = prevData.map(dukcapil => {
        if (dukcapil.dukcapil_data_id === id) {
          return data
        }
        return dukcapil
      })
      console.log({ updatedData })
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

export default editDukcapil