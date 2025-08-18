FROM abiosoft/caddy:1.0.3-php-no-stats

COPY . /srv

COPY ./docker/Caddyfile /etc/Caddyfile

EXPOSE 80
