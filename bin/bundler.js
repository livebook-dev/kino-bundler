#!/usr/bin/env node

const util = require("util");
const path = require("path");
const process = require("process");
const fs = require("fs");
const { build } = require("../src/build");

async function main() {
  try {
    const args = util.parseArgs({
      options: {
        input: {
          type: "string",
          default: "src/main.js",
        },
        "tailwind-content-glob": {
          type: "string",
          default: ["./src/**/*.js"],
          multiple: true,
          short: "c",
        },
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

    if (!fs.existsSync(args.values.input)) {
      throw new Error(
        `Expected ${args.values.input} to exist, but no such file has been found`
      );
    }

    if (!args.values.outdir) {
      throw new Error("Mising required option --outdir");
    }

    const outdir = args.values.outdir;
    const options = { prod: !args.values.dev, watch: args.values.watch };
    const tailwindContentGlob = args.values["tailwind-content-glob"];

    await build(args.values.input, outdir, tailwindContentGlob, options);
    process.exit(0);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

main();
