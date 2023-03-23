import TicketTypeRequest from "./TicketTypeRequest.js";

describe("Testing the TicketTypeRequest class for valid ticket types", () => {
    var adultTicket = new TicketTypeRequest("ADULT", 10);
    var childTicket = new TicketTypeRequest("CHILD", 5);
    var infantTicket = new TicketTypeRequest("INFANT", 1);
    
    test("Testing the getNoOfTickets function for all types of tickets", async () => {
        expect(adultTicket.getNoOfTickets()).toBe(10);
        expect(childTicket.getNoOfTickets()).toBe(5);
        expect(infantTicket.getNoOfTickets()).toBe(1);
    });

    test("Testing the getTicketType function for all types of tickets", async () => {
        expect(adultTicket.getTicketType()).toBe("ADULT");
        expect(childTicket.getTicketType()).toBe("CHILD");
        expect(infantTicket.getTicketType()).toBe("INFANT");
    });

    test("Testing the getTicketPrice function for all types of tickets", async () => {
        expect(adultTicket.getTicketPrice()).toBe(20);
        expect(childTicket.getTicketPrice()).toBe(10);
        expect(infantTicket.getTicketPrice()).toBe(0);
    });

    test("Testing the getTotalTicketPrice function for all types of tickets", async () => {
        expect(adultTicket.getTotalTicketPrice()).toBe(200);
        expect(childTicket.getTotalTicketPrice()).toBe(50);
        expect(infantTicket.getTotalTicketPrice()).toBe(0);
    });
});

describe("Testing the TicketTypeRequest class for errors", () => {

    test("Testing class instantiation with incorrect ticket type input", async () => {
        try{
            var incorrectTicketType = new TicketTypeRequest("TEEN", 10);
        }catch(err){
            expect(err.message).toBe("type must be ADULT, CHILD, or INFANT");
        }
    });

    test("Testing class instantiation with incorrect number of tickets variable", async () => {
        try{
            var incorrectNoOfTickets = new TicketTypeRequest("ADULT", "NON NUMBER");
        }catch(err){
            expect(err.message).toBe("noOfTickets must be an integer");
        }
    });
});

describe("Testing the TicketTypeRequest class static variables", () => {

    test("Testing the static variable ValidTicketTypes", async () => {
        var validTicketTypes = Object.keys(TicketTypeRequest.ValidTicketTypes);
        var ticketPrices = Object.values(TicketTypeRequest.ValidTicketTypes);

        expect(validTicketTypes).toStrictEqual(['ADULT', 'CHILD', 'INFANT']);
        expect(ticketPrices).toStrictEqual([20, 10, 0]);
    });
});