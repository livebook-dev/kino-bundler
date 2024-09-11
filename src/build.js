const path = require("path");
const fs = require("fs");
const esbuild = require("esbuild");
const stylePlugin = require("esbuild-style-plugin");
const tailwind = require("tailwindcss");
const autoprefixer = require("autoprefixer");

const tailwindConfigBase = require("../tailwind.config.js");

module.exports.build = async function (
  entrypint,
  outdir,
  tailwindDirs,
  { prod = true, watch = false } = {},
) {
  if (fs.existsSync(outdir)) {
    const mainOutputName = "main.js";

    // Check for the main output as a simple heuristic to avoid removing
    // the directory if the user specified a wrong one
    if (fs.existsSync(path.join(outdir, mainOutputName))) {
      fs.rmSync(outdir, { recursive: true, force: true });
    } else {
      throw new Error(
        `The output directory ${outdir} is not empty, but does not contain ${mainOutputName}. Are you sure you specified the right output directory? If you are sure, then remove the output directory manually and run the build again.`,
      );
    }
  }

  const tailwindConfig = {
    ...tailwindConfigBase,
    content: tailwindDirs.map((dir) => `${dir}/**/*.{js,ts,jsx,tsx}`),
  };

  const ctx = await esbuild.context({
    entryPoints: [entrypint],
    outdir: outdir,
    bundle: true,
    splitting: true,
    target: "es2017",
    format: "esm",
    minify: prod,
    sourcemap: prod ? undefined : "linked",
    plugins: [
      stylePlugin({
        postcss: {
          plugins: [tailwind(tailwindConfig), autoprefixer],
        },
      }),
    ],
    loader: {
      ".js": "jsx",
      ".ttf": "file",
      ".woff": "file",
      ".woff2": "file",
      ".eot": "file",
      ".svg": "file",
    },
  });

  if (watch) {
    await ctx.watch();

    await new Promise((resolve, _reject) => {
      process.stdin.on("close", () => {
        resolve();
      });

      process.stdin.resume();
    });
  } else {
    await ctx.rebuild();
  }
};
