import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const GET_CART = 'GET_CART'
const EDIT_USER = 'EDIT_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = (user, cart) => ({type: GET_USER, user, cart})
const removeUser = () => ({type: REMOVE_USER})

export const getCart = userId => ({
  type: GET_CART,
  userId
})
const editUser = user => ({
  type: EDIT_USER,
  user
})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    //get data of logged in user
    const res = await axios.get('/auth/me')

    let user = defaultUser
    let cart = []
    //if there is a logged in user, also get their cart
    if (res.data) {
      user = res.data
      if (user.id) {
        const cartRes = await axios.get(`/api/users/${user.id}/activeCart`)
        cart = cartRes.data
      }
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
    let cart = []
    const user = res.data
    const cartRes = await axios.get(`/api/users/${user.id}/activeCart`)
    if (cartRes.data) {
      cart = cartRes.data
    }
    dispatch(getUser(user, cart))
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

export const getCartThunk = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/${userId}/cart`)
      dispatch(getCart(data))
    } catch (error) {
      dispatch(console.error(error))
    }
  }
}
export const editUserThunk = user => async dispatch => {
  try {
    const res = await axios.put(`/api/users/${user.id}/profile`, user)
    console.log('thunk data:', user)
    console.log('thunk res', res)
    dispatch(editUser(res))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  // console.log("STATE: ", state)
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case GET_CART: {
      return action.userId
    }
    case EDIT_USER: {
      if (state.id === action.user.id) {
        return {
          ...state,
          name: action.name,
          email: action.email,
          username: action.username,
          address: action.address
        }
      }
    }
    default:
      return state
  }
}
