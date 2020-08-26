# Overview

# Releases

### Stable

| Build  | Status                                                                                                                            | Download                                                                                                                                                     |
| ------ | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| latest | ![Build](https://img.shields.io/circleci/build/github/Oovvuu/wp-plugin/production?token=6bf58244e88fd0360ace2bcdb9b73bf36830b374) | [![Download](https://img.shields.io/github/v/release/Oovvuu/wp-plugin?sort=semver)](https://github.com/Oovvuu/wp-plugin/releases/latest/download/oovvuu.zip) |

# Installation

## WordPress Plugin

1. Download the [latest built release](https://github.com/oovvuu/wp-plugin/releases/latest) of the plugin, make sure you get the file `oovvuu.zip`
2. Go to Plugins > Add New in your dashboard
3. Click the `Upload Plugin` button to prompt a file selector
4. Locate the built zip file in your Downloads folder and select it to be uploaded
5. Activate the plugin
6. Go to the `Oovvuu` settings page in the admin menu
7. Configure the Auth0 settings to be able to authenticate with the Oovvuu platform
8. Visit your profile page and Authenticate with the Oovvuu platform

## Plugin Setup

Once the plugin is installed you will need to set up the Authentication details in order for your users to be able to use the Oovvuu platform. This is done by clicking on the `Oovvuu Settings` on the lower left of the WordPress dashboard.

Once you have the Oovvuu plugin settings page open you can enter the following details:
| Name          | value                          | Description                                                                                              |
| ------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------- |
| Domain        | oovvuu-production.au.auth0.com | The Authentication Domain for the Oovvuu platform                                                        |
| Client ID     |                                | The client ID, this will be provided by Oovvuu and is unique for your organisation                       |
| Client Secret |                                | This is the login secret, just like a password this should be kept safe. This will be provided by Oovvuu |

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

Running `npm run dev` starts development mode.

With development mode on, client assets are served from `webpack-dev-server`, which will inject changes via webpack's Hot Module Replacement feature.

In order to enable a secure connection you'll need to define a couple environment variables in a `.env` file in the project root:

- `HTTPS_KEY_PATH` - Path to TLS key relative to current home directory.
- `HTTPS_CERT_PATH` - Path to TLS cert relative to current home directory.

The default URL for development mode is `0.0.0.0`. Define a `PROXY_URL` in the `.env` file in order to use a different URL.

## Testing

Run `phpunit` to test against php files and their WordPress integration.

Run `npm run test` to run Jest tests against JavaScript files. Run `npm run test:watch` to keep the test runner open and watching for changes.

Run `npm run lint` to run ESLint against all JavaScript files. Linting will also happen when running development or production builds.

Run `phpcs` to run PHP CodeSniffer tests against PHP files.
