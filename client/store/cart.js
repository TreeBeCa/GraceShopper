import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const ADD_TO_CART = 'ADD_TO_CART'
const LOAD_USER_CART = 'LOAD_USER_CART'
const CREATE_NEW_CART = 'CREATE_NEW_CART'
const CHECKOUT = 'CHECKOUT'
const GET_USER = 'GET_USER'

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

const loadUserCart = cart => ({
  type: LOAD_USER_CART,
  cart
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

export const getUserCartThunk = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/${userId}/activeCart`)
    // TODO: parse data??
    dispatch(loadUserCart(data))
  } catch (error) {
    dispatch(console.error(error))
  }
}

// export const getSingleProduct = id => {
//   return async dispatch => {
//     try {
//       const {data} = await axios.get(`/api/treehouses/${id}`)
//       dispatch(getProduct(data))
//     } catch (error) {
//       dispatch(console.error(error))
//     }
//   }
// }

// export const addingToCart = treeHouse => {
//   return async dispatch => {
//     try {
//       const {data} = await axios.post('/api/cart-view', treeHouse)
//       dispatch(addToCart(data))
//     } catch (error) {
//       dispatch(console.error(error))
//     }
//   }
// }

// export const editingCart = id => {
//   return async dispatch => {
//     try {
//       const {data} = await axios.delete(`/api/cart-view/${id}`)
//       dispatch(editCart(data))
//     } catch (error) {
//       dispatch(console.error(error))
//     }
//   }
// }

// export const treehouseCartThunk = cartId => {
//   return async dispatch => {
//     try {
//       console.log('inside treehouseCartThunk')
//       const {data} = await axios.get(`/api/cart`)
//       dispatch(viewTreehouseCart(data))
//     } catch (error) {
//       dispatch(console.error(error))
//     }
//   }
// }

/**
 * REDUCER
 */
export default function(cart = {}, action) {
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
    case LOAD_USER_CART:
      return action.cart
    case CREATE_NEW_CART:
      return [] //save old cart in the future
    case GET_USER:
      return action.cart
    case CHECKOUT:
      return []
    default:
      return cart
  }
}
