import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = (user, cart) => ({type: GET_USER, user, cart})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    //get data of logged in user
    const res = await axios.get('/auth/me')

    let user = defaultUser
    let cart = []
    //if thre is a logged in used, also get their cart
    if (res.data) {
      user = res.data
      const cartRes = await axios.get(`/api/users/${user.id}/activeCart`)
      cart = cartRes.data
    }
    //dispatch getUser with the user and their cart
    dispatch(getUser(user, cart))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}
// export const getCartThunk = userId => {
//   return async dispatch => {
//     try {
//       const {data} = await axios.get(`/api/users/${userId}/cart`)
//       dispatch(getCart(data))
//     } catch (error) {
//       dispatch(console.error(error))
//     }
//   }
// }

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    // case GET_CART: {
    //   return action.userId
    // }
    default:
      return state
  }
}
