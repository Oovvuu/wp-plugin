#! /bin/sh

set -e

export PATH="$HOME/.composer/vendor/bin:$PATH"


# debian install svn
sudo apt-get update && sudo apt-get install subversion gcc-8-base
#sudo docker-php-ext-install mysqli
sudo sh -c "printf '\ndeb http://ftp.us.debian.org/debian sid main\n' >> /etc/apt/sources.list"
sudo apt-get update && sudo apt-get install mysql-client
# sudo apt-get install subversion
# sudo apt-get install libapache2-mod-svn


# install phpunit
composer global require "phpunit/phpunit=6.1.*"
composer global require automattic/vipwpcs

WP_VERSION="latest"
# Set up the WordPress installation.
bash bin/install-wp-tests.sh wordpress_test root '' localhost "latest"
