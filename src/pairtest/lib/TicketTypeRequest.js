/**
 * Immutable Object.
 */

export default class TicketTypeRequest {
  //Ticket types are scaleable. Add a new ticket type to the ValidTicketTypes JSON alongside the price for the ticket.
  static ValidTicketTypes = {
    "ADULT" : 20,
    "CHILD" : 10,
    "INFANT" : 0
  };
  #type;
  #noOfTickets;

  constructor(type, noOfTickets) {
    if (!Object.keys(TicketTypeRequest.ValidTicketTypes).includes(type)) {
      throw new TypeError(`type must be ${this.#generateTypeError()}`);
    }

    if (!Number.isInteger(noOfTickets)) {
      throw new TypeError('noOfTickets must be an integer');
    }

    this.#type = type;
    this.#noOfTickets = noOfTickets;
  }

  //Generates a dynamic string of every valid ticket type in the array.
  #generateTypeError(){
    var errorString = "";
    Object.keys(TicketTypeRequest.ValidTicketTypes).forEach(ticketType => {
      if(ticketType !== Object.keys(TicketTypeRequest.ValidTicketTypes)[Object.keys(TicketTypeRequest.ValidTicketTypes).length - 1]){
        errorString += `${ticketType}, `;
      } else{
        errorString += `or ${ticketType}`;
      }
    });
    return errorString;
  }

  getNoOfTickets() {
    return this.#noOfTickets;
  }

  getTicketType() {
    return this.#type;
  }

  getTicketPrice(){
    return TicketTypeRequest.ValidTicketTypes[this.#type.toUpperCase()];
  }

  getTotalTicketPrice(){
    return (TicketTypeRequest.ValidTicketTypes[this.#type.toUpperCase()]) * this.getNoOfTickets();
  }
}
