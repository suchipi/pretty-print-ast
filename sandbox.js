const fs = require("fs");
const path = require("path");
const { codeToAst } = require("equivalent-exchange");
const { formatAst } = require(".");

const sampleProgramText = fs.readFileSync(
  path.join(__dirname, "src", "fixtures", "sample-program.ts"),
  "utf-8"
);
const ast = codeToAst(sampleProgramText, {});

console.log(formatAst(ast));
