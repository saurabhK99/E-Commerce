import React from 'react'

import Rating from './Rating'

import './css/Review.css'

const Review = ({ review }) => {
    return (
        <div className='reviewBoxContainer'>
            <span className='reviewerRatingContainer'>
                <span className='reviewerName'>{review.name}</span>{' '}
                <Rating rating={review.rating} />
            </span>
            <span className='reviewerComment'>{review.comment}</span>
        </div>
    )
}

export default Review
