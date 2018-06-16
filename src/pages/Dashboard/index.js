import React from 'react'

import requireAuth from 'app/lib/requireAuth'
import Layout from 'app/components/Layout'

const Dashboard = () => {
  return <Layout title="Dashboard" />
}

export default requireAuth(Dashboard)
