import TicketTypeRequest from './lib/TicketTypeRequest.js';
import InvalidPurchaseException from './lib/InvalidPurchaseException.js';
import TicketPaymentService from '../thirdparty/paymentgateway/TicketPaymentService.js';
import SeatReservationService from '../thirdparty/seatbooking/SeatReservationService.js';
import TicketHelper from './lib/TicketHelper.js';

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */

  purchaseTickets(accountId, tickets) {
    if(accountId === 0) {
      throw new InvalidPurchaseException("accountId must be valid.");
    }

    if(!tickets) {
      throw new InvalidPurchaseException("Tickets object must be valid.");
    }

    const ticketHelper = new TicketHelper();
    const ticketData = ticketHelper.validateTicketTypes(tickets);
    const purchasedTickets = ticketHelper.generatePurchasedTicketsJSON(ticketData);

    ticketHelper.authoriseTickets(ticketData);

    const totalPrice = ticketHelper.calculateTicketPrices(ticketData);
    const totalSeating = ticketHelper.calculateSeating(ticketData);
    const paymentService = new TicketPaymentService();
    const seatingService = new SeatReservationService();

    console.log(`Total price is: £${totalPrice}`);
    console.log(`Total seating required is: ${totalSeating} seats.`);

    paymentService.makePayment(accountId, totalPrice);
    console.log(`Payment of £${totalPrice} has been successfully taken.`);

    seatingService.reserveSeat(accountId, totalSeating);
    console.log(`${totalSeating} seats have been successfully reserved.`);

    return {
      success: true,
      purchasedTickets: purchasedTickets,
      totalTicketPrice: totalPrice,
      totalReservedSeats: totalSeating
    }
  }
}
