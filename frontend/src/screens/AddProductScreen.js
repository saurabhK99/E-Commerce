import React, { useState } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { addProduct } from '../actions/productActions'
import Message from '../components/Message'

const AddProductScreen = () => {
    const [pname, setPname] = useState('')
    const [brand, setBrand] = useState('')
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('Electronics')
    const [desc, setDesc] = useState('')
    const [price, setPrice] = useState('')
    const [count, setCount] = useState('')

    const dispatch = useDispatch()

    const addStatus = useSelector((s) => s.productAddStatus)
    const userInfo = useSelector((s) => s.userLogin.userInfo)

    const addHandler = (e) => {
        e.preventDefault()
        let productBody = {
            user: userInfo._id,
            name: pname,
            image,
            brand,
            description: desc,
            category,
            price,
            countInStock: count,
        }

        dispatch(addProduct(productBody))
    }

    const uploadHandler = async (e) => {
        const file = e.target.files[0]

        let formData = new FormData()

        formData.append('image', file)

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
        try {
            const { data } = await axios.post('/api/uploads', formData, config)
            setImage((prevVal) => (prevVal = data))
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            {addStatus.status && addStatus.status.success && (
                <section>
                    <Message type='success'>{addStatus.status.success}</Message>
                </section>
            )}
            <form onSubmit={addHandler}>
                <input
                    type='text'
                    value={pname}
                    onChange={(e) => setPname(e.target.value)}
                    placeholder='Product Name'
                />
                <input type='file' onChange={uploadHandler} />
                <input
                    type='text'
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder='Brand'
                />
                <span>
                    Category:{' '}
                    <select
                        name='category'
                        id='category'
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value='Electronics'>Electronics</option>
                        <option value='Lifestyle'>Lifestyle</option>
                        <option value='Appliance'>Appliance</option>
                        <option value='Clothing'>Clothing</option>
                        <option value='Groceries'>Groceries</option>
                    </select>
                </span>
                <input
                    type='text'
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder='Description'
                />
                <input
                    type='text'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder='Price'
                />
                <input
                    type='text'
                    value={count}
                    onChange={(e) => setCount(e.target.value)}
                    placeholder='Count In Stock'
                />
                <input type='submit' value='ADD' />
            </form>
        </>
    )
}

export default AddProductScreen
