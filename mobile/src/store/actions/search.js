import axiosInstance from './config'

const search = nik => dispatch => {
  axiosInstance.get(`/?nik=${nik}`)
    .then(({ data }) => {
      // set result here
      console.log(data)
      dispatch({
        type: 'searchResult/setDukcapil',
        payload: [data]
      })
    })
    .catch(err => {
      console.log({ err })
    })
}

export default search