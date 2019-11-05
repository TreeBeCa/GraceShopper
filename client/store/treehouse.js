import axios from 'axios'

const GET_ALL_HOUSES = 'GET_ALL_HOUSES'

export const getAllHouses = treeHouses => ({
  type: GET_ALL_HOUSES,
  treeHouses
})

export const thunkGetAllHouses = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/treehouses')

      dispatch(getAllHouses(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export function treeHouseReducer(treeHouses = [], action) {
  switch (action.type) {
    case GET_ALL_HOUSES:
      return action.treeHouses
    default:
      return treeHouses
  }
}
