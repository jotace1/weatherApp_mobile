export const actionTypes = {
    ADD_CITY: 'ADD_CITY',
    
  };
  
  const initialState = {
    cities: [],
  };
  
  export default function reducer(state = initialState, action) {
    switch (action.type) {
      case 'ADD_CITY':
        return { ...state, cities: [...state.cities, action.city] };
  
      default:
        return state;
    }
  }
  
  export const actions = {
    addCity: city => ({ type: 'ADD_CITY', city }),

  };
  