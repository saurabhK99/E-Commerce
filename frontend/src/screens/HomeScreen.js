import React, { useEffect } from 'react'
import Product from '../components/Product'

import { useDispatch, useSelector } from 'react-redux'

import './css/HomeScreen.css'

import { listProducts } from '../actions/productActions'
import Message from '../components/Message'
import Loading from '../components/Loading'

const HomeScreen = () => {
    const dispatch = useDispatch()
    const productList = useSelector((state) => state.productList)
    const { loading, products, error } = productList

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    return (
        <>
            {loading ? (
                <Loading />
            ) : error ? (
                <Message>{error}</Message>
            ) : (
                <div className='homeScreenContainer'>
                    {products.map((product) => (
                        <Product key={product._id} pro={product} />
                    ))}
                </div>
            )}
        </>
    )
}

export default HomeScreen
