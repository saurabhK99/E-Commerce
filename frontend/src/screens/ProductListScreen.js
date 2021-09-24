import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import ProductPanel from '../components/ProductPanel'

import Loading from '../components/Loading'
import Message from '../components/Message'
import { getProductslist } from '../actions/productActions'

const ProductListScreen = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProductslist())
    }, [dispatch])

    const productsGetList = useSelector((s) => s.productsGetList)

    const { error, loading, productsList } = productsGetList

    return (
        <>
            {loading ? (
                <Loading />
            ) : error ? (
                <Message type='error'>{error}</Message>
            ) : (
                productsList.length > 0 && (
                    <div className='productListContainer'>
                        {productsList.map((product) => (
                            <ProductPanel key={product._id} info={product} />
                        ))}
                    </div>
                )
            )}
        </>
    )
}

export default ProductListScreen
