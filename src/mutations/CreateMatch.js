import gql from 'graphql-tag'

export default gql`
  mutation CreateMatch($data: MatchInput!) {
    createMatch(data: $data) {
      id
    }
  }
`
