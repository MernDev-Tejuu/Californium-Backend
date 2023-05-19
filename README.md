# JAI_KISAN_COMPANY

# Customer API:

# Get all customers with status ACTIVE [GET]

* Endpoint: /api/customers
* Controller: customerController.js
* Service: customerService.js
* MongoDB query: Customer.find({ status: 'ACTIVE' })

# Delete customer [DELETE]

* Endpoint: /api/customers/:id
* Controller: customerController.js
* Service: customerService.js
* MongoDB query: Customer.findByIdAndDelete(id)

# Create new customer [POST]

* Endpoint: /api/customers
* Controller: customerController.js
* Service: customerService.js
* MongoDB query: Customer.create(req.body)

# Card API:

# Get all Card List [GET]

* Endpoint: /api/cards
* Controller: cardController.js
* Service: cardService.js
* MongoDB query: Card.find()
# Create new card [POST]

* Endpoint: /api/cards
* Controller: cardController.js
* Service: cardService.js
* MongoDB query: Card.create(req.body)

The models customer.js and card.js define the schema for the customer and card collections, respectively. The middlewares handle error handling and other common functionalities. The controllers handle the request-response flow, while the services encapsulate the business logic and interact with the database using MongoDB queries.
