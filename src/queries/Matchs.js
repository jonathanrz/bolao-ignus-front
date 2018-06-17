import gql from 'graphql-tag'

export default gql`
  {
    matchs {
      id
      date
      team1 {
        initials
        name
      }
      team2 {
        initials
        name
      }
    }
  }
`
