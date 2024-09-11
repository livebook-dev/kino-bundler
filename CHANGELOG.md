# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v0.2.1](https://github.com/livebook-dev/kino-bundler/tree/v0.2.1) (2024-09-11)

This release makes it possible to create multiple bundles from the same npm project, which should simplify kino packages dealing with multiple asset bundles. In the spirit of zero configuration, the script is now more opinionated and assumes a certain directory structure, which is a breaking change. Refer to the README.md for the new usage.

### Added

* Support for creating multiple bundles

### Changed

* The script now expects an opinionated directory structure

## [v0.1.0](https://github.com/livebook-dev/kino-bundler/tree/v0.1.0) (2024-02-06)

Initial release.
