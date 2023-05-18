# session/auth-1_JWT
* Created a new branch named session/auth-3_JWT.

Defined a user document structure with fields such as _id, firstName, lastName, mobile, emailId, password, gender, isDeleted, age, createdAt, updatedAt, and __v.

Implemented a POST API endpoint to register a user. The endpoint receives user details in the request body and creates a new user document based on the provided information.

Implemented a POST API endpoint to login a user. The endpoint receives user details, such as email and password, in the request body. It verifies the credentials against the existing user data and returns a suitable error message if the credentials don't match. On successful login, a JWT token is generated and included in the response body.

Implemented a GET API endpoint to fetch user details. The endpoint expects the userId as a path parameter in the URL. It checks for the presence of the x-auth-token header in the request and returns a suitable error message if absent. If the token is present, it validates its authenticity.

Implemented a PUT API endpoint to update user details. The endpoint expects the userId as a path parameter in the URL and receives the updated user attributes in the request body. It checks for the presence of the x-auth-token header in the request and returns a suitable error message if absent.

Implemented a DELETE API endpoint to mark a user's isDeleted attribute as true. The endpoint expects the userId as a path parameter in the URL. It checks for the presence of the x-auth-token header in the request and returns a suitable error message if absent.

Moved the authentication-related code to a middleware named auth.js. This middleware is added at the route level in the applicable routes to handle authentication for each API.

Implemented authorization logic to ensure that a logged-in user can modify or fetch only their own data. This logic was added to the fetch user details, update user, and delete user APIs.

Ensured that the authentication and authorization functionalities were working correctly for all the APIs.
