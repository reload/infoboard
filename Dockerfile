FROM dunglas/frankenphp:1-php8.5

RUN cp "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

COPY . /srv

COPY ./docker/Caddyfile /etc/frankenphp/Caddyfile

EXPOSE 80
