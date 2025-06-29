#setting up the project

1. git clone (https://github.com/kdaniel90/laravel-shop)
2. cd to project (laravel-shop)
3. docker compose up -d --build
4. docker compose exec php bash
5. composer setup


#to run the migrations
1. php artisan migrate

#to rebuild the project (after code has changed)
1. frontend (react) part - npm run build
2. docker - docker compose build
3. start - docker compose up -d
