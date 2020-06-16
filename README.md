# Overview

# Installation
1. Download the [latest built release](https://github.com/alleyinteractive/oovvuu/releases) of the plugin
1. Go to Plugins > Add New in your dashboard
1. Click the `Upload Plugin` button to prompt a file selector
1. Locate the built zip file in your Downloads folder and select to be uploaded
1. Activate the plugin
1. Go to the `Oovvuu` settings page in the admin menu
1. Configure the Auth0 settings to be able to authenticate with the Oovvuu platform
1. Visit your profile page and Authenticate with the Oovvuu platform

# Developer Documentation

## Manually update your theme's featured image
Oovvuu comes with some helper functions that allow you to easily replace the existing featured image HTML with the hero embed HTML. You can simply add the code below to where you normally output your featured image to instead output an Oovvuu embed when one is present.

```php
if ( \Oovvuu\has_hero_embed() ) {
	\Oovvuu\the_hero_embed();
} else {
	// Perform normal feature image logic.
}
```

## Creating a new release
When a new version of the plugin is ready for distribution, we will need to create a new release that can be downloaded. Below are the steps for how to create a new release in GitHub.

1. Run the release script with the version number as its only argument, e.x.,`bash release.sh 1.0.0`
1. Add all untracked files `git add -A` and commit this to the built branch `git commit -m "{Message}"`
1. Push this branch up to the repo `git push -u origin`
1. Go to the GitHub repo and [create a new release](https://help.github.com/en/github/administering-a-repository/managing-releases-in-a-repository#creating-a-release)
1. Create a non-built release based on the `production` branch and use a tag name without the `-built` suffix (i.e. `v1.0.0`)
1. Add relevant changelog notes
1. Publish the release
1. Create a built release based on the built branch you created in the above steps. Make sure to have `-built` after the tag version (i.e. `v1.0.0-built`)
1. Publish the built release. No changelog notes are needed in the built release since they are already added to the non-built release.
1. Download the built plugin locally and ensure it can be installed properly. Also, do a general testing of the plugin featured to ensure everything works as expected
1. Delete the built branch since the release is published and tagged

## Build
All built files are ignored by default and therefore the plugin needs to be built after cloning the repo. The main commands that need to be run are:
1. `composer install`
1. `npm install`
1. `npm run build`

## Composer
This plugin uses the Auth0 php SDK to authenticate with the Oovvuu API. Please run `composer install` to properly install this SDK.

## Client builds

To build client assets (i.e. JavaScript and CSS files) we utilize npm. First install all packages with `npm install`. Then run `npm run build` to build all production assets.

### Development Mode

With development mode on, client assets are served from `webpack-dev-server`, which will inject changes via webpack's Hot Module Replacement feature.

First add the following to _wp-config.php_:

```php
define( 'ALLOW_DEV_MODE', true );
```

Run `npm run dev` and add a `fe-dev=on` query parameter to the URL to enable development mode. The `fe-dev=on` query parameter also adds a cookie so development mode will persist while navigating through wp-admin. Changing the parameter to `fe-dev=off` or removing the `ALLOW_DEV_MODE` constant will remove the cookie and revert asset enqueues to their expected production path.

In order to enable a secure connection you'll need to define a couple enrionment variables in a `.env` file in the project root:

* `HTTPS_KEY_PATH` - Path to TLS key relative to current home directory.
* `HTTPS_CERT_PATH` - Path to TLS cert relative to current home directory.

The default URL for development mode is `0.0.0.0`. Define a `PROXY_URL` in the `.env` file in order to use a different URL.

## Testing

Run `phpunit` to test against php files and their WordPress integration.

Run `npm run test` to run Jest tests against JavaScript files. Run `npm run test:watch` to keep the test runner open and watching for changes.

Run `npm run lint` to run ESLint against all JavaScript files. Linting will also happen when running development or production builds.

Run `phpcs` to run PHP CodeSniffer tests against PHP files.

# Continuous Integration

## Travis

Travis will automatically run `phpcs`, `npm run test`, and `npm run build` (which includes eslint). If any of these checks fail, the build will fail.
