#!/bin/bash

# Esperar a que MySQL esté listo
echo "Esperando a que MySQL esté disponible..."
while ! nc -z laravel-db 3306; do
    sleep 1
done

# Ejecutar migraciones
echo "Ejecutando migraciones..."
php artisan migrate --force

# Limpiar cachés
echo "Limpiando cachés..."
php artisan config:clear
php artisan route:clear
php artisan cache:clear

# Regenerar autoload
echo "Regenerando autoload..."
composer dump-autoload

# Iniciar PHP-FPM
echo "Iniciando PHP-FPM..."
php-fpm 