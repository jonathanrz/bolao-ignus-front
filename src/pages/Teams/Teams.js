import React from 'react'
import { Query } from 'react-apollo'
import { sortBy } from 'lodash'

import Loader from 'app/components/Loader'
import Table from 'app/components/Table'
import query from 'app/queries/Teams'

const columns = [
  { title: 'Nome', key: 'name', width: '50%', type: 'text' },
  { title: 'Iniciais', key: 'initials', width: '50%', type: 'text' }
]

function Teams({ data }) {
  return <Table data={sortBy(data, 'name')} columns={columns} />
}

const TeamsQuery = () => (
  <Query query={query}>
    {({ loading, error, data }) => {
      if (loading) return <Loader message={'Buscando times'} />
      if (error) return error.map(error => <div key={error}>{error.message}</div>)
      return <Teams data={data.teams} />
    }}
  </Query>
)

export default TeamsQuery
