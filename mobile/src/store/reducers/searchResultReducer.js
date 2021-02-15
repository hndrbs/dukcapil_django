const initState = {
  dukcapilData: null,
  loading: false,
  error: null
}

const searchResultReducer = (state=initState, action) => {
  switch (action.type) {
    case 'searchResult/setDukcapil':
      return {...state, dukcapilData: action.payload, error: null, loading: false}
    case 'searchResult/setLoading':
      return {...state, loading: true}
    case 'searchResult/setError':
      return {...state, loading: false, error: action.payload}
    default:
      return initState
  }
}

export default searchResultReducer