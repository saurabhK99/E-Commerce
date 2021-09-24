import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { userUpdateProfile } from '../actions/userActions'

import './css/Shipping.css'

const Shipping = () => {
    const dispatch = useDispatch()

    const shippingAddress = useSelector(
        (state) => state.userLogin.userInfo.shippingAddress
    )

    const [address, setAddress] = useState(
        shippingAddress.address !== ' ' ? shippingAddress.address : null
    )
    const [postalCode, setPostalCode] = useState(
        shippingAddress.postalCode !== ' ' ? shippingAddress.postalCode : null
    )
    const [city, setCity] = useState(
        shippingAddress.city !== ' ' ? shippingAddress.city : null
    )
    const [state, setState] = useState(
        shippingAddress.state !== ' ' ? shippingAddress.state : null
    )

    const submitUpdateHandler = (e) => {
        e.preventDefault()

        dispatch(
            userUpdateProfile({
                shippingAddress: { address, city, state, postalCode },
            })
        )
    }

    return (
        <div className='shippingContainer'>
            <strong style={{ fontSize: '2em', marginBottom: '1em' }}>
                Shipping Details
            </strong>

            <form className='shippingForm'>
                <input
                    type='text'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder='Address'
                />

                <input
                    type='text'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder='City'
                />

                <input
                    type='text'
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder='State'
                />
                <input
                    type='text'
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder='Postal Code'
                />
                <button
                    className='shippingUpdateButton'
                    onClick={submitUpdateHandler}
                >
                    Update
                </button>
            </form>
        </div>
    )
}

export default Shipping
