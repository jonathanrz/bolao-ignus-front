import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import { sortBy, find } from 'lodash'

import Loader from 'app/components/Loader'
import matchQuery from 'app/queries/Matchs'
import resultQuery from 'app/queries/Results'

import Form from './Form'

function Results({ matchs, results, createResult }) {
  return (
    <Fragment>
      {matchs.map(match => (
        <Form
          key={match.id}
          match={match}
          result={find(results, { match: { id: match.id } })}
          createResult={createResult}
        />
      ))}
    </Fragment>
  )
}

const ResultQuery = ({ createResult }) => (
  <Query query={matchQuery}>
    {({ loading: matchLoading, error: matchError, data: matchData }) => (
      <Query query={resultQuery}>
        {({ loading: resultLoading, error: resultError, data: resultData }) => {
          if (matchLoading) return <Loader message={'Buscando jogos'} />
          if (resultLoading) return <Loader message={'Buscando resultados'} />
          if (matchError) return matchError.map(error => <div key={error}>{error.message}</div>)
          if (resultError) return resultError.map(error => <div key={error}>{error.message}</div>)
          return (
            <Results
              matchs={sortBy(matchData.matchs, 'date')}
              results={resultData.results}
              createResult={createResult}
            />
          )
        }}
      </Query>
    )}
  </Query>
)

export default ResultQuery
