import React from 'react'
import { Mutation } from 'react-apollo'

import query from 'app/queries/Hunchs'
import mutation from 'app/mutations/CreateHunch'
import requireAuth from 'app/lib/requireAuth'
import Layout from 'app/components/Layout'

import Hunchs from './Hunchs'

class HunchsPage extends React.Component {
  createHunch = data => {
    this.props.createHunch({
      variables: { data }
    })
  }

  render() {
    return (
      <Layout title="Palpites">
        <Hunchs createHunch={this.createHunch} />
      </Layout>
    )
  }
}

const Page = requireAuth(HunchsPage)

const ConnectedTeamsPage = () => (
  <Mutation mutation={mutation} refetchQueries={[{ query }]}>
    {(createHunch, response) => <Page createHunch={createHunch} response={response || {}} />}
  </Mutation>
)

export default ConnectedTeamsPage
