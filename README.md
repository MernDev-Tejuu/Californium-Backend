# assingment/mongo-day2

* In this assignment, I created a books collection in my database using the bookModel, which includes the following fields:

bookName (mandatory field)
* price (containing Indian and European prices)
* year (default value is 2021 if no year is provided)
* tags (an array)
* authorName
* totalPages
* stockAvailable (true or false)

To complete this assignment, I implemented the following APIs by writing the logic in the bookController and defining the routes in the routes file:

* createBook:
This API is used to create a new entry in the books collection.
I used this API to create 11+ entries in the collection, providing the necessary book details.

* bookList:
This API returns a list of all books in the collection, including only the bookName and authorName.

* getBooksInYear:
This API takes a year as input in a POST request and retrieves a list of all books published in that year.

* getParticularBooks:
This API fetches books from the collection based on a specific condition provided in the request body.
The condition can vary depending on the input in the request body.
For example, if the body contains { name: "hi" }, the API will fetch books with the name "hi".
Similarly, if the body contains { year: 2020 }, the API will fetch books published in the year 2020.

* getXINRBooks:
This API returns all books that have an Indian price tag of "100INR", "200INR", or "500INR".

* getRandomBooks:
This API returns books that are available in stock or have more than 500 pages.

*By implementing these APIs and defining the required logic, I successfully completed the assignment.




