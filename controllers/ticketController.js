import TicketService from '../src/pairtest/TicketService.js';
const ticketService = new TicketService();

export const ticketPurchase = ((req, res) => {
    try{
        const response = ticketService.purchaseTickets(req.body.accountId, req.body.tickets);
        res.status(200).json(response);
    }
    catch(error){
        return res.status(500).json({
            success: false,
            status: error.status || 500,
            message: error.message || "An unknown server error occured." 
        });
    }
});
