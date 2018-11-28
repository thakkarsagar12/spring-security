# Angular 5 JWT Authentication and OAuth 2 Spring Boot Application

 A full stack Spring Boot application using JWT authentication for an Angular 5+ single page application. The resources are only accessible with a valid JWT token passed through the header. The backend server integrates Spring Security with the use of a MySQL database for persistent storage.
 
 ### How to clone repository:
 
1. Clone spring-security repository into your local machine

        git clone https://github.com/binitdatta/spring-security.git
       
2. In terminal, point to local repository

        cd spring-security
        
 ### How to run Angular 5 Application
 
1. In terminal, point to angular-security-oauth2 repository

        cd angular-security-oauth2
        
 2. Run the following command
 
        npm install && ng serve
       
3. Navigate your browser to `localhost:4200` and ensure that the application is up and running.

 ### How to run Spring Boot Application
 
1. In terminal, point to spring-boot-security-oauth2 repository

        cd spring-boot-security-oauth2
        
 2. Run the following command
 
        mvn spring-boot:run
       
3. Ensure that a mysql server is running and make the neccessary changes to the `application.properties` file to configure a successful mysql connection

     ```
   spring.datasource.url=jdbc:mysql://localhost:3306/<your-table-name>?useSSL=false
   spring.datasource.username=<your-username>
   spring.datasource.password=<your-password>
    ```
