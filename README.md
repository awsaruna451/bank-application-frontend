### Running a bank application using docker
 
### 1. Clone the project from git hub
    git clone https://github.com/awsaruna451/bank-application-frontend.git

### 2. Build the Docker Image
    To build the Docker image from the root directory of the app use below command to go inside the root directory
#   CD bank-application-frontend
    run the following command in the root directory of the bank-application-frontend
#   docker build -t bank-application .  
    

### Run the Docker Container
 # docker run -p 3000:3000 bank-application
    
### Access the react app
To access the React app running in the Docker container, open a web browser and navigate to http://localhost:3000. You should see your react app running in the browser.

### I created the screen record video how application is work

### Exit the application used below command.
    1) docker stop container bank-application




