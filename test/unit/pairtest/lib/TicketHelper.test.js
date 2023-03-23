import TicketHelper from "./TicketHelper.js";
import TicketTypeRequest from "./TicketTypeRequest.js";

describe("Testing the TicketHelper class functions", () => {
    
    describe("Testing the validateTicketTypes function with different data", () => {
        
        test("Testing with correct data", async () => {
            var testData = {
                "ADULT" : 10,
                "CHILD" : 5,
                "INFANT" : 1
              };
            var expectedJSONResult = {
                "ADULT" : new TicketTypeRequest("ADULT", 10),
                "CHILD" : new TicketTypeRequest("CHILD", 5),
                "INFANT" : new TicketTypeRequest("INFANT", 1)
            };
            expect(TicketHelper.validateTicketTypes(testData)).toStrictEqual(expectedJSONResult);
            expect(expectedJSONResult.ADULT.getNoOfTickets()).toBe(10);
            expect(expectedJSONResult.CHILD.getNoOfTickets()).toBe(5);
            expect(expectedJSONResult.INFANT.getNoOfTickets()).toBe(1);
        });

        test("Testing with some data missing", async () => {
            var testData = {
                "ADULT" : 10,
                "CHILD" : 5
            };
            var expectedJSONResult = {
                "ADULT" : new TicketTypeRequest("ADULT", 10),
                "CHILD" : new TicketTypeRequest("CHILD", 5),
                "INFANT" : new TicketTypeRequest("INFANT", 0)
            };
            expect(TicketHelper.validateTicketTypes(testData)).toStrictEqual(expectedJSONResult);
            expect(expectedJSONResult.ADULT.getNoOfTickets()).toBe(10);
            expect(expectedJSONResult.CHILD.getNoOfTickets()).toBe(5);
            expect(expectedJSONResult.INFANT.getNoOfTickets()).toBe(0);
        });

        test("Testing with some incorrect data", async () => {
            var testData = {
                "ADULT" : 10,
                "CHILD" : 5,
                "INFANT" : 1,
                "INCORRECT_DATA" : 200
            };
            var expectedJSONResult = {
                "ADULT" : new TicketTypeRequest("ADULT", 10),
                "CHILD" : new TicketTypeRequest("CHILD", 5),
                "INFANT" : new TicketTypeRequest("INFANT", 1)
            };
            expect(TicketHelper.validateTicketTypes(testData)).toStrictEqual(expectedJSONResult);
            expect(expectedJSONResult.ADULT.getNoOfTickets()).toBe(10);
            expect(expectedJSONResult.CHILD.getNoOfTickets()).toBe(5);
            expect(expectedJSONResult.INFANT.getNoOfTickets()).toBe(1);
        });

        test("Testing with no data", async () => {
            var testData = {};
            var expectedJSONResult = {
                "ADULT" : new TicketTypeRequest("ADULT", 0),
                "CHILD" : new TicketTypeRequest("CHILD", 0),
                "INFANT" : new TicketTypeRequest("INFANT", 0)
            };
            expect(TicketHelper.validateTicketTypes(testData)).toStrictEqual(expectedJSONResult);
            expect(expectedJSONResult.ADULT.getNoOfTickets()).toBe(0);
            expect(expectedJSONResult.CHILD.getNoOfTickets()).toBe(0);
            expect(expectedJSONResult.INFANT.getNoOfTickets()).toBe(0);
        });
    });

    describe("Testing the generatePurchasedTicketsJSON function with different data", () => {
        
        test("Testing with standard data", async () => {
            var testData = {
                "ADULT" : new TicketTypeRequest("ADULT", 10),
                "CHILD" : new TicketTypeRequest("CHILD", 5),
                "INFANT" : new TicketTypeRequest("INFANT", 1)
            };
            var expectedJSONResult = {
                "ADULT" : 10,
                "CHILD" : 5,
                "INFANT" : 1
            };
            expect(TicketHelper.generatePurchasedTicketsJSON(testData)).toStrictEqual(expectedJSONResult);
            expect(expectedJSONResult.ADULT).toBe(10);
            expect(expectedJSONResult.CHILD).toBe(5);
            expect(expectedJSONResult.INFANT).toBe(1);
        });

        test("Testing with lower numbers", async () => {
            var testData = {
                "ADULT" : new TicketTypeRequest("ADULT", 5),
                "CHILD" : new TicketTypeRequest("CHILD", 3),
                "INFANT" : new TicketTypeRequest("INFANT", 2)
            };
            var expectedJSONResult = {
                "ADULT" : 5,
                "CHILD" : 3,
                "INFANT" : 2
            };
            expect(TicketHelper.generatePurchasedTicketsJSON(testData)).toStrictEqual(expectedJSONResult);
            expect(expectedJSONResult.ADULT).toBe(5);
            expect(expectedJSONResult.CHILD).toBe(3);
            expect(expectedJSONResult.INFANT).toBe(2);
        });

        test("Testing with minimum numbers", async () => {
            var testData = {
                "ADULT" : new TicketTypeRequest("ADULT", 1),
                "CHILD" : new TicketTypeRequest("CHILD", 1),
                "INFANT" : new TicketTypeRequest("INFANT", 1)
            };
            var expectedJSONResult = {
                "ADULT" : 1,
                "CHILD" : 1,
                "INFANT" : 1
            };
            expect(TicketHelper.generatePurchasedTicketsJSON(testData)).toStrictEqual(expectedJSONResult);
            expect(expectedJSONResult.ADULT).toBe(1);
            expect(expectedJSONResult.CHILD).toBe(1);
            expect(expectedJSONResult.INFANT).toBe(1);
        });
    });

    describe("Testing the authoriseTickets function with different data", () => {
        
        test("Testing with standard correct data", async () => {
            var testData = {
                "ADULT" : new TicketTypeRequest("ADULT", 10),
                "CHILD" : new TicketTypeRequest("CHILD", 5),
                "INFANT" : new TicketTypeRequest("INFANT", 1)
            };

            try{
                expect(TicketHelper.authoriseTickets(testData)).toBe(true);
            }catch(err){
                expect(err.message).toBe("");
            }
        });

        test("Testing with tickets over 20", async () => {
            var testData = {
                "ADULT" : new TicketTypeRequest("ADULT", 25),
                "CHILD" : new TicketTypeRequest("CHILD", 25),
                "INFANT" : new TicketTypeRequest("INFANT", 25)
            };
            
            try{
                expect(TicketHelper.authoriseTickets(testData)).toBe(false);
            }catch(err){
                expect(err.message).toBe("You can only order a maximum of 20 tickets at one time.");
            }
        });

        test("Testing with more infant than adult tickets", async () => {
            var testData = {
                "ADULT" : new TicketTypeRequest("ADULT", 1),
                "CHILD" : new TicketTypeRequest("CHILD", 1),
                "INFANT" : new TicketTypeRequest("INFANT", 2)
            };
            try{
                expect(TicketHelper.authoriseTickets(testData)).toBe(false);
            }catch(err){
                expect(err.message).toBe("You must have 1 adult ticket per infant ticket.");
            }
        });

        test("Testing with no adult tickets", async () => {
            var testData = {
                "ADULT" : new TicketTypeRequest("ADULT", 0),
                "CHILD" : new TicketTypeRequest("CHILD", 1),
                "INFANT" : new TicketTypeRequest("INFANT", 2)
            };
            try{
                expect(TicketHelper.authoriseTickets(testData)).toBe(false);
            }catch(err){
                expect(err.message).toBe("You must have at least 1 adult ticket.");
            }
        });
    });

    describe("Testing the calculateTicketPrices function with different data", () => {
        
        test("Testing with standard correct data", async () => {
            var testData = {
                "ADULT" : new TicketTypeRequest("ADULT", 10),
                "CHILD" : new TicketTypeRequest("CHILD", 5),
                "INFANT" : new TicketTypeRequest("INFANT", 1)
            };

            expect(TicketHelper.calculateTicketPrices(testData)).toBe(250);
        });

        test("Testing with higher numbers", async () => {
            var testData = {
                "ADULT" : new TicketTypeRequest("ADULT", 20),
                "CHILD" : new TicketTypeRequest("CHILD", 0),
                "INFANT" : new TicketTypeRequest("INFANT", 0)
            };

            expect(TicketHelper.calculateTicketPrices(testData)).toBe(400);
        });

        test("Testing with lower numbers", async () => {
            var testData = {
                "ADULT" : new TicketTypeRequest("ADULT", 5),
                "CHILD" : new TicketTypeRequest("CHILD", 3),
                "INFANT" : new TicketTypeRequest("INFANT", 0)
            };

            expect(TicketHelper.calculateTicketPrices(testData)).toBe(130);
        });

        test("Testing with minimum numbers", async () => {
            var testData = {
                "ADULT" : new TicketTypeRequest("ADULT", 1),
                "CHILD" : new TicketTypeRequest("CHILD", 1),
                "INFANT" : new TicketTypeRequest("INFANT", 0)
            };

            expect(TicketHelper.calculateTicketPrices(testData)).toBe(30);
        });
    });

    describe("Testing the calculateSeating function with different data", () => {
        
        test("Testing with standard correct data", async () => {
            var testData = {
                "ADULT" : new TicketTypeRequest("ADULT", 10),
                "CHILD" : new TicketTypeRequest("CHILD", 5),
                "INFANT" : new TicketTypeRequest("INFANT", 1)
            };

            expect(TicketHelper.calculateSeating(testData)).toBe(15);
        });

        test("Testing with higher numbers", async () => {
            var testData = {
                "ADULT" : new TicketTypeRequest("ADULT", 20),
                "CHILD" : new TicketTypeRequest("CHILD", 0),
                "INFANT" : new TicketTypeRequest("INFANT", 0)
            };

            expect(TicketHelper.calculateSeating(testData)).toBe(20);
        });

        test("Testing with lower numbers", async () => {
            var testData = {
                "ADULT" : new TicketTypeRequest("ADULT", 5),
                "CHILD" : new TicketTypeRequest("CHILD", 3),
                "INFANT" : new TicketTypeRequest("INFANT", 0)
            };

            expect(TicketHelper.calculateSeating(testData)).toBe(8);
        });

        test("Testing with minimum numbers", async () => {
            var testData = {
                "ADULT" : new TicketTypeRequest("ADULT", 1),
                "CHILD" : new TicketTypeRequest("CHILD", 1),
                "INFANT" : new TicketTypeRequest("INFANT", 0)
            };

            expect(TicketHelper.calculateSeating(testData)).toBe(2);
        });
    });

});