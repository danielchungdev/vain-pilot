# How to Install
## Step 1. Install Load Vain DB.
- 1.1. Go to the directory/folder named "loadVainDBfromTSV".
- 1.2. run npm install.
- 1.3. Change userid and password to your specific DB credentials.
- 1.4. run the following command 'node vaininstall.js' .

## Step 2. Get frontend & Backend Ready

### 2.1 Frontend - Vue
- 2.1.1. Go to the 'vain-client' directory/folder.
- 2.1.2. Run the following command 'npm install'.
- 2.1.3. You're done here unless any errors appear.

### 2.2 Frontend - React
- 2.2.1. Go to the 'vain-client-react' directory/folder.
- 2.2.2. Run the following command 'npm install'.

### 2.2 Backend
- 2.2.1. Go to the 'vain-backend' directory.
- 2.2.3. Run the following command 'npm install'.
- 2.2.4. Go into the 'app' directory/folder
- 2.2.5. Go into the 'config' directory/folder
- 2.2.6. In the file 'db.config.js' change user and password credentails to yours (optional) 
*(In 2.2.6 you might have to change more to make it connect to your psql)

### 3. Run everything (assuming you did everything above.) 
- 3.1. cd into Team2-Projectvain
- 3.2. run npm start 
- 3.3. cd into vain-client-react 
- 3.4. run npm start 
- localhost:8080 = Vue frontend
- localhost:3000 = React frontend

