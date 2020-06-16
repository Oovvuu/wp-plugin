#!/bin/bash

set -e

# Configure a built branch for release

# Step 1: Remove .gitignore and use .deployignore
rm .gitignore
mv .deployignore .gitignore

# Step 3: Remove all unnecessary files
git ls-files -i --exclude-from=.gitignore | xargs git rm --cached

# Step 4: Build the plugin
composer install
npm install
npm run build
