import React from 'react'
import { useDispatch } from 'react-redux'
import { getUsersList, userRemove } from '../actions/userActions'

const UserPanel = ({ info }) => {
    const dispatch = useDispatch()

    const deleteUserHandler = (e) => {
        e.preventDefault()

        dispatch(userRemove(info._id))
        dispatch(getUsersList())
    }

    return (
        <tr>
            <td>{info.name}</td>
            <td>{info.email}</td>
            <td>{info.isAdmin ? 'Yes' : 'No'}</td>
            <td>
                <button className='deleteUser' onClick={deleteUserHandler}>
                    Delete
                </button>
            </td>
        </tr>
    )
}

export default UserPanel
