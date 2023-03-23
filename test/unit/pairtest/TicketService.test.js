import TicketService from "./TicketService.js";
import TicketHelper from "./lib/TicketHelper.js";
var ticketService = new TicketService();

describe("Testing the TicketService class functions", () => {
    
    describe("Testing the purchaseTickets function with different data", () => {
        
        test("Testing with correct data", async () => {
            var accountId = 1;
            var testData = {
                "ADULT" : 10,
                "CHILD" : 5,
                "INFANT" : 1
              };
            var validatedTestData = TicketHelper.validateTicketTypes(testData);
            var expectedJSONResult = {
                success: true,
                purchasedTickets: TicketHelper.generatePurchasedTicketsJSON(validatedTestData),
                totalTicketPrice: TicketHelper.calculateTicketPrices(validatedTestData),
                totalReservedSeats: TicketHelper.calculateSeating(validatedTestData)
            };
            try{
                expect(ticketService.purchaseTickets(accountId, testData)).toStrictEqual(expectedJSONResult);
            }catch(err){
                expect(err.message).toBe("");
            }
        });

        test("Testing with more than 20 tickets", async () => {
            var accountId = 1;
            var testData = {
                "ADULT" : 25,
                "CHILD" : 5,
                "INFANT" : 1
              };
            var validatedTestData = TicketHelper.validateTicketTypes(testData);
            var expectedJSONResult = {
                success: true,
                purchasedTickets: TicketHelper.generatePurchasedTicketsJSON(validatedTestData),
                totalTicketPrice: TicketHelper.calculateTicketPrices(validatedTestData),
                totalReservedSeats: TicketHelper.calculateSeating(validatedTestData)
            };
            try{
                expect(ticketService.purchaseTickets(accountId, testData)).toStrictEqual(expectedJSONResult);
            }catch(err){
                expect(err.message).toBe("You can only order a maximum of 20 tickets at one time.");
            }
        });

        test("Testing with no adult tickets", async () => {
            var accountId = 1;
            var testData = {
                "ADULT" : 0,
                "CHILD" : 5,
                "INFANT" : 1
              };
            var validatedTestData = TicketHelper.validateTicketTypes(testData);
            var expectedJSONResult = {
                success: true,
                purchasedTickets: TicketHelper.generatePurchasedTicketsJSON(validatedTestData),
                totalTicketPrice: TicketHelper.calculateTicketPrices(validatedTestData),
                totalReservedSeats: TicketHelper.calculateSeating(validatedTestData)
            };
            try{
                expect(ticketService.purchaseTickets(accountId, testData)).toStrictEqual(expectedJSONResult);
            }catch(err){
                expect(err.message).toBe("You must have at least 1 adult ticket.");
            }
        });

        test("Testing with more infant than adult tickets", async () => {
            var accountId = 1;
            var testData = {
                "ADULT" : 1,
                "CHILD" : 5,
                "INFANT" : 3
              };
            var validatedTestData = TicketHelper.validateTicketTypes(testData);
            var expectedJSONResult = {
                success: true,
                purchasedTickets: TicketHelper.generatePurchasedTicketsJSON(validatedTestData),
                totalTicketPrice: TicketHelper.calculateTicketPrices(validatedTestData),
                totalReservedSeats: TicketHelper.calculateSeating(validatedTestData)
            };
            try{
                expect(ticketService.purchaseTickets(accountId, testData)).toStrictEqual(expectedJSONResult);
            }catch(err){
                expect(err.message).toBe("You must have 1 adult ticket per infant ticket.");
            }
        });

        test("Testing with accountId equal to zero", async () => {
            var accountId = 0;
            var testData = {
                "ADULT" : 1,
                "CHILD" : 5,
                "INFANT" : 3
              };
            var validatedTestData = TicketHelper.validateTicketTypes(testData);
            var expectedJSONResult = {
                success: true,
                purchasedTickets: TicketHelper.generatePurchasedTicketsJSON(validatedTestData),
                totalTicketPrice: TicketHelper.calculateTicketPrices(validatedTestData),
                totalReservedSeats: TicketHelper.calculateSeating(validatedTestData)
            };
            try{
                expect(ticketService.purchaseTickets(accountId, testData)).toStrictEqual(expectedJSONResult);
            }catch(err){
                expect(err.message).toBe("accountId must be valid.");
            }
        });

        test("Testing with tickets object not valid", async () => {
            var accountId = 1;
            var testData = {};
            var validatedTestData = TicketHelper.validateTicketTypes(testData);
            var expectedJSONResult = {
                success: true,
                purchasedTickets: TicketHelper.generatePurchasedTicketsJSON(validatedTestData),
                totalTicketPrice: TicketHelper.calculateTicketPrices(validatedTestData),
                totalReservedSeats: TicketHelper.calculateSeating(validatedTestData)
            };
            try{
                expect(ticketService.purchaseTickets(accountId)).toStrictEqual(expectedJSONResult);
            }catch(err){
                expect(err.message).toBe("Tickets object must be valid.");
            }
        });
    });
});