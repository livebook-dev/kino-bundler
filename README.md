# @livebook/kino-bundler

This package includes a common script for bundling Kino assets with zero configuration.

The bundling setup uses esbuild and Tailwind configured with Livebook color palette.

## Installation

```
npm install -D @livebook/kino-bundler
```

## Usage

See [assets](https://github.com/livebook-dev/kino/tree/main/assets) in the Kino repository
for example usage.

This script is opinionated about the directory structure, so that no configuration is
necessary. It is designed to support multiple asset bundles, where all of them are in
the same npm project.

Example project structure:

```
assets/
├── packs/
│   ├── my_smart_cell/
│   │   ├── ...
│   │   └── main.js
│   └── my_kino/
│       ├── ...
│       └── main.js
├── shared/
│   └── *.js
├── package-lock.json
└── package.json
```

Each directory in `packs/` is going to be bundled separately into `lib/assets/{pack}/build/`.
Code shared across packs should be placed in the `shared/` directory, which is scanned by
Tailwind (in addition to each pack).

## API

```
kino-bundler [--watch] [--dev]

OPTIONS

  --watch         When enabled, the source fiels are watched and and rebuilt every change.
  --dev           When enabled, the bundle is not production-optimised, includes dev warnings and sourcemaps.

```

## License

    Copyright (C) 2024 Dashbit

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at [http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
