import gql from 'graphql-tag'

export default gql`
  query HunchPoints($id: Int!) {
    hunchPoints(hunchId: $id) {
      points
    }
  }
`
