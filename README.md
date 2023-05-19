# session/populate-reference

* To complete this assignment, I followed the instructions provided and implemented the following APIs:

# Create Author:

I created a POST API that accepts the author details in the request body.
Using the received details, I created a new author document in the newAuthor collection.

# Create Publisher:

I implemented a POST API that receives the publisher details in the request body.
Using the provided information, I created a new publisher document in the newPublisher collection.

# Create Book:

I developed a POST API that takes the book details, including the author and publisher, in the request body.

* The API performs the following validations:
   It checks if the authorId is present in the request body. If it is absent, it sends an error message stating that this detail is        required.
   If the authorId is present, it validates if it is a valid ObjectId in the author collection, ensuring that a document exists with this    id. If it does not exist, it sends an error message stating that the author is not present.
  It also checks if the publisherId is present in the request body. If it is absent, it sends an error message indicating that this detail is required.
If the publisherId is present, it validates if it is a valid ObjectId in the publisher collection. If it is not a valid ObjectId, it sends an error message stating that the publisher is not present.
If all the validations pass, the API creates a new book document in the newBook collection, with the author property referencing the newAuthor collection.

# Get All Books with Author and Publisher Details:

I implemented a GET API that fetches all the books from the newBook collection.
To retrieve the author details and publisher details, I used the Mongoose populate method.
By populating the author and publisher fields, the API provides the book details along with their respective author and publisher information.

* By implementing these APIs and following the provided instructions, I completed the assignment successfully.




