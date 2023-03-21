import express from 'express';
import {ticketRouter} from './routers/ticketRouter.js'
const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Default Route')
})

app.use('/tickets', ticketRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})