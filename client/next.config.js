module.exports = {
    async rewrites() {
      return [
        {
            source: '/posts',
            destination: 'http://localhost:3001/posts',
        },
        {
            source: '/posts/:id',
            destination: 'http://localhost:3001/posts/:id',
        },
      ]
    }
  };