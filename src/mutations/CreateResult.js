import gql from 'graphql-tag'

export default gql`
  mutation CreateResult($data: ResultInput!) {
    createResult(data: $data) {
      id
    }
  }
`
