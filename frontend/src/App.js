import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import ErrorScreen from './screens/ErrorScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import OrderSummaryScreen from './screens/OrderSummaryScreen'
import OrderDetailsScreen from './screens/OrderDetailsScreen'
import UserListScreen from './screens/UserListScreen'
import ProductListScreen from './screens/ProductListScreen'
import AddProductScreen from './screens/AddProductScreen'
import OrdersListScreen from './screens/OrdersListScreen'
import AdminScreen from './screens/AdminScreen'

const App = () => {
    return (
        <Router>
            <Header />
            <div className='appContainer'>
                <Switch>
                    <Route path='/' component={HomeScreen} exact />
                    <Route path='/product/:id' component={ProductScreen} />
                    <Route path='/cart/:id?' component={CartScreen} />
                    <Route path='/login' component={LoginScreen} />
                    <Route path='/register' component={RegisterScreen} />
                    <Route path='/profile' component={ProfileScreen} />
                    <Route
                        path='/order-summary'
                        component={OrderSummaryScreen}
                    />
                    <Route path='/order/:id' component={OrderDetailsScreen} />
                    <Route exact path='/admin' component={AdminScreen} />
                    <Route path='/admin/users' component={UserListScreen} />
                    <Route
                        path='/admin/products'
                        component={ProductListScreen}
                    />
                    <Route
                        path='/admin/add-product'
                        component={AddProductScreen}
                    />
                    <Route path='/admin/orders' component={OrdersListScreen} />

                    <Route path='*' component={ErrorScreen} />
                </Switch>
            </div>
            <Footer />
        </Router>
    )
}

export default App
