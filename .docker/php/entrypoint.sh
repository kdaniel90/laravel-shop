#!/bin/sh
set -e

# Set permissions for Laravel directories
chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache
chmod -R 775 /var/www/storage /var/www/bootstrap/cache

# permissions for PHPMyAdmin
mkdir -p /sessions

chmod 777 /sessions

cp .env.example .env
php artisan key:generate

sed -i '/^DB_CONNECTION/d' .env
echo "DB_CONNECTION=mysql" >> .env
sed -i '/^DB_HOST/d' .env
echo "DB_HOST=db" >> .env
sed -i '/^DB_PORT/d' .env
echo "DB_PORT=3306" >> .env
sed -i '/^DB_DATABASE/d' .env
echo "DB_DATABASE=laravel_shop" >> .env
sed -i '/^DB_USERNAME/d' .env
echo "DB_USERNAME=laravel_shop" >> .env
sed -i '/^DB_PASSWORD/d' .env
echo "DB_PASSWORD=laravel_shop" >> .env

#php artisan migrate

exec "$@"
