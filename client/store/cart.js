import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PRODUCT = 'GET_PRODUCT'
const ADD_TO_CART = 'ADD_TO_CART'
const EDIT_CART = 'EDIT_CART'
const VIEW_TREEHOUSECART = 'VIEW_TREEHOUSECART'
const CREATE_NEW_CART = 'CREATE_NEW_CART'
const CHECKOUT = 'CHECKOUT'

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

export const viewTreehouseCart = cartId => ({
  type: VIEW_TREEHOUSECART,
  cartId
})

export const createNewCart = () => ({
  type: CREATE_NEW_CART
})

export const checkout = () => ({
  type: CHECKOUT
})
/**
 * THUNK CREATORS
 */
export const getSingleProduct = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/treehouses/${id}`)
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

export const treehouseCartThunk = cartId => {
  return async dispatch => {
    try {
      console.log('inside treehouseCartThunk')
      const {data} = await axios.get(`/api/cart`)
      dispatch(viewTreehouseCart(data))
    } catch (error) {
      dispatch(console.error(error))
    }
  }
}

/**
 * REDUCER
 */
export default function(cart = [], action) {
  switch (action.type) {
    case ADD_TO_CART:
      if (cart.length !== 0) {
        const matchingTreeHouse = cart.find(
          element => element.treeHouse.id === action.treeHouse.id
        )
        if (matchingTreeHouse) {
          return cart.map(element => {
            if (element.treeHouse.id === action.treeHouse.id) {
              element.quantity++
              return element
            }
            return element
          })
        }
      }
      return [...cart, {treeHouse: action.treeHouse, quantity: 1}]
    // case EDIT_CART:
    //   return state.filter(houses => houses.id !== action.houseId)
    case VIEW_TREEHOUSECART: {
      return action.cartId
    }
    case CREATE_NEW_CART: {
      return [] //save old cart in the future
    }
    case CHECKOUT:
      return []
    default:
      return cart
  }
}
