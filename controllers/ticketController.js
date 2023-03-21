import TicketService from '../src/pairtest/TicketService.js'
const ticketService = new TicketService()

export const ticketPurchase = ((req, res) => {
    try{
        var response = ticketService.purchaseTickets(req.body.accountId, req.body.tickets)
        res.sendStatus(response)
    }
    catch(error){
        return res.status(500).json({
            success: false,
            status: error.status || 500,
            message: error.message || "An unknown server error occured." 
        })
    }
    
})
