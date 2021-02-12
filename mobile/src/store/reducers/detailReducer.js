const initState = {
  dukcapilDetailData: null,
  loading: false,
  error: null
}

const detailReducer = (state=initState, action) => {
  switch (action.type) {
    case 'dukcapilDetail/setDukcapilDetail':
      return {...state, dukcapilDetailData: action.payload, error: null, loading: false}
    case 'dukcapilDetail/setLoading':
      return {...state, loading: true}
    case 'dukcapilDetail/setError':
      return {...state, loading: false, error: action.payload}
    default:
      return initState
  }
}

export default detailReducer