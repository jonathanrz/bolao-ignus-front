import React from 'react'

import requireAuth from 'app/lib/requireAuth'
import Layout from 'app/components/Layout'

import Teams from './Teams'

const TeamsPage = () => {
  return (
    <Layout title="Times">
      <Teams />
    </Layout>
  )
}

export default requireAuth(TeamsPage)
