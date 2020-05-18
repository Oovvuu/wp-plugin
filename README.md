# Build
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
