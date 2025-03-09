1st. Open the "Lab.2_TI-221_PopescuA-REST_API_With_a_Database" folder in Visual Studio;
2nd. Run the "pgAdmin 4" app that you have already install on your computer(you will need it later);
3rd. The PostgreSQL credentials are located in the "db.js" file;
4th. Run the "node seed.js" command in the Visual Studio Terminal to insert the data from seed.js file to your Users, Threads and Subreddits tables;
5th. Run "node index.js" in the Visual Studio Terminal to start the server http://localhost:3000/health;
6th. Basically, everything works as per the instructions you provided in https://ametreniuc.notion.site/Lab-2-REST-API-with-a-Database-19af7c147af780b5b280dc5e0aca5b23 . I attached screenshots
as proof in the Images folder where I validate the http://localhost:3000/users, http://localhost:3000/threads, http://localhost:3000/subreddits GET Request using Postman. Adittionaly, I attached 
screenshots how I create the Users, Threads and Subreddits tables where they are emty at first but they filled with info after I run the "node seed.js" command in the Visual Studio Terminal.