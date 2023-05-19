# session/middleware-2

* To complete this assignment, I created a new branch named session/middleware-2 and implemented the following APIs and middleware:

# Create Product:

I developed a POST API that accepts the product details in the request body.
Using the received details, I created a new product document in the products collection.

# Create User:

I implemented a POST API that receives the user details in the request body.
The API performs a header validation to check if the header "isFreeAppUser" is present.
If the "isFreeAppUser" header is not present, the API terminates the request response cycle with an error message stating that the request is missing a mandatory header.
The value of the "isFreeAppUser" field in the user document is determined by the value of the "isFreeAppUser" header.
If the header is present and the validation passes, the API creates a new user document in the users collection.

# Order Purchase:

I developed a POST API for purchasing an order, which takes the userId and productId in the request body.
The API performs a header validation to check if the header "isFreeAppUser" is present.
If the "isFreeAppUser" header is not present, the API terminates the request response cycle with an error message stating that the request is missing a mandatory header.
*If the header is present and the validation passes, the API proceeds to validate the user and product.
*It checks if the user exists and whether the product exists. If either of these validations fails, the API returns an error with a suitable error message.
For every purchase, an order document is saved in the orders collection.
The value of the "isFreeAppUser" property in the order document depends on the value of the "isFreeAppUser" header.
If the "isFreeAppUser" header is true, the balance of the user is not deducted, and the amount in the order is set to 0. The "isFreeAppUser" attribute in the order document is also set to true.
If the "isFreeAppUser" header has a false value, the product's price is checked. This value is deducted from the user's balance, and the order amount is set to the product's price. The "isFreeAppUser" attribute in the order document is set to false.

# Middleware:

I updated the logic in the middleware to set the "isFreeAppUser" attribute in the req object.
The middleware checks if the "isFreeAppUser" header is present and sets the attribute accordingly.
This attribute is then used in the route handler for setting the "isFreeAppUser" attributes of the User and Order collections.

* By implementing these APIs and updating the middleware as instructed, I completed the assignment.
