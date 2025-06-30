#setting up the project

1. git clone (https://github.com/kdaniel90/laravel-shop)
2. cd to project (laravel-shop)
3. add the following domains in the hosts file on your computer
   - 127.0.0.1 admin.laravel-shop.com
   - 127.0.0.1 laravel-shop.com
4. create .env file, to set up db connection
   - DB_CONNECTION=mysql
   - DB_HOST=db
   - DB_PORT=3306
   - DB_DATABASE=databaseName
   - DB_USERNAME=dbUserName
   - DB_PASSWORD=dbPassword
5. Modify the APP_URL in .env to laravel-shop.com
6. run php artisan key:generate to generate application key in .env
7. run npm install
8. run npm run build 

#for local development 
1. composer install
2. npm install
3. npm run build (after modifications on the frontend part)

#to create docker container
1. docker compose up -d --build
2. docker compose exec php bash


#to run the migrations
1. php artisan migrate (docker compose exec -it {phpContainer} php artisan migrate)

#to rebuild the project (after code has changed)
1. frontend (react) part - npm run build
2. docker - docker compose build
3. start - docker compose up -d
