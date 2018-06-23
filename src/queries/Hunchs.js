import gql from 'graphql-tag'

export default gql`
  {
    hunchs {
      id
      match {
        id
        team1 {
          initials
          name
        }
        team2 {
          initials
          name
        }
      }
      team1Score
      team2Score
    }
  }
`
