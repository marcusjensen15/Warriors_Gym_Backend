## Backend Repo: Warriors Gym. 

## [Here is the link for the Warriors Gym Frontend Repo](google.com)

### Before running application, you must set the JWT Private Key. To do this, navaigate to the project folder in terminal and enter: `export warriors_gym_jwtPrivateKey=<Input_Security_Key_Here>`. MAKE SURE THERE ARE NO SPACES.

### To run application, use `nodemon index.js`. This will auto start/stop the server.

### To test endpoints in Postman, make sure you are on the `Body` tab and you have `x-www-form-urlencoded` selected.

#### With 'Possible Answers' field testing in Postman, send a bunch of different values in different rows all with the key 'possibleAnswers'. The response will be an array of all values.

#### Within Postman: Make sure the dropdown to the left of the API URL is set to the appropriate 'API Verb' before hitting the 'Send' button to one of the routes below.

#### Some of these routes are protected. Within Postman you may need to 'POST' to `http:localhost:3000/auth` a valid password + email, copy token within 'Headers' of response, and include the token string as 'x-auth-token' as a header in your request. 

#### Some are both protected via authMiddleware and admin (middleware). To access these routes, you need to edit the user in mongodb, give them an 'isAdmin' property, and set it to 'true'. Do this in combination with the step above.

### Key Endpoints:

#### GET Requests

- GET all questions: `http://localhost:3000/questions`
- GET all questions of a specific type: `http://localhost:3000/questions/<question_type>`
- GET a specific question: `http://localhost:3000/questions/<question_type>/<question_id>`
- GET all users (protected): `http://localhost:3000/users`
- GET a specific user (protected): `http://localhost:3000/users/<user_id>`

#### POST Requests 

- POST a new question: `http://localhost:3000/questions`
- POST a new user: `http://localhost:3000/users`

#### PUT Requests 

- PUT a specific question: `http://localhost:3000/questions/<question_type>/<question_id>`
- PUT a specific user: `http://localhost:3000/users/<user_id>`

#### DELETE Requests 

- DELETE a specific question: `http://localhost:3000/questions/<question_type>/<question_id>`
- DELETE a specific user (protected): `http://localhost:3000/users/<user_id>`
