# Job-Search-API
Developed a job search api thorugh which employer can post various jobs and users can search for jobs also.
This project uses MongoDB as database and MongoDB atlas cloud has been used for hosting the database.
<br>
<br>
Key Points of this Project : <br>
    1)Moduler Programming<br>
    2)Use of Singleton Pattern<br>
    3)Authentication using JWT<br>
    4)Security using bcryptjs<br>
    5)Data Caching Using Redis<br>
    6)Rest API guideline.<br>
    7)Clustering Using PM2<br>
<br>
<br>
# How to Run the Project?
  clone the Project in your environment and Run the command to install all the dependencies <br>
        ** npm install **
        <br>
  After this command all the dependencies will be installed. To see the list of all dependencies open the * package.json* file. <br>

  Now lets start the server by running the command <br>
      ** npm start **
<br>
# APIs description : 
  (POST) **localhost:3000/api/auth/v1/register**  --- used for registration params : email,password and repeat password <br>
  (POST) **localhost:3000/api/auth/v1/login**  --- used for login params : email,password <br>
  (GET) **localhost:3000/api/v1/jobs/** --- Used to get all the jobs <br>
  (POST) **localhost:3000/api/v1/jobs/** --- Used to create new job <br>
  (GET) **localhost:3000/api/v1/jobs/:id** --- Used to get a specific job <br>
  (DELETE) **localhost:3000/api/v1/jobs/:id** --- Used to delete a specific job <br>
  (PATCH) **localhost:3000/api/v1/jobs/:id** --- Used to update a specific job <br>

  
