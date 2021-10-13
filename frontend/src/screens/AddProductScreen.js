import React, { useState } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { addProduct } from '../actions/productActions'
import Message from '../components/Message'

import './css/AddProductScreen.css'

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
                <table className='addProductTable'>
                    <thead>
                        <tr>
                            <th colSpan='2'>fill product details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <label htmlFor='pr_name'>Product Name</label>
                            </td>
                            <td>
                                <input
                                    type='text'
                                    value={pname}
                                    onChange={(e) => setPname(e.target.value)}
                                    id='pr_name'
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <label htmlFor='pr_image'>Product Image</label>
                            </td>
                            <td>
                                <input
                                    className='imageInput'
                                    type='file'
                                    onChange={uploadHandler}
                                    id='pr_image'
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <label htmlFor='pr_brand'>Product Brand</label>
                            </td>
                            <td>
                                <input
                                    type='text'
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                    id='pr_brand'
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <label htmlFor='pr_category'>
                                    Product Category
                                </label>
                            </td>
                            <td>
                                <select
                                    name='category'
                                    id='pr_category'
                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
                                >
                                    <option value='Electronics'>
                                        Electronics
                                    </option>
                                    <option value='Lifestyle'>Lifestyle</option>
                                    <option value='Appliance'>Appliance</option>
                                    <option value='Clothing'>Clothing</option>
                                    <option value='Groceries'>Groceries</option>
                                </select>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <label htmlFor='pr_description'>
                                    Product Description
                                </label>
                            </td>
                            <td>
                                <textarea
                                    value={desc}
                                    onChange={(e) => setDesc(e.target.value)}
                                    id='pr_description'
                                    cols='30'
                                    rows='5'
                                ></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor='pr_price'>
                                    Product Price(&#8377;)
                                </label>
                            </td>
                            <td>
                                <input
                                    type='text'
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    id='pr_price'
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <label htmlFor='pr_count'>Product Count</label>
                            </td>
                            <td>
                                <input
                                    type='text'
                                    value={count}
                                    onChange={(e) => setCount(e.target.value)}
                                    id='pr_count'
                                />
                            </td>
                        </tr>

                        <tr>
                            <td colSpan='2'>
                                <input
                                    type='submit'
                                    value='ADD'
                                    className='addProductButton'
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </>
    )
}

export default AddProductScreen
