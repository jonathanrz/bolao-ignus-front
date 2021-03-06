import React from 'react'
import { Mutation } from 'react-apollo'
import { withRouter } from 'react-router-dom'

import mutation from 'app/mutations/Login'

import Layout from 'app/components/Layout'
import Loader from 'app/components/Loader'

import LoginForm from './Form'

class Login extends React.Component {
  executeLogin = ({ email, password }) => {
    this.props.requestLogin({
      variables: { email, password }
    })
  }

  renderErrors = errors => errors.map(error => <div key={error}>{error.message}</div>)

  componentDidUpdate() {
    const { data } = this.props.response
    if (data) {
      localStorage.setItem('token', `Bearer ${data.login}`)
      this.props.history.push('/')
    }
  }

  render() {
    const { loading, errors } = this.props.response

    return (
      <Layout title="Entrar" sider={false}>
        {loading ? (
          <Loader message={'Executando Login'} />
        ) : errors ? (
          this.renderErrors(errors)
        ) : (
          <LoginForm executeLogin={this.executeLogin} />
        )}
      </Layout>
    )
  }
}

const RouteredLogin = withRouter(Login)

const ConnectedLogin = () => (
  <Mutation mutation={mutation}>
    {(requestLogin, response) => (
      <RouteredLogin requestLogin={requestLogin} response={response || {}} />
    )}
  </Mutation>
)

export default ConnectedLogin
