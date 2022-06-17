import React from 'react'
import { useDispatch } from 'react-redux'

import { listProducts } from '../actions/productActions'

import './css/Categories.css'

const Categories = () => {
  const dispatch = useDispatch()

  const clickHandler = (category) => {
    dispatch(listProducts(1, category))
    dispatch({ type: 'PRODUCT_APPLY_FILTER', payload: category })
  }

  return (
    <>
    <ul className='categoriesContainer'>
        <li onClick={()=>clickHandler(":electronics")}><img src="images/electronics.jpeg" alt="electronics" />Electronics</li>
        <li onClick={()=>clickHandler(":clothing")}><img src="images/clothing.jpeg" alt="clothing" />Clothing</li>
        <li onClick={()=>clickHandler(":beauty")}><img src="images/beauty.jpeg" alt="beauty" />Beauty</li>
        <li onClick={()=>clickHandler(":appliance")}><img src="images/appliance.jpeg" alt="appliance" />Appliance</li>
        <li onClick={()=>clickHandler(":grocery")}><img src="images/grocery.jpeg" alt="grocery" />Grocery</li>
    </ul>
    </>
  )
}

export default Categories

