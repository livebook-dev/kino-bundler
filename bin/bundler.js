#!/usr/bin/env node

const util = require("util");
const process = require("process");
const fs = require("fs");
const { glob } = require("glob");
const { build } = require("../src/build");

async function main() {
  if (!fs.existsSync("packs")) {
    throw new Error(
      "Expected packs/ to exist, but no such directory has been found",
    );
  }

  const packs = fs.readdirSync("packs");

  const args = util.parseArgs({
    options: {
      dev: {
        type: "boolean",
        default: false,
      },
      watch: {
        type: "boolean",
        default: false,
      },
    },
  });

  await Promise.all(
    packs.map(async (pack) => {
      const pattern = `packs/${pack}/main.{js,ts,jsx,tsx}`;
      const entrypoints = await glob(pattern);

      if (entrypoints.length !== 1) {
        throw new Error(
          `Expected a single entrypoint at ${pattern}, but found ${entrypoints.length}`,
        );
      }

      const entrypint = entrypoints[0];

      const outdir = `../lib/assets/${pack}/build`;
      const tailwindDirs = ["./shared", `./packs/${pack}`];
      const options = { prod: !args.values.dev, watch: args.values.watch };

      await build(entrypint, outdir, tailwindDirs, options);
    }),
  );
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
