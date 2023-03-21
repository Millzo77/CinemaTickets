import TicketTypeRequest from './lib/TicketTypeRequest.js';
import InvalidPurchaseException from './lib/InvalidPurchaseException.js';

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */

  purchaseTickets(accountId, tickets) {
    if(accountId === 0){
      throw new InvalidPurchaseException("AccountId must be valid!")
    }

    if(!tickets){
      throw new InvalidPurchaseException("Tickets must be valid!")
    }
    var ticketTypeKeys = Object.keys(tickets);
    var ticketClasses = {};
    //Converting from the JSON to the TicketTypeRequest classes

    ticketTypeKeys.forEach(key => {
        ticketClasses[key] = new TicketTypeRequest(key, tickets[key])
      })

    return this.authoriseTickets(ticketClasses)

    return 200
  }

  //Function to make sure the tickets are following the appriopriate business logic
  authoriseTickets(tickets){
    var adult = tickets["ADULT"]
    var child = tickets["CHILD"]
    var infant = tickets["INFANT"]

    if(adult.getNoOfTickets() < 1){
      throw new InvalidPurchaseException("You must have at least 1 adult ticket.")
    }

    if(infant.getNoOfTickets() > 0 && infant.getNoOfTickets() !== adult.getNoOfTickets()){
      throw new InvalidPurchaseException("You must have 1 adult ticket per infant ticket.")
    }

    if( (adult.getNoOfTickets() + child.getNoOfTickets() + infant.getNoOfTickets()) > 20){
      throw new InvalidPurchaseException("You can only order a maximum of 20 tickets.")
    }
  }
}
