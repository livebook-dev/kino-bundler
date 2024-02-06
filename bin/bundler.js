#!/usr/bin/env node

const util = require("util");
const path = require("path");
const process = require("process");
const fs = require("fs");
const { build } = require("../src/build");

async function main() {
  const input = "src/main.js";

  try {
    const args = util.parseArgs({
      options: {
        outdir: {
          type: "string",
        },
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

    if (!fs.existsSync(input)) {
      throw new Error(
        "Expected src/main.js to exist, but no such file has been found",
      );
    }

    if (!args.values.outdir) {
      throw new Error("Mising required option --outdir");
    }

    const outdir = args.values.outdir;
    const options = { prod: !args.values.dev, watch: args.values.watch };

    await build(input, outdir, options);
    process.exit(0);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

main();
