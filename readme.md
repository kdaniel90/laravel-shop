#setting up the project with docker

1. git clone (https://github.com/kdaniel90/laravel-shop)
2. cd to project (laravel-shop)
3. run npm install
4. run npm run build 
5. docker compose up -d --build (to create the docker images & containers)
6. docker compose exec -it {phpContainer} php artisan migrate

#for local development 
1. composer install
2. npm install
3. npm run build (after modifications on the frontend part)

#to run the migrations
1. php artisan migrate (docker compose exec -it {phpContainer} php artisan migrate)

#to rebuild the project (after code has changed)
1. frontend (react) part - npm run build
2. docker - docker compose build
3. start - docker compose up -d


#additional notes
 - the project is divided in 2 sections, the frontend part consisting in one page (http://{domainName} (default localhost), 
and an administration BO where one can add / modify products http://admin.{domainName} (default: admin.localhost)
