import React from 'react'

import requireAuth from 'app/lib/requireAuth'
import Layout from 'app/components/Layout'

import Ranking from './Ranking'

class PointsPage extends React.Component {
  render() {
    return (
      <Layout title="Ranking">
        <Ranking />
      </Layout>
    )
  }
}

export default requireAuth(PointsPage)
