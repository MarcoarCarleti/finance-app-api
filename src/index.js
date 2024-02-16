import 'dotenv/config.js'
import express from 'express'
import { PostgresHelper } from './db/postgres/helper.js'

const app = express()

app.use(express.json())

app.get('/api/users', async (req, res) => {
    const results = await PostgresHelper.query('SELECT * FROM users')

    return res.send(JSON.stringify(results))
})

app.post('/api/users', async (req, res) => {
    console.log(req.body)
    console.log(req.headers)
    res.statusCode(201).send('User created successfully!')
})

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})
