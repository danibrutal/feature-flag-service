# Use official PHP with FPM
FROM php:8.4-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
  git \
  curl \
  zip \
  unzip \
  libpng-dev \
  libonig-dev \
  libxml2-dev \
  libzip-dev \
  libpq-dev \
  && docker-php-ext-install \
  pdo \
  pdo_mysql \
  mbstring \
  exif \
  pcntl \
  bcmath \
  gd \
  zip

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy app files
COPY . .

# Install PHP dependencies
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# Set permissions (important for Laravel)
RUN chown -R www-data:www-data /var/www \
  && chmod -R 775 /var/www/storage /var/www/bootstrap/cache

# Expose port (FPM runs internally, not directly exposed usually)
EXPOSE 9000

CMD php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=8000