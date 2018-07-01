import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import { sortBy, find } from 'lodash'

import Loader from 'app/components/Loader'
import matchQuery from 'app/queries/Matchs'
import hunchQuery from 'app/queries/Hunchs'
import pointsQuery from 'app/queries/HunchPoints'

import Form from './Form'

const Container = styled.div`
  max-width: 600px;
  margin: 25px;
`

function Hunchs({ matchs, hunchs, createHunch }) {
  return (
    <Fragment>
      {matchs.map(match => {
        const hunch = find(hunchs, { match: { id: match.id } })
        return (
          <Container key={match.id}>
            <Form match={match} hunch={hunch} createHunch={createHunch} />
            {hunch && (
              <Query query={pointsQuery} variables={{ id: hunch.id }}>
                {({ loading, error, data }) => {
                  if (loading) return 'Carregando pontos do palpite'
                  if (error) return null
                  const { hunchPoints } = data
                  return hunchPoints.points >= 0 ? (
                    <div>{`Pontos: ${hunchPoints.points}`}</div>
                  ) : null
                }}
              </Query>
            )}
          </Container>
        )
      })}
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
