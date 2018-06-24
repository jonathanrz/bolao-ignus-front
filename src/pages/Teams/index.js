import React from 'react'
import { Mutation } from 'react-apollo'

import query from 'app/queries/Teams'
import mutation from 'app/mutations/CreateTeam'
import requireAuth from 'app/lib/requireAuth'
import Layout from 'app/components/Layout'

import Teams from './Teams'
import Form from './Form'

class TeamsPage extends React.Component {
  createTeam = data => {
    this.props.createTeam({
      variables: { data }
    })
  }

  render() {
    return (
      <Layout title="Times">
        <Teams />
        <Form createTeam={this.createTeam} />
      </Layout>
    )
  }
}

const ConnectedTeamsPage = () => (
  <Mutation mutation={mutation} refetchQueries={[{ query }]}>
    {(createTeam, response) => <TeamsPage createTeam={createTeam} response={response || {}} />}
  </Mutation>
)

export default requireAuth(ConnectedTeamsPage)
