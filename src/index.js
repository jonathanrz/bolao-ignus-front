import React from 'react'
import { render } from 'react-dom'
import { HashRouter as Router, Route } from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import Login from './pages/Login'
import Teams from './pages/Teams'
import Matchs from './pages/Matchs'
import Hunchs from './pages/Hunchs'
import Results from './pages/Results'

const client = new ApolloClient({
  uri: __API_URL__ || 'https://bolao-ignus-prd.herokuapp.com/', //eslint-disable-line no-undef
  request: async operation => {
    const token = localStorage.getItem('token')
    if (token) {
      operation.setContext({
        headers: {
          authorization: token
        }
      })
    }
  }
})

const ApolloApp = () => (
  <ApolloProvider client={client}>
    <Router>
      <div>
        <Route exact path="/" component={Hunchs} />
        <Route path="/login" component={Login} />
        <Route path="/teams" component={Teams} />
        <Route path="/matchs" component={Matchs} />
        <Route path="/results" component={Results} />
      </div>
    </Router>
  </ApolloProvider>
)

render(<ApolloApp />, document.querySelector('#app'))
