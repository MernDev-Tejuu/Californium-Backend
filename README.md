# mongo/session-3

* To complete this assignment, I created a node application and implemented the following APIs to replicate the given data in the database:

* Schemas and Document Creation:

I defined schemas for the book and author collections based on the given data.
Using these schemas, I created documents in the database corresponding to the provided data.
CRUD Operations:

* Create APIs for Books and Authors:

I implemented APIs to create entries in both the books and authors collections.
These APIs validate the presence of the author_id and only accept the entry if the author_id is available.
List Books by "Chetan Bhagat":

* To list out the books written by "Chetan Bhagat",

I executed two database queries.
The first query finds the author_id for "Chetan Bhagat".
The second query retrieves the list of books with that author_id.

* Find Author of "Two States" and Update Book Price:

This operation requires two queries as well.
The first query uses findOneAndUpdate to find the author of "Two States" and update the book price to 100.
The second query retrieves the author_name and updated price in the response.

* Find Books within a Price Range and Respond with Author Names:

To find the books that cost between 50-100 (inclusive) and respond with the author names of those books, I executed the following queries:
* bookModel.find({ price: { $gte: 50, $lte: 100 } }).select({ author_id: 1 })
Then, using a map or forEach loop, I obtained the author names corresponding to the authorIds by querying the authorModel.

* By implementing these APIs and executing the required queries, I successfully completed the assignment, replicating the given data in the database and performing the specified CRUD operations.




