import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import ErrorScreen from './screens/ErrorScreen'

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path='/' component={HomeScreen} exact />
        <Route path='/product/:id' component={ProductScreen} />
        <Route path='*' component={ErrorScreen} />
      </Switch>
      <Footer />
    </>
  )
}

export default App
