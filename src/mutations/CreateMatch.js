import gql from 'graphql-tag'

export default gql`
  mutation GameMatch($data: MatchInput!) {
    createMatch(data: $data) {
      id
    }
  }
`
