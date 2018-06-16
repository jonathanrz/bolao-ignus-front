import React from 'react'
import { Mutation } from 'react-apollo'

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

const Page = requireAuth(TeamsPage)

const ConnectedTeamsPage = () => (
  <Mutation mutation={mutation}>
    {(createTeam, response) => <Page createTeam={createTeam} response={response || {}} />}
  </Mutation>
)

export default ConnectedTeamsPage
