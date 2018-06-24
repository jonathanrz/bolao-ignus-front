import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import { sortBy, find } from 'lodash'

import Loader from 'app/components/Loader'
import matchQuery from 'app/queries/Matchs'
import hunchQuery from 'app/queries/Hunchs'

import Form from './Form'

function Hunchs({ matchs, hunchs, createHunch }) {
  return (
    <Fragment>
      {matchs.map(match => (
        <Form
          key={match.id}
          match={match}
          hunch={find(hunchs, { match: { id: match.id } })}
          createHunch={createHunch}
        />
      ))}
    </Fragment>
  )
}

const HunchsQuery = ({ createHunch }) => (
  <Query query={matchQuery}>
    {({ loading: matchLoading, error: matchError, data: matchData }) => (
      <Query query={hunchQuery}>
        {({ loading: hunchLoading, error: hunchError, data: hunchData }) => {
          if (matchLoading) return <Loader message={'Buscando jogos'} />
          if (hunchLoading) return <Loader message={'Buscando palpites'} />
          if (matchError) return matchError.map(error => <div key={error}>{error.message}</div>)
          if (hunchError) return hunchError.map(error => <div key={error}>{error.message}</div>)
          return (
            <Hunchs
              matchs={sortBy(matchData.matchs, 'date')}
              hunchs={hunchData.hunchs}
              createHunch={createHunch}
            />
          )
        }}
      </Query>
    )}
  </Query>
)

export default HunchsQuery
