#! /bin/sh

set -e

export PATH="$HOME/.composer/vendor/bin:$PATH"


# debian install svn
apt-get install subversion
apt-get install libapache2-mod-svn


# install phpunit
composer global require "phpunit/phpunit=6.1.*"
composer global require automattic/vipwpcs


# Set up the WordPress installation.
bash bin/install-wp-tests.sh wordpress_test root '' localhost $WP_VERSION
