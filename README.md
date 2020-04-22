## Running builds

Run `npm run build` to build all production assets. Run `npm run dev` for a development build of assets, which also watches files for changes and automatically recompiles.

## Running Tests

Run `npm run test` to run Jest tests against JavaScript files. Run `npm run test:watch` to keep the test runner open and watching for changes.

Run `npm run lint` to run ESLint against all JavaScript files. Linting will also happen when running development or production builds.

Run `phpcs` to run PHP CodeSniffer tests against PHP files.

## Travis Integration

Travis will automatically run `phpcs`, `npm run test`, and `npm run build` (which includes eslint). If any of these checks fail, the build will fail.
