import React, { useEffect } from 'react'
import Product from '../components/Product'

import { useDispatch, useSelector } from 'react-redux'

import './css/HomeScreen.css'

import { listProducts, listLatestProducts } from '../actions/productActions'
import Message from '../components/Message'
import Loading from '../components/Loading'
import Pagination from '../components/Pagination'
import Categories from '../components/Categories'
import TopDeals from '../components/TopDeals'

const HomeScreen = () => {
    const dispatch = useDispatch()
    const productList = useSelector((state) => state.productList)
    const latestProductsList = useSelector((s) => s.latestProductsList)

    const { loading, products, error, page, pages } = productList
    const { latestProducts } = latestProductsList

    useEffect(() => {
        dispatch(listProducts())
        dispatch(listLatestProducts())
    }, [dispatch])

    return (
        <>
            {loading ? (
                <Loading />
            ) : error ? (
                <Message>{error}</Message>
            ) : (
                <>
                    <Categories />
                    <div
                        style={{
                            boxShadow:
                                '0px 2px 2px 0 rgb(0,0,0,0.3), 0px -2px 2px 0 rgb(0,0,0,0.3)',
                            backgroundColor: '#1583c3',
                            color: 'white',
                            marginBottom: '1rem'
                        }}
                    >
                        <h2 style={{ textAlign: 'center', margin: '1em' }}>
                            latest Products
                        </h2>
                        <section className='homeScreenContainer'>
                            {latestProducts.map((product) => (
                                <TopDeals key={product._id} product={product} />
                            ))}
                        </section>
                    </div>

                    <div className='homeScreenContainer'>
                        {products.map((product) => (
                            <Product key={product._id} pro={product} />
                        ))}
                    </div>
                    <div className='paginationConatiner'>
                        <Pagination page={page} pages={pages} />
                    </div>
                </>
            )}
        </>
    )
}

export default HomeScreen
