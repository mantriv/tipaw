# tipaw
Repository to create the React/ Redux app for tipaw

1. Installation guide:
	Server
	=======
	a) Restore both client and server to local directory
	b) By default Mongo server will be running on PORT '27017'. 
		In case any changes require, please open the "constants.js" file and change the constant "MONGODB_PORT".
	c) By runing the server, DB "tipaw-db" and collection "members" automatically gets created. The constants are defined in constants.js
	d) Node/ express server running on Port 4000
	
	Client
	========
	a) If any changes made to the Node/ express node, please update the same in the client "package.json" under "proxy" settings. 
		Currently its pointing to http://localhost:4000/

2. Running the applicaiton:
	a) Go to client folder on Node prompt or VS code terminal.
	b) Type the following command : npm run dev
	
	By default the react web application will be running on PORT 3006 i.e. http://localhost:3006/
	

Applicaiton:
This application has 2 main screens (Home, Contact)

Home screen, will be the landing page of the app. For the first time, with no data, use can see the following message "No members found, click here to add member".
Clicking the "here" link will take the user to the other screen "Contact".

Contact is a data entry form and all the fields are mandatory.

On clicking the submit, user will be get the success notification and redirect to the home screen.

On the home screen, user can see list of members in card with the delete button. On clicking the delete button, there will be warning to make sure if user really 
want to delete the entry. If user agree to delete the record, data will be removed from the database and user will be agian back to the home screen.
