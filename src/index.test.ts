import fs from "fs";
import path from "path";
import { codeToAst } from "equivalent-exchange";
import { formatAst } from "./index";

const sampleProgramText = fs.readFileSync(
  path.join(__dirname, "fixtures", "sample-program.ts"),
  "utf-8"
);
const ast = codeToAst(sampleProgramText, {});

test("general test", () => {
  expect(formatAst(ast, { color: false })).toMatchInlineSnapshot(`
    File#1 at root
      errors: []
      program: Program#1

    Program#1 at root.program
      sourceType: "script"
      interpreter: null
      directives: []
      body (4 children): [ExpressionStatement#1, ExportNamedDeclaration#1, FunctionDeclaration#1, VariableDeclaration#1]

    ExpressionStatement#1 at root.program.body[0]
      expression: CallExpression#1

    CallExpression#1 at root.program.body[0].expression
      callee: MemberExpression#1
      arguments (1 child): [StringLiteral#1]

    MemberExpression#1 at root.program.body[0].expression.callee
      computed: false
      object: Identifier#1
      property: Identifier#2

    Identifier#1 at root.program.body[0].expression.callee.object
      name: "console"

    Identifier#2 at root.program.body[0].expression.callee.property
      name: "log"

    StringLiteral#1 at root.program.body[0].expression.arguments[0]
      value: "Hi!"

    ExportNamedDeclaration#1 at root.program.body[1]
      exportKind: "type"
      specifiers: []
      source: null
      assertions: []
      declaration: TSTypeAliasDeclaration#1

    TSTypeAliasDeclaration#1 at root.program.body[1].declaration
      typeParameters: undefined
      id: Identifier#3
      typeAnnotation: TSTypeLiteral#1

    Identifier#3 at root.program.body[1].declaration.id
      name: "Something"

    TSTypeLiteral#1 at root.program.body[1].declaration.typeAnnotation
      members (1 child): [TSMethodSignature#1]

    TSMethodSignature#1 at root.program.body[1].declaration.typeAnnotation.members[0]
      computed: false
      typeParameters: undefined
      kind: "method"
      key: Identifier#4
      parameters (1 child): [Identifier#5]
      typeAnnotation: TSTypeAnnotation#2

    Identifier#4 at root.program.body[1].declaration.typeAnnotation.members[0].key
      name: "blah"

    Identifier#5 at root.program.body[1].declaration.typeAnnotation.members[0].parameters[0]
      name: "input"
      typeAnnotation: TSTypeAnnotation#1

    TSTypeAnnotation#1 at root.program.body[1].declaration.typeAnnotation.members[0].parameters[0].typeAnnotation
      typeAnnotation: TSStringKeyword#1

    TSStringKeyword#1 at root.program.body[1].declaration.typeAnnotation.members[0].parameters[0].typeAnnotation.typeAnnotation

    TSTypeAnnotation#2 at root.program.body[1].declaration.typeAnnotation.members[0].typeAnnotation
      typeAnnotation: TSTypeReference#1

    TSTypeReference#1 at root.program.body[1].declaration.typeAnnotation.members[0].typeAnnotation.typeAnnotation
      typeName: Identifier#6
      typeParameters: TSTypeParameterInstantiation#1

    Identifier#6 at root.program.body[1].declaration.typeAnnotation.members[0].typeAnnotation.typeAnnotation.typeName
      name: "Promise"

    TSTypeParameterInstantiation#1 at root.program.body[1].declaration.typeAnnotation.members[0].typeAnnotation.typeAnnotation.typeParameters
      params (1 child): [TSVoidKeyword#1]

    TSVoidKeyword#1 at root.program.body[1].declaration.typeAnnotation.members[0].typeAnnotation.typeAnnotation.typeParameters.params[0]

    FunctionDeclaration#1 at root.program.body[2]
      generator: false
      async: false
      id: Identifier#7
      params (1 child): [Identifier#8]
      body: BlockStatement#1

    Identifier#7 at root.program.body[2].id
      name: "withBlah"

    Identifier#8 at root.program.body[2].params[0]
      name: "someBlah"
      typeAnnotation: TSTypeAnnotation#3

    TSTypeAnnotation#3 at root.program.body[2].params[0].typeAnnotation
      typeAnnotation: TSIndexedAccessType#1

    TSIndexedAccessType#1 at root.program.body[2].params[0].typeAnnotation.typeAnnotation
      objectType: TSTypeReference#2
      indexType: TSLiteralType#1

    TSTypeReference#2 at root.program.body[2].params[0].typeAnnotation.typeAnnotation.objectType
      typeName: Identifier#9

    Identifier#9 at root.program.body[2].params[0].typeAnnotation.typeAnnotation.objectType.typeName
      name: "Something"

    TSLiteralType#1 at root.program.body[2].params[0].typeAnnotation.typeAnnotation.indexType
      literal: StringLiteral#2

    StringLiteral#2 at root.program.body[2].params[0].typeAnnotation.typeAnnotation.indexType.literal
      value: "blah"

    BlockStatement#1 at root.program.body[2].body
      directives: []
      body (1 child): [ReturnStatement#1]

    ReturnStatement#1 at root.program.body[2].body.body[0]
      argument: CallExpression#2

    CallExpression#2 at root.program.body[2].body.body[0].argument
      callee: Identifier#10
      arguments (1 child): [StringLiteral#3]

    Identifier#10 at root.program.body[2].body.body[0].argument.callee
      name: "someBlah"

    StringLiteral#3 at root.program.body[2].body.body[0].argument.arguments[0]
      value: "dsjkfdsjlfjskdf"

    VariableDeclaration#1 at root.program.body[3]
      kind: "const"
      declarations (1 child): [VariableDeclarator#1]

    VariableDeclarator#1 at root.program.body[3].declarations[0]
      id: Identifier#11
      init: ObjectExpression#1

    Identifier#11 at root.program.body[3].declarations[0].id
      name: "obj"

    ObjectExpression#1 at root.program.body[3].declarations[0].init
      properties (5 children): [ObjectProperty#1, ObjectProperty#2, ObjectProperty#3, ObjectProperty#4, ObjectProperty#5]

    ObjectProperty#1 at root.program.body[3].declarations[0].init.properties[0]
      method: false
      computed: false
      shorthand: false
      key: Identifier#12
      value: StringLiteral#4

    Identifier#12 at root.program.body[3].declarations[0].init.properties[0].key
      name: "one"

    StringLiteral#4 at root.program.body[3].declarations[0].init.properties[0].value
      value: "two"

    ObjectProperty#2 at root.program.body[3].declarations[0].init.properties[1]
      method: false
      computed: false
      shorthand: false
      key: Identifier#13
      value: StringLiteral#5

    Identifier#13 at root.program.body[3].declarations[0].init.properties[1].key
      name: "three"

    StringLiteral#5 at root.program.body[3].declarations[0].init.properties[1].value
      value: "four"

    ObjectProperty#3 at root.program.body[3].declarations[0].init.properties[2]
      method: false
      computed: false
      shorthand: false
      key: Identifier#14
      value: StringLiteral#6

    Identifier#14 at root.program.body[3].declarations[0].init.properties[2].key
      name: "can"

    StringLiteral#6 at root.program.body[3].declarations[0].init.properties[2].value
      value: "I"

    ObjectProperty#4 at root.program.body[3].declarations[0].init.properties[3]
      method: false
      computed: false
      shorthand: false
      key: Identifier#15
      value: StringLiteral#7

    Identifier#15 at root.program.body[3].declarations[0].init.properties[3].key
      name: "have"

    StringLiteral#7 at root.program.body[3].declarations[0].init.properties[3].value
      value: "a"

    ObjectProperty#5 at root.program.body[3].declarations[0].init.properties[4]
      method: false
      computed: false
      shorthand: false
      key: Identifier#16
      value: StringLiteral#8

    Identifier#16 at root.program.body[3].declarations[0].init.properties[4].key
      name: "little"

    StringLiteral#8 at root.program.body[3].declarations[0].init.properties[4].value
      value: "more"
  `);
});
