#! /bin/bash

set -e

# install composer
COMPOSER=/usr/local/bin/composer/composer.phar
if [[ ! -f "$COMPOSER" ]]; then
  EXPECTED_CHECKSUM="$(wget -q -O - https://composer.github.io/installer.sig)"
  php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
  ACTUAL_CHECKSUM="$(php -r "echo hash_file('sha384', 'composer-setup.php');")"

  if [ "$EXPECTED_CHECKSUM" != "$ACTUAL_CHECKSUM" ]
  then
      >&2 echo 'ERROR: Invalid installer checksum'
      rm composer-setup.php
      exit 1
  fi

  php composer-setup.php && \
  php -r "unlink('composer-setup.php');" && \
  mv composer.phar /usr/local/bin/composer
fi


# install the php components
composer install  


# install the js components for building
npm install
npm run build


# install the js compoents for production
rm -rf ./node_modules
NODE_ENV=production npm install

# move the files to a clean location
mkdir -p $HOME/oovvuu_media
cp -Rf ./admin $HOME/oovvuu_media/admin
cp -Rf ./build $HOME/oovvuu_media/build
cp -Rf ./inc $HOME/oovvuu_media/inc
cp -Rf ./node_modules $HOME/oovvuu_media/node_modules
cp -Rf ./template-parts $HOME/oovvuu_media/template-parts
cp -Rf ./vendor $HOME/oovvuu_media/vendor
cp ./index.php $HOME/oovvuu_media/index.php



# zip the plugin 
zip -r oovvuu.zip $HOME/oovvuu_media

file=./oovvuu.zip

# upload to github
AUTH_HEADER="Authorization: token ${GITHUB_TOKEN}"
FILENAME="oovvuu.zip"

UPLOAD_URL="https://uploads.github.com/repos/Oovvuu/wp-plugin/releases/${CIRCLE_TAG}/assets?name=${FILENAME}"
# Generate a temporary file.
tmp=$(mktemp)

# Upload the artifact - capturing HTTP response-code in our output file.
response=$(curl \
    -sSL \
    -XPOST \
    -H "${AUTH_HEADER}" \
    --upload-file "${file}" \
    --header "Content-Type:application/octet-stream" \
    --write-out "%{http_code}" \
    --output $tmp \
    "${UPLOAD_URL}")


# If the curl-command returned a non-zero response we must abort
if [ "$?" -ne 0 ]; then
    echo "**********************************"
    echo " curl command did not return zero."
    echo " Aborting"
    echo "**********************************"
    cat $tmp
    rm $tmp
    exit 1
fi

# If upload is not successful, we must abort
if [ $response -ge 400 ]; then
    echo "***************************"
    echo " upload was not successful."
    echo " Aborting"
    echo " HTTP status is $response"
    echo "**********************************"
    cat $tmp
    rm $tmp
    exit 1
fi

# Show pretty output, since we already have jq
cat $tmp | jq .
rm $tmp
