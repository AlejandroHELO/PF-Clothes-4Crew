import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import store from './redux/store'
import axios from 'axios'
import { BrowserRouter as Router } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'

axios.defaults.baseURL = process.env.REACT_APP_API || 'http://localhost:3001'
console.log(window.location.origin)
ReactDOM.render(
    <Auth0Provider
    domain={process.env.REACT_APP_AUTH_DOMAIN}
    clientId={process.env.REACT_APP_CLIENT_ID}
    audience={process.env.REACT_APP_AUDIENCE}
    redirectUri={window.location.origin}
    >
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    </Auth0Provider>
    ,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
