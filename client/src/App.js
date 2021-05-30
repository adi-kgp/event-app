import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Landing from './components/layout/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Alert from './components/layout/Alert'
import { loadUser } from './actions/auth'
import { useEffect } from 'react'
import setAuthToken from './utils/setAuthtoken'
import Navbar from './components/layout/Navbar'
import Events from './components/events/Events'
import PrivateRoute from './components/routing/privateroute'

//Redux
import store from './store'
import { Provider } from 'react-redux'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path='/events' component={Events} />
            </Switch>
          </section>
        </>
      </Router>
    </Provider>
  )
}

export default App
