module.exports = {
  type: 'react-app',
  webpack: {
    publicPath: '',
    define: {
      __API_URL__: JSON.stringify(process.env.API_URL)
    }
  },
  babel: {
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            app: './src'
          }
        }
      ],
      ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }]
    ]
  },
  karma: {
    testContext: 'enzyme.js'
  }
}
