import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDirections as direction } from '@fortawesome/free-solid-svg-icons'

const PaymentSuccessScreen = () => {
    const history = useHistory()

    useEffect(() => {
        let element = document.getElementById('dynamicTxtSpan')
        setInterval(() => {
            let txt = element.innerHTML
            element.innerHTML = txt + '.'
        }, 500)

        setTimeout(() => {
            history.push('/')
        }, 3000)
    }, [history])

    return (
        <div style={{ textAlign: 'center', marginTop: '10%' }}>
            <h1
                style={{
                    fontSize: '2rem',
                    textTransform: 'uppercase',
                    padding: '1rem',
                }}
            >
                Payment Successful!
            </h1>
            <Link
                style={{
                    textDecoration: 'none',
                    fontSize: '1.5rem',
                    borderRadius: '5px',
                    backgroundColor: 'orange',
                    padding: '0.5rem',
                }}
                to='/'
            >
                <FontAwesomeIcon icon={direction} />{' '}
                <span id='dynamicTxtSpan'>Redirecting</span>
            </Link>
        </div>
    )
}

export default PaymentSuccessScreen
