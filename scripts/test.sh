#! /bin/sh

set -e


# install memcached objects.
# curl https://raw.githubusercontent.com/tollmanz/wordpress-pecl-memcached-object-cache/584392b56dc4adbe52bd2c7b86f875e23a3e5f75/object-cache.php > $WP_CORE_DIR/wp-content/object-cache.php
# echo "extension = memcached.so" >> ~/.phpenv/versions/$(phpenv version-name)/etc/php.ini

# install and configure phpcs
phpcs --config-set installed_paths $HOME/.composer/vendor/wp-coding-standards/wpcs,$HOME/.composer/vendor/automattic/vipwpcs

# run the php linting
find . -type "f" -iname "*.php" -not -path "./vendor/*" | xargs -L "1" php -l

# run phcs & phpunit
phpcs
phpunit
WP_MULTISITE=1 phpunit

# install lnode components
npm install
npm run build

# run node tests
npm run tests
npm run lint


