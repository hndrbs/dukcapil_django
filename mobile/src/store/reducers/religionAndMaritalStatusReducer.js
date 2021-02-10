const initState = {
  religions: null,
  marital_statuses: null,
  error: null
}

const religionAndMaritalStatusReducer = (state = initState, action) => {
  switch (action.type) {
    case 'mixState/setReligion':
      return { ...state, religions: action.payload }  
    case 'mixState/setMaritalStatuses':
      return { ...state, marital_statuses: action.payload }
    case 'mixState/setError':
      return { ...state, error: action.payload}
    default:
      return state
  }
}

export default religionAndMaritalStatusReducer