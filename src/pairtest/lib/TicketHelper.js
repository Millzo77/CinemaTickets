import TicketTypeRequest from './TicketTypeRequest.js';
import InvalidPurchaseException from './InvalidPurchaseException.js';
export default class TicketHelper {
    //Function to check ticket keys against the valid ticket types and removes any invalid keys.
    //This is useful as more types can be added at a later date and you will only have to add the
    //new types to the TicketTypeRequest class.
    validateTicketTypes = (tickets) => {
        const validTickets = {};
        //Converting from the JSON to the TicketTypeRequest classes.
        Object.keys(tickets).forEach(key => {
            if(Object.keys(TicketTypeRequest.ValidTicketTypes).includes(key.toUpperCase())){
                validTickets[key] = new TicketTypeRequest(key, tickets[key]);
            }
        });

        //Checks that all validTicketTypes are present, and if not, adds it in with 0 tickets purchased.
        //Checks for uppercase, lowercase and capitalised versions of the valid type array keys
        Object.keys(TicketTypeRequest.ValidTicketTypes).forEach(key => {
            if( !Object.keys(validTickets).includes(key) &&
                !Object.keys(validTickets).includes(key.toLowerCase()) &&
                !Object.keys(validTickets).includes(this.#capitaliseFirstLetter(key.toLowerCase()))){
                validTickets[key] = new TicketTypeRequest(key, 0);
            }
        });

        return validTickets;
    }

    #capitaliseFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    //Function to generate a JSON that contains all of the ticket keys with their number of tickets purchased.
    generatePurchasedTicketsJSON(tickets) {
        const purchasedTickets = {};
        Object.keys(tickets).forEach(key => {
            purchasedTickets[key] = tickets[key].getNoOfTickets();
        });

        return purchasedTickets;
    }

    //Function to make sure the tickets are following the appropriate business logic.
    authoriseTickets(tickets) {
        const adult = tickets["ADULT"];
        const child = tickets["CHILD"];
        const infant = tickets["INFANT"];

        if(adult.getNoOfTickets() < 1) {
        throw new InvalidPurchaseException("You must have at least 1 adult ticket.");
        }

        if(infant.getNoOfTickets() > 0 && infant.getNoOfTickets() !== adult.getNoOfTickets()) {
        throw new InvalidPurchaseException("You must have 1 adult ticket per infant ticket.");
        }

        if((adult.getNoOfTickets() + child.getNoOfTickets() + infant.getNoOfTickets()) > 20) {
        throw new InvalidPurchaseException("You can only order a maximum of 20 tickets at one time.");
        }

        console.log("Tickets authorised...");
        return true;
    }

    //Function to calculate the total ticket prices.
    calculateTicketPrices(tickets) {
        var total = 0;
        Object.keys(tickets).forEach(key => {
            total += tickets[key].getTotalTicketPrice();
        });

        return total;
    }

    //Function to calculate the total required seating.
    calculateSeating(tickets) {
        var total = 0;
        Object.keys(tickets).forEach(key => {
            if(tickets[key].getTicketType() !== "INFANT"){
                total += tickets[key].getNoOfTickets();
            }
        });

        return total;
    }
}