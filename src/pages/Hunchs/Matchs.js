import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import { sortBy } from 'lodash'

import Loader from 'app/components/Loader'
import query from 'app/queries/Matchs'

import Form from './Form'

function Hunchs({ data, createHunch }) {
  return (
    <Fragment>
      {data.map(match => <Form key={match.id} match={match} createHunch={createHunch} />)}
    </Fragment>
  )
}

const HunchsQuery = ({ createHunch }) => (
  <Query query={query}>
    {({ loading, error, data }) => {
      if (loading) return <Loader message={'Buscando jogos'} />
      if (error) return error.map(error => <div key={error}>{error.message}</div>)
      return <Hunchs data={sortBy(data.matchs, 'date')} createHunch={createHunch} />
    }}
  </Query>
)

export default HunchsQuery
