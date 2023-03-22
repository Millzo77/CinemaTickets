import express from 'express';
import {ticketPurchase} from '../controllers/ticketController.js';
export const ticketRouter = express.Router();

// HOSTURL/tickets GET route
ticketRouter.get('/', (req, res) => {
  res.sendStatus(404);
})
// HOSTURL/tickets POST route
ticketRouter.post('/', ticketPurchase);