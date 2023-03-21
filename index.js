import express from 'express';
import {ticketRouter} from './routers/ticketRouter.js';
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendStatus(404);
});

app.use('/tickets', ticketRouter);

app.listen(port, () => {
  console.log(`CinemaTickets app listening on port ${port}`);
});