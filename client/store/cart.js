import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PRODUCT = 'GET_PRODUCT'
const ADD_TO_CART = 'ADD_TO_CART'
const VIEW_TREEHOUSECART = 'VIEW_TREEHOUSECART'
const CREATE_NEW_CART = 'CREATE_NEW_CART'
const CHECKOUT = 'CHECKOUT'
const REMOVE_TREEHOUSE = 'REMOVE_TREEHOUSE'

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

export const removeTreeHouse = houseId => ({
  type: REMOVE_TREEHOUSE,
  houseId
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
      dispatch(removeTreeHouse(data))
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
    case REMOVE_TREEHOUSE:
      // eslint-disable-next-line no-case-declarations
      const newState = Object.assign([], cart)
      // eslint-disable-next-line no-case-declarations
      let indexOfHouse = cart.findIndex(element => {
        return element.treeHouse.id === action.houseId
      })
      newState.splice(indexOfHouse, 1)
      return newState
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
