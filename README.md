## Warriors Gym: Backend Repository 

#### [Here is the link for the Warriors Gym Frontend Repo](https://github.com/marcusjensen15/Warriors_Gym_Frontend)

### Below are the steps to follow to get Warriors Gym up and running:

1. Navigate to the cloned folder within terminal and run: `npm i`.

2. Before running application, you must set the JWT Private Key. To do this, navaigate to the project folder in terminal and enter: `export warriors_gym_jwtPrivateKey=<Input_Security_Key_Here>`. MAKE SURE THERE ARE NO SPACES. Example: `export warriors_gym_jwtPrivateKey=mySecurityKey`

3. To run application, use `nodemon index.js`. This will auto start/stop the server.

4. May need to start MongoDB in a seperate terminal if you don't already have it running as a background process (see instructions for that below).

5. In a seperate terminal tab, you can keep your testing enviornment ongoing by running `npm test`. This is recommended as you don't know how changes in code may break other modules. 

### Below is a guide to using the endpoints in Postman:

1. There are 3 types of route protection available in this application: Authenticated User, Manager, and Admin:
    1. Authenticated Users: Full Read Access on Questions. Ability to read and edit their own user credentials (except for password). 
    2. Managers: Full: Create, Edit, Update, Delete functionality for Questions.
    3. Admin: Can get a list of all users, and delete specific users. 
    4. Note: The only un-protected route in this application is creating a new users. 
    5. A user can be both an Admin and a Manager. 

2. How to create a new account using Postman:
    1. Perform a 'POST' request in Postman to: http://localhost:3000/users. You must provide a name, email, and password.
    2. The successful request will send back a token named 'x-auth-token' (located in the 'headers' tab of the response). Copy this string as seen [here](https://user-images.githubusercontent.com/56521797/103183101-50d58780-4865-11eb-8c4d-8292e3d78955.png).
    3. Now, to get all questions perform a 'GET' request to http://localhost:3000/questions. You will need to navigate over to the 'Headers' area of the request and create a key titled: 'x-auth-token'. Paste the token string you copied from the previous step into the 'value' field as seen [here](https://user-images.githubusercontent.com/56521797/103183252-fc7ed780-4865-11eb-9d0a-7c362c7240e0.png).

3. How to log into an existing account using Postman:
    1. Perform the same steps as above, however instead of performing a 'POST' request to: http://localhost:3000/users, perform a 'POST' request to http://localhost:3000/auth using valid user credentials (omit the 'name field'. Use only valid 'email' and 'password'). See an example [here](https://user-images.githubusercontent.com/56521797/103183825-b88dd180-4869-11eb-8c14-2b1a9115a4ce.png).
    2. You may access all of the 'Authenticated Users' routes as above using the same process of copy/pasting the token in the 'x-auth-token' request header field. 

4. How to elevate your privleges to 'admin':
    1. Create a user using step 1.
    2. Find that user in MongoDB Compass. Add a field within that user titled 'isAdmin'. Set the field type to 'Boolean'. Set the 'isAdmin' value to true. See an example [here](https://user-images.githubusercontent.com/56521797/103184394-dd377880-486c-11eb-8e81-b89bee5b42b9.png).
    3. Now, when you login with this user and copy the token, you will be able to perform actions enabled for Admin users.

5. How to elevate your privleges to 'manager':
    1. Create a user using step 1.
    2. Find that user in MongoDB Compass. Add a field within that user titled 'isManager'. Set the field type to 'Boolean'. Set the 'isManager' value to true. See an example [here](https://user-images.githubusercontent.com/56521797/103184423-15d75200-486d-11eb-9a5b-d0e721a18794.png).
    3. Now, when you login with this user and copy the token, you will be able to perform actions enabled for Manager users.
    
6. How to create new questions in Warriors Gym:
    1. Your privleges must be 'manager'. Follow the steps above to set up correctly.
    2. Repeat the process of copying the token string and pasting within the 'Header' of the request.
    3. See an example [here](https://user-images.githubusercontent.com/56521797/103185832-f5aa9180-4872-11eb-9c81-0dc28bb3317d.png).


#### Start and stop MongoDB Process on MacOS:
    * Start: `brew services start mongodb-community`
    * Stop: `brew services stop mongodb-community`
    

### Key Endpoints:

Verb | Route                                                        | Permissions Required | Description 
------ | ---------------------------------------------------------- | -------------------- | ------------------
GET    | `http://localhost:3000/questions`                          | Authenticated User   | Get all questions in the Database 
GET    | `http://localhost:3000/questions/<category>`               | Authenticated User   | Get all questions within a specific category
GET    | `http://localhost:3000/questions/<category>/<id>`          | Authenticated User   | Get a specific question
POST   | `http://localhost:3000/questions`                          | Manager              | Add a quesiton to the database 
PUT    | `http://localhost:3000/questions/<category>/<id>`          | Manager              | Edit a specific question 
DELETE | `http://localhost:3000/questions/<category>/<id>`          | Manager              | Delete a question 
DELETE | `http://localhost:3000/users/<user_id>`                    | Admin                | Delete a user
PUT    | `http://localhost:3000/users/me`                           | Authenticated User   | Edit your user credentials (not password)
POST   | `http://localhost:3000/users`                              | None                 | Sign up for Warriors Gym
GET    | `http://localhost:3000/users/me`                           | Authenticated User   | Get user credentials for your account
GET    | `http://localhost:3000/users`                              | Admin                | Get a list of all users
POST   | `http://localhost:3000/auth`                               | None                 | Log into Warriors Gym 


