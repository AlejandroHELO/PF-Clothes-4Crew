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
import env from 'react-dotenv'

axios.defaults.baseURL = 'http://localhost:3001'

ReactDOM.render(
    <Auth0Provider
        domain={env.AUTH_DOMAIN}
        clientId={`${env.CLIENT_ID}`}
        redirectUri={window.location.origin}
        audience={`${env.AUDIENCE}`}
    >
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    </Auth0Provider>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
