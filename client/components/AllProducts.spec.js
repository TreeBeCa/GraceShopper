// /* global describe beforeEach it */

// import {expect} from 'chai'
// import React from 'react'
// import enzyme, {shallow} from 'enzyme'
// import Adapter from 'enzyme-adapter-react-16'
// import AllProducts from './AllProducts'

// const adapter = new Adapter()
// enzyme.configure({adapter})

// describe('AllProducts', () => {
//   let allProducts

//   beforeEach(() => {
//     allProducts = shallow(
//       <AllProducts
//         treeHouses={[
//           {
//             name: 'Basic Tree House',
//             description: 'Budget-friendly and easily installed',
//             price: 9999,
//             imageUrl:
//               'https://i.pinimg.com/originals/be/4a/0e/be4a0eb411a219b65b05554c0dd7f9b2.jpg'
//           }
//         ]}
//       />
//     )
//   })

//   it('renders the name in an h2', () => {
//     expect(allProducts.find('h2').text()).to.be.equal('Basic Tree House')
//   })
// })
