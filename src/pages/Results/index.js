import React from 'react'
import { Mutation } from 'react-apollo'
import { message } from 'antd'

import query from 'app/queries/Results'
import mutation from 'app/mutations/CreateResult'
import requireAuth from 'app/lib/requireAuth'
import Layout from 'app/components/Layout'

import Results from './Results'

class ResultsPage extends React.Component {
  createResult = data => {
    this.props.createResult({
      variables: { data }
    })
  }

  render() {
    const { response } = this.props
    if (response.data) message.success('Resultado salvo com sucesso')
    return (
      <Layout title="Resultados">
        <Results createResult={this.createResult} />
      </Layout>
    )
  }
}

const Page = requireAuth(ResultsPage)

const ConnectedTeamsPage = () => (
  <Mutation mutation={mutation} refetchQueries={[{ query }]}>
    {(createResult, response) => <Page createResult={createResult} response={response || {}} />}
  </Mutation>
)

export default ConnectedTeamsPage
