import React from 'react'
import { Query } from 'react-apollo'
import { orderBy } from 'lodash'

import Loader from 'app/components/Loader'
import Table from 'app/components/Table'
import query from 'app/queries/Points'

const columns = [
  { title: 'Usuário', key: 'name', width: '50%', type: 'text' },
  { title: 'Pontos', key: 'points', width: '50%', type: 'number' }
]

function Ranking({ data }) {
  return <Table data={data} columns={columns} />
}

const RankingQuery = () => (
  <Query query={query}>
    {({ loading, error, data }) => {
      if (loading) return <Loader message={'Buscando ranking'} />
      if (error) return error.map(error => <div key={error}>{error.message}</div>)
      return <Ranking data={orderBy(data.points, ['points'], ['desc'])} />
    }}
  </Query>
)

export default RankingQuery
