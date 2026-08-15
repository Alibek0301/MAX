const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;

const code = fs.readFileSync('src/App.jsx', 'utf8');
const ast = parser.parse(code, {
  sourceType: 'module',
  plugins: ['jsx']
});

traverse(ast, {
  Identifier(path) {
    if (path.node.name === 'role') {
      const parent = path.parent;
      if (parent.type === 'BinaryExpression') {
        const isClient = parent.right.value === 'client' || parent.left.value === 'client';
        const isAdmin = parent.right.value === 'admin' || parent.left.value === 'admin';
        const isDriver = parent.right.value === 'driver' || parent.left.value === 'driver';
        
        let evalResult = false;
        if (parent.operator === '===') {
          evalResult = isClient;
        } else if (parent.operator === '!==') {
          evalResult = !isClient;
        }
        
        path.parentPath.replaceWith({
          type: 'BooleanLiteral',
          value: evalResult
        });
      }
    }
  },
  LogicalExpression(path) {
    if (path.node.operator === '&&') {
      if (path.node.left.type === 'BooleanLiteral') {
        if (path.node.left.value === true) {
          path.replaceWith(path.node.right);
        } else {
          path.replaceWith({ type: 'BooleanLiteral', value: false });
        }
      }
    }
  },
  ConditionalExpression(path) {
    if (path.node.test.type === 'BooleanLiteral') {
      if (path.node.test.value === true) {
        path.replaceWith(path.node.consequent);
      } else {
        path.replaceWith(path.node.alternate);
      }
    }
  },
  JSXExpressionContainer(path) {
    if (path.node.expression.type === 'BooleanLiteral') {
      if (path.node.expression.value === false) {
        path.remove();
      }
    }
  }
});

const output = generate(ast, { retainLines: true }, code);
fs.writeFileSync('src/App.jsx', output.code);
console.log('Done cleaning roles');
