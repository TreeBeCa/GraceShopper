import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const ADD_TO_CART = 'ADD_TO_CART'
const CREATE_NEW_CART = 'CREATE_NEW_CART'
const CHECKOUT = 'CHECKOUT'
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * ACTION CREATORS
 */

export const createNewCart = () => ({
  type: CREATE_NEW_CART
})

export const addToCart = treehouse => ({
  type: ADD_TO_CART,
  treehouse
})

export const checkout = () => ({
  type: CHECKOUT
})

/**
 * THUNK CREATORS
 */

export const checkoutThunk = (userId, cart) => async dispatch => {
  try {
    /***
     * TODO: save the user's cart with active: false
     * and then dispatch the checkout action creator
     * to clear the store
     * */
  } catch (error) {
    dispatch(console.error(error))
  }
}

// There's actually no reason for this function to be a thunk,
// as it's not modifying the store.
export const saveUserCartThunk = (userId, cart) => async dispatch => {
  try {
    await axios.put(`/api/users/${userId}/activeCart`, cart)
  } catch (error) {
    dispatch(console.error(error))
  }
}
/**
 * REDUCER
 */
// eslint-disable-next-line complexity
export default function(cart = [], action) {
  switch (action.type) {
    case ADD_TO_CART:
      if (cart.length !== 0) {
        const matchingTreehouse = cart.find(
          element => element.treehouse.id === action.treehouse.id
        )
        if (matchingTreehouse) {
          return cart.map(element => {
            if (element.treehouse.id === action.treehouse.id) {
              element.quantity++
              return element
            }
            return element
          })
        }
      }
      return [...cart, {treehouse: action.treehouse, quantity: 1}]
    case CREATE_NEW_CART:
      return []
    case GET_USER:
      return action.cart
    case CHECKOUT:
      return []
    case REMOVE_USER:
      return []
    default:
      return cart
  }
}
