import app from "../../../index.js";
import request from "supertest";


describe("Testing /tickets POST and business logic", () => {
    // Hidden for simplicity
    test("POST /tickets with correct JSON", async () => {
      const response = await request(app)
        .post("/tickets")
        .expect("Content-Type", /json/)
        .send({
          accountId: 1,
          tickets: {
            "ADULT" : 10,
            "CHILD" : 5,
            "INFANT" : 1
          }
        });

        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
        expect(response.body.success).toBe(true);
        expect(response.body.purchasedTickets.ADULT).toBe(10);
        expect(response.body.purchasedTickets.CHILD).toBe(5);
        expect(response.body.purchasedTickets.INFANT).toBe(1);
        expect(response.body.totalTicketPrice).toBe(250);
        expect(response.body.totalReservedSeats).toBe(15);
    });

    test("POST /tickets with accountId equal to 0", async () => {
      const response = await request(app)
        .post("/tickets")
        .expect("Content-Type", /json/)
        .send({
          accountId: 0,
          tickets: {
            "ADULT" : 10,
            "CHILD" : 5,
            "INFANT" : 1
          }
        });

        expect(response.statusCode).toBe(500);
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
        expect(response.body.success).toBe(false);
        expect(response.body.status).toBe(500);
        expect(response.body.message).toBe("accountId must be valid.");
    });

    test("POST /tickets with ticket number over 20", async () => {
        const response = await request(app)
          .post("/tickets")
          .expect("Content-Type", /json/)
          .send({
            accountId: 1,
            tickets: {
              "ADULT" : 20,
              "CHILD" : 5,
              "INFANT" : 1
            }
          });
  
          expect(response.statusCode).toBe(500);
          expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
          expect(response.body.success).toBe(false);
          expect(response.body.status).toBe(500);
          expect(response.body.message).toBe("You can only order a maximum of 20 tickets at one time.");
      });

      test("POST /tickets with more infant than adult tickets", async () => {
        const response = await request(app)
          .post("/tickets")
          .expect("Content-Type", /json/)
          .send({
            accountId: 1,
            tickets: {
              "ADULT" : 5,
              "CHILD" : 5,
              "INFANT" : 10
            }
          });
  
          expect(response.statusCode).toBe(500);
          expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
          expect(response.body.success).toBe(false);
          expect(response.body.status).toBe(500);
          expect(response.body.message).toBe("You must have 1 adult ticket per infant ticket.");
      });

      test("POST /tickets with no adult tickets", async () => {
        const response = await request(app)
          .post("/tickets")
          .expect("Content-Type", /json/)
          .send({
            accountId: 1,
            tickets: {
              "ADULT" : 0,
              "CHILD" : 5,
              "INFANT" : 1
            }
          });
  
          expect(response.statusCode).toBe(500);
          expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
          expect(response.body.success).toBe(false);
          expect(response.body.status).toBe(500);
          expect(response.body.message).toBe("You must have at least 1 adult ticket.");
      });
  });