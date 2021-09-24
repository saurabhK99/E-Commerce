import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getUsersList } from '../actions/userActions'
import UserPanel from '../components/UserPanel'

import Loading from '../components/Loading'
import Message from '../components/Message'

const UserListScreen = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsersList())
    }, [dispatch])

    const usersGetList = useSelector((s) => s.usersGetList)

    const { error, loading, usersList } = usersGetList

    return (
        <>
            {loading ? (
                <Loading />
            ) : error ? (
                <Message type='error'>{error}</Message>
            ) : (
                usersList.length > 0 && (
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email Address</th>
                                <th>Admin</th>
                                <th>Remove </th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersList.map((user) => (
                                <UserPanel key={user._id} info={user} />
                            ))}
                        </tbody>
                    </table>
                )
            )}
        </>
    )
}

export default UserListScreen
