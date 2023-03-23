# Javascript Cinema Ticket Booking System
This is a straightforward Express server that receives ticket requests, checks for errors, and sends the data to a third-party API to process payments and book seats.

### Technologies Used
- NodeJS
- Express
- Express Routing
- Jest
- Supertest

### Installation
To install the necessary packages in package.json, run the command:

    npm install
If the installation is successful, you can run the following commands:

### Starting the server
To start the server, use the commmand:

    nodemon index.js
or

    node index.js
Just make sure your current directory on the command line is the project root directory!

You will know its running when you see this message in the console:

    Server listening on port 3000

This port number can be configured by using the ENV.PORT variable.

### Posting a ticket request to the server
Once the server is running, you can send a post request to http://localhost:3000/tickets.

The correct JSON format for this request is:

    {
        "accountId": 1,
        "tickets": {
            "ADULT": 2,
            "CHILD": 2,
            "INFANT":2
        }
    }

Bear in mind the accountId must be greater than 0 or you will receive an unsuccessful request error.

### Successful Request
If your request is successful, you will receive a JSON response like so:

    {
        "success": true,
        "purchasedTickets": {
            "ADULT": 2,
            "CHILD": 2,
            "INFANT":2
        },
        "totalTicketPrice": 60,
        "totalReservedSeats": 4
    }
The values will change depending on how many tickets were selected.

### Unsuccessful Request
On the other hand, if there was an error with your request, you will receive a JSON response like so:

    {
        "success": false,
        "status" : 500
        "message": "Error message"
    }
Please check the error message to find out what went wrong, then send another valid request.
### Testing
I have set up both unit and integration testing for this application.

To run unit testing using Jest, run:

    npm run unit_test

To run integration testing using Jest and Supertest, run:

    npm run integration_test

### Docker
To build a Docker image using this application, run the following command:

    docker build . -t millzo77/cinema-tickets-node-app
Verify that the image has been created successfully with:

    docker image ls
Then to run the Docker container, use the following command:

    docker run -p 3000:3000 -d millzo77/cinema-tickets-node-app
The app should now be available on the specified port.

Feel free to change this to any port that you want to use!
