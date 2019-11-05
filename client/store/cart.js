import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PRODUCT = 'GET_PRODUCT'
const ADD_TO_CART = 'ADD_TO_CART'
const EDIT_CART = 'EDIT_CART'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */
export const getProduct = treeHouse => ({
  type: GET_PRODUCT,
  treeHouse
})

export const addToCart = treeHouse => ({
  type: ADD_TO_CART,
  treeHouse
})

export const editCart = houseId => ({
  type: EDIT_CART,
  houseId
})

/**
 * THUNK CREATORS
 */
export const getSingleProduct = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/${id}`)
      dispatch(getProduct(data))
    } catch (error) {
      dispatch(console.error(error))
    }
  }
}

export const addingToCart = treeHouse => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/cart-view', treeHouse)
      dispatch(addToCart(data))
    } catch (error) {
      dispatch(console.error(error))
    }
  }
}

export const editingCart = id => {
  return async dispatch => {
    try {
      const {data} = await axios.delete(`/api/cart-view/${id}`)
      dispatch(editCart(data))
    } catch (error) {
      dispatch(console.error(error))
    }
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return action.treeHouse
    case ADD_TO_CART:
      return [...state, action.treeHouse]
    case EDIT_CART:
      return state.filter(houses => houses.id !== action.houseId)
    default:
      return state
  }
}
