import React from 'react'

const Review = ({ review }) => {
    return (
        <div className='reviewBoxConatiner'>
            <span>
                <span>{review.name}</span> {`${review.rating} out of 5`}
            </span>
            <span>{review.comment}</span>
        </div>
    )
}

export default Review
