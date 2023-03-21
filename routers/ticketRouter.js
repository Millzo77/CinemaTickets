import express from 'express';
import {ticketPurchase} from '../controllers/ticketController.js'
export const ticketRouter = express.Router()


// middleware that is specific to this router
ticketRouter.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
ticketRouter.get('/', (req, res) => {
  res.send('')
})
// define the about route
ticketRouter.post('/', ticketPurchase)