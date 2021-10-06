import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { listProducts } from '../actions/productActions'

import './css/Pagination.css'

const Pagination = ({ page, pages }) => {
    const dispatch = useDispatch()

    const filter = useSelector((s) => s.filter.filter)

    const paginationHandler = (e) => {
        let buttons = document.querySelectorAll('.pageButton')

        buttons.forEach((b) => {
            b.classList.remove('currentPageButton')
        })

        e.target.classList.add('currentPageButton')

        dispatch(listProducts(e.target.value, filter))
    }

    return (
        <div className='paginationContainer'>
            {pages > 1 &&
                [...Array(pages).keys()].map((p) => (
                    <button
                        value={p + 1}
                        className='pageButton'
                        onClick={paginationHandler}
                        key={p + 1}
                    >
                        {p + 1}
                    </button>
                ))}
        </div>
    )
}

export default Pagination
