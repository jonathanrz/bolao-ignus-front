import React from 'react'
import { Query } from 'react-apollo'
import { sortBy } from 'lodash'

import Loader from 'app/components/Loader'
import Table from 'app/components/Table'
import query from 'app/queries/Matchs'

const columns = [
  { title: 'Data', key: 'date', width: '30%', type: 'dateAndHour' },
  { title: 'Time 1', key: 'team1', width: '35%', type: 'text' },
  { title: 'Time 2', key: 'team2', width: '35%', type: 'text' }
]

function formatData(data) {
  return {
    date: data.date,
    team1: `${data.team1.name}(${data.team1.initials})`,
    team2: `${data.team2.name}(${data.team2.initials})`
  }
}

function Matchs({ data }) {
  return <Table data={sortBy(data, 'date').map(formatData)} columns={columns} />
}

const MatchsQuery = () => (
  <Query query={query}>
    {({ loading, error, data }) => {
      if (loading) return <Loader message={'Buscando jogos'} />
      if (error) return error.map(error => <div key={error}>{error.message}</div>)
      return <Matchs data={data.matchs} />
    }}
  </Query>
)

export default MatchsQuery
