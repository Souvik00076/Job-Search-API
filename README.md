# Job-Search-API
Developed a job search api thorugh which employer can post various jobs and users can search for jobs also.
This project uses MongoDB as database and MongoDB atlas cloud has been used for hosting the database.

Key Points of this Project : 
    1)Moduler Programming
    2)Use of Singleton Pattern
    3)Authentication using JWT
    4)Security using bcryptjs
    5)Data Caching Using Redis
    6)Rest API guideline.
    7)Clustering Using PM2

# How to Run the Project?
  clone the Project in your environment and Run the command to install all the dependencies
        * npm install *
  After this command all the dependencies will be installed. To see the list of all dependencies open the * package.json* file.

  Now lets start the server by running the command 
      * npm start *

# APIs description : 
  (POST)*localhost:3000/api/auth/v1/register *  --- used for registration params : email,password and repeat password
  (POST)*localhost:3000/api/auth/v1/login *  --- used for login params : email,password
  (GET)*localhost:3000/api/v1/jobs/* --- Used to get all the jobs
  (POST)*localhost:3000/api/v1/jobs/* --- Used to create new job
  (GET)*localhost:3000/api/v1/jobs/:id* --- Used to get a specific job
  (DELETE)*localhost:3000/api/v1/jobs/:id* --- Used to delete a specific job
  (PATCH)*localhost:3000/api/v1/jobs/:id* --- Used to update a specific job

  
