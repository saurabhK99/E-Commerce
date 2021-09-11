import React from 'react'

import './css/Message.css'

const Message = ({ type, children }) => {
    return (
        <>
            {type === 'success' && (
                <div className='messageContainer success'>{children}</div>
            )}

            {type === 'error' && (
                <div className='messageContainer error'>{children}</div>
            )}
        </>
    )
}

export default Message
