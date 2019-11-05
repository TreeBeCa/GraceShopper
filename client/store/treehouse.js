import axios from 'axios'
import history from '../history'

const GET_ALL_HOUSES = 'GET_ALL_HOUSES'

export const getAllHouses = treeHouses => ({
  type: GET_ALL_HOUSES,
  treeHouses
})

export const thunkGetAllHouses = () => {
  return async dispatch => {
    try {
      console.log('HELLLLOOOOO')
      const {data} = await axios.get('/api/treehouses')
      // console.log(">>>>>>>>>>>>>>>>", data)
      dispatch(getAllHouses(data))
    } catch (error) {
      console.error(error)
    }
  }
}

const initialState = []

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_HOUSES:
      return action.treeHouses
    default:
      return state
  }
}
