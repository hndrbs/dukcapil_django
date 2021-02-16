const initState = {
  dukcapilData: null,
  loading: false,
  error: null
}

const dukcapilReducer = (state=initState, action) => {
  switch (action.type) {
    case 'dukcapil/setDukcapil':
      return {...state, dukcapilData: action.payload, error: null, loading: false}
    case 'dukcapil/setLoading':
      return {...state, loading: true}
    case 'dukcapil/setError':
      return {...state, loading: false, error: action.payload}
    default:
      return state
  }
}

export default dukcapilReducer