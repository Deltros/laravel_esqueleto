FROM php:8.3-fpm

# Instala dependencias del sistema
RUN apt-get update \
    && apt-get install -y \
        libpng-dev \
        libonig-dev \
        libxml2-dev \
        zip \
        unzip \
        git \
        curl \
        libzip-dev \
        libpq-dev \
        libjpeg-dev \
        libfreetype6-dev \
        libmcrypt-dev \
        libssl-dev \
        libicu-dev \
        libxslt1-dev \
        libmagickwand-dev \
        netcat-traditional --no-install-recommends \
    && docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath gd xml zip intl

# Instala Composer
COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer

# Establece el directorio de trabajo
WORKDIR /var/www

# Copia los archivos del proyecto
COPY . .

# Instala dependencias de Laravel
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# Instala Laravel Sanctum
RUN composer require laravel/sanctum

# Publica los archivos de configuración de Sanctum
RUN php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider" --force

# Instala Spatie Laravel Permission
RUN composer require spatie/laravel-permission

# Publica los archivos de configuración de Permission
RUN php artisan vendor:publish --provider="Spatie\Permission\PermissionServiceProvider" --force

# Da permisos a la carpeta de almacenamiento
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# Hacer el script ejecutable
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 9000

CMD ["/usr/local/bin/docker-entrypoint.sh"] 