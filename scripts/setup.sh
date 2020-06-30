#! /bin/sh

set -e

export PATH="$HOME/.composer/vendor/bin:$PATH"


# debian install svn
sudo apt-get update && sudo apt-get install gcc-8-base subversion 
sudo docker-php-ext-install mysqli
sudo apt-get update && sudo apt-get install default-mysql-client


# install phpunit
composer global require "phpunit/phpunit=6.1.*"
composer global require automattic/vipwpcs

WP_VERSION="latest"
# Set up the WordPress installation.
bash bin/install-wp-tests.sh wordpress_test root '' 127.0.0.1 latest false