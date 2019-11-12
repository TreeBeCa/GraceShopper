/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {UserProfilePage} from './user-home'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('UserHome', () => {
  // let userProfilePage
  // beforeEach(() => {
  //   userProfilePage = shallow(<UserProfilePage email="cody@email.com" />)
  // })
  // it('renders the email in an h3', () => {
  //   expect(userProfilePage.find('h3').text()).to.be.equal(
  //     'Welcome, cody@email.com'
  //   )
  // })
})
