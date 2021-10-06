import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons'

const Rating = ({ rating }) => {
    return (
        <>
            {[...Array(5).keys()].map((k) =>
                k < Math.ceil(Number(rating)) ? (
                    k < Math.floor(Number(rating)) ? (
                        <FontAwesomeIcon
                            key={k}
                            icon={faStar}
                            style={{
                                color: 'orange',
                            }}
                        />
                    ) : (
                        <FontAwesomeIcon
                            key={k}
                            icon={faStarHalfAlt}
                            style={{
                                color: 'orange',
                            }}
                        />
                    )
                ) : (
                    <FontAwesomeIcon
                        key={k}
                        icon={faStar}
                        style={{
                            color: 'grey',
                        }}
                    />
                )
            )}
        </>
    )
}

export default Rating
