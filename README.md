# Overview

# Releases

### Stable

| Build  | Status                                                                                                                            | Download                                                                                                                                                     |
| ------ | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| latest | ![Build](https://img.shields.io/circleci/build/github/Oovvuu/wp-plugin/production?token=6bf58244e88fd0360ace2bcdb9b73bf36830b374) | [![Download](https://img.shields.io/github/v/release/Oovvuu/wp-plugin?sort=semver)](https://github.com/Oovvuu/wp-plugin/releases/latest/download/oovvuu.zip) |

# Installation

## Wordpress Plugin

1. Download the [latest built release](https://github.com/alleyinteractive/oovvuu/releases) of the plugin
1. Go to Plugins > Add New in your dashboard
1. Click the `Upload Plugin` button to prompt a file selector
1. Locate the built zip file in your Downloads folder and select it to be uploaded
1. Activate the plugin
1. Go to the `Oovvuu` settings page in the admin menu
1. Configure the Auth0 settings to be able to authenticate with the Oovvuu platform
1. Visit your profile page and Authenticate with the Oovvuu platform

## Plugin Setup

Once the plugin is installed you will need to set up the Authentication details in order for your users to be able to use the Oovvuu platform. This is done by clicking on the `Oovvuu Settings` on the lower left of the Wordpress dashboard.

Once you have the Oovvuu plugin settings page open you can enter the following details:
| Name | value | Description |
| ---- | ---- | ----- |
| Domain | oovvuu-production.au.auth0.com | The Authentication Domain for the Oovvuu platform |
| Client ID | | The client ID, this will be provided by Oovvuu and is unique for your organisation |
| Client Secret | | This is the login secret, just like a password this should be kept safe. This will be provided by Oovvuu |

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
