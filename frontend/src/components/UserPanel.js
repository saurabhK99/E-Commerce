import React from 'react'
import { useDispatch } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import './css/CommonPanel.css'

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
                <FontAwesomeIcon
                    className='deleteUser'
                    icon={faTrashAlt}
                    onClick={deleteUserHandler}
                />
            </td>
        </tr>
    )
}

export default UserPanel
