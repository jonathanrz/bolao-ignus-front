import React from 'react'
import { Query } from 'react-apollo'
import { withRouter } from 'react-router-dom'

import query from 'app/queries/CurrentUser'

export default WrappedComponent => {
  function RequireAuth(props) {
    return (
      <Query query={query}>
        {({ loading, error, data }) => {
          if (!loading && !data.me) props.history.push('/login')
          return <WrappedComponent {...props} />
        }}
      </Query>
    )
  }

  return withRouter(RequireAuth)
}
