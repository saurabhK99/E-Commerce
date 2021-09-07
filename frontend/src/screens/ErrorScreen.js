import React from 'react'

const ErrorScreen = () => {
    return (
        <>
            <div
                className='errorContainer'
                style={{
                    textAlign: 'center',
                    marginTop: '2em',
                    minHeight: 'calc(100vh - 160px)',
                }}
            >
                <h1>Error 404</h1>
                <h3>Page Not Found</h3>
            </div>
        </>
    )
}

export default ErrorScreen
