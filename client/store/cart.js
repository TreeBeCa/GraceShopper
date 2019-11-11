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
const REMOVE_TREEHOUSE = 'REMOVE_TREEHOUSE'

/**
 * INITIAL STATE
 */
const initialState = []

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

export const removeTreeHouse = houseId => ({
  type: REMOVE_TREEHOUSE,
  houseId
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

export const addToCartThunk = (treehouse, userId) => async dispatch => {
  if (userId) {
    // perform an axios request to increment the threehouse in the logged-in user's cart,
    await axios.put(`api/users/${userId}/activeCart/add/${treehouse.id}`)
    //and then
    dispatch(addToCart(treehouse))
  } else {
    dispatch(addToCart(treehouse))
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
    case REMOVE_TREEHOUSE:
      // eslint-disable-next-line no-case-declarations
      const newState = Object.assign([], cart)
      // eslint-disable-next-line no-case-declarations
      let indexOfHouse = cart.findIndex(element => {
        return element.treeHouse.id === action.houseId
      })
      newState.splice(indexOfHouse, 1)
      return newState
    case CHECKOUT:
      return []
    case REMOVE_USER:
      return []
    default:
      return cart
  }
}
