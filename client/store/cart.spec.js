/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {getUserCartThunk, createNewCart} from './cart'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {cart: {}}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('getUserCartThunk', () => {
    //   it('eventually dispatches the LOAD_USER_CART action', async () => {
    //     const fakeUserId = 0;
    //     mockAxios.onGet('/auth/me').replyOnce(200, fakeUser)
    //     await store.dispatch(me())
    //     const actions = store.getActions()
    //     expect(actions[0].type).to.be.equal('LOAD_USER_CART')
    //     expect(actions[0].user).to.be.deep.equal(fakeUser)
    //   })
  })
})
