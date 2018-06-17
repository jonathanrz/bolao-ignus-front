import React from 'react'
import { Mutation } from 'react-apollo'

import query from 'app/queries/Matchs'
import mutation from 'app/mutations/CreateMatch'
import requireAuth from 'app/lib/requireAuth'
import Layout from 'app/components/Layout'

import Matchs from './Matchs'
import Form from './Form'

class TeamsPage extends React.Component {
  createMatch = data => {
    this.props.createMatch({
      variables: { data }
    })
  }

  render() {
    return (
      <Layout title="Jogos">
        <Matchs />
        <Form createMatch={this.createMatch} />
      </Layout>
    )
  }
}

const Page = requireAuth(TeamsPage)

const ConnectedTeamsPage = () => (
  <Mutation mutation={mutation} refetchQueries={[{ query }]}>
    {(createMatch, response) => <Page createMatch={createMatch} response={response || {}} />}
  </Mutation>
)

export default ConnectedTeamsPage
