# Stage 1: Base image with FrankenPHP and required extensions
FROM dunglas/frankenphp:1.1-php8.3-alpine AS base

# Install core PHP extensions required by Laravel
RUN install-php-extensions \
    pcntl \
    pdo_mysql \
    redis \
    zip \
    opcache

WORKDIR /var/www/html

# Stage 2: Vendor builder for Composer dependencies
FROM base AS vendor_builder
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
COPY composer.json composer.lock ./
# Install only production dependencies without scripts/autoloader first (for caching)
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist

# Stage 3: Asset builder for Frontend resources
FROM node:20-alpine AS asset_builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 4: Production runner image
FROM base AS runner
ENV CADDY_SERVER_ADMIN=off
ENV FRANKENPHP_CONFIG="import /etc/caddy/Caddyfile"

# Copy PHP dependencies
COPY --from=vendor_builder /var/www/html/vendor ./vendor

# Copy application files
COPY . .

# Copy built frontend assets
COPY --from=asset_builder /app/public/build ./public/build

# Finish Composer Autoloader and optimize
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
RUN composer dump-autoload --no-dev --optimize

# Set permissions for Laravel directories
RUN chown -R www-data:www-data storage bootstrap/cache

# Expose HTTP ports
EXPOSE 80
EXPOSE 443
EXPOSE 443/udp
