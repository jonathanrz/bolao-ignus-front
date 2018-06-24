import gql from 'graphql-tag'

export default gql`
  mutation CreateHunch($data: HunchInput!) {
    createHunch(data: $data) {
      id
    }
  }
`
