// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express')
const app = express()
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cors = require('cors')
// const { error } = require('console')
const port = 8080

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello from our server!')
})

app.post('/api/auth/login', (req, res) => {
  res.send({
    data: {
      access_token: 'access_token',
      refresh_token: 'refresh_token',
    },
    status: 200,
  })
})

app.post('/api/auth/refresh', (req, res) => {
  // res.send({
  //   data: {
  //     access_token: 'access_token new',
  //     refresh_token: 'refresh_token new',
  //   },
  //   status: 200,
  // })

  // send error token expired
  res.status(401).send({
    data: null,
    status: 401,
    error: {
      code: 'access_token_expired',
      message: 'Unauthorized',
    },
  })
})

app.get('/api/auth/profile', (req, res) => {
  res.send({
    data: {
      id: '1',
      name: 'Name',
      email: 'email@example.com',
      role: 1,
    },
    status: 200,
  })
})

app.get('/api/test/unauthenticated', (req, res) => {
  res.status(401).send({
    data: null,
    status: 401,
    error: {
      code: 'access_token_expired',
      message: 'Unauthorized',
    },
  })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
