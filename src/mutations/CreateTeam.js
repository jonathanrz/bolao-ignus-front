import gql from 'graphql-tag'

export default gql`
  mutation CreateTeam($data: TeamInput!) {
    createTeam(data: $data) {
      id
    }
  }
`
