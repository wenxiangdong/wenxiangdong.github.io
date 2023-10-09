---
title: Babel原理与实践浅尝
tags: [babel, plugin]
---

# 目录
# 介绍

Babel 是一个 Javascript 编译器，最主要的用途是将用最新标准写的 JS 代码向下编译成兼容版本

此外，Babel 还可以：

- 支持语法扩展，如 React 的 JSX 语法
- 支持 Flow，静态类型检查

…

# 安装

使用 babel-cli 来在命令行下编译 JS 文件

```bash
npm install -g babel-cli
```

然后就可以编译文件（结果会直接输出到终端）

```bash
babel my-file.js
```

# 配置

使用`.babelrc`文件来配置

**plugin**: babel 的插件化机制，让开发者能够丰富其能力

**preset**: 一组预先配置，包括plugins和其他配置

# 抽象语法树

代码会被生成为一棵抽象语法树（AST），每一层有相似的结构，称为`节点（Node）`

```jsx
function square(n) {
	return n * n;
}
```

解析为

```bash
- FunctionDeclaration:
  - id:
    - Identifier:
      - name: square
  - params [1]
    - Identifier
      - name: n
  - body:
    - BlockStatement
      - body [1]
        - ReturnStatement
          - argument
            - BinaryExpression
              - operator: *
              - left
                - Identifier
                  - name: n
              - right
                - Identifier
                  - name: n
```

# Babel 的处理步骤

1. 解析 parse：接收代码并输出`AST`
    1. 词法分析：将字符串形式的代码，转换为`令牌（tokens`）流，可以看作扁平的语法片段数组
    
    ```jsx
    n * n;
    /** 转换成 */
    [
      { type: { ... }, value: "n", start: 0, end: 1, loc: { ... } },
      { type: { ... }, value: "*", start: 2, end: 3, loc: { ... } },
      { type: { ... }, value: "n", start: 4, end: 5, loc: { ... } },
      ...
    ]
    ```
    
    1. 语法分析：利用`tokens`的信息，构建`AST`
2. 转换 transform：接收 AST 并对其进行*遍历*，在此过程中对节点进行添加、更新及移除等*操作。插件*在这一阶段介入。
3. 生成 generate：生成字符串形式的代码，创建`source maps`

# 遍历

Babel 插件是用于在 Babel 的转换阶段对代码进行操作的工具。插件可以添加、更新或删除 AST 节点，从而修改代码的结构和行为。开发者可以根据需要选择不同的插件来扩展 Babel 的功能，例如转换特定语法、优化代码或添加自定义功能。

想要转换AST，需要进行*递归的树形遍历*

> 树形遍历：**前序遍历**、**中序遍历**、**后序遍历**，前、中、后代表根节点在遍历时的位置
> 

## Visitors（访问者）

> 访问者是一个接口，它拥有一个visit方法，这个方法对访问到的对象结构中不同类型的元素作出不同的反应；在对象结构的一次访问过程中，我们遍历整个对象结构，对每一个元素都实施accept方法，在每一个元素的accept方法中[回调](https://zh.wikipedia.org/wiki/%E5%9B%9E%E8%B0%83)访问者的visit方法，从而使访问者得以处理对象结构的每一个元素
> 

[访问者模式](https://zh.wikipedia.org/wiki/%E8%AE%BF%E9%97%AE%E8%80%85%E6%A8%A1%E5%BC%8F)

实际上有两次机会来访问一个节点，enter 和 exit

```jsx
const MyVisitor = {
  Identifier: {
    enter() {
      console.log("Entered!");
    },
    exit() {
      console.log("Exited!");
    }
  }
};
```

把方法名用`|`分割成`Idenfifier|MemberExpression`形式的字符串，把同一个函数应用到多种访问节点

## Paths（路径）

是表示两个节点之间连接的对象，同时是 visitor 的访问对象（即`enter/exi`t方法的参数）

```jsx
{
	"parent": {...},
  "node": {...},
	...
}
```

## Scope（作用域）

> JavaScript 使用[词法作用域](https://zh.wikipedia.org/wiki/%E4%BD%9C%E7%94%A8%E5%9F%9F#%E9%9D%99%E6%80%81%E4%BD%9C%E7%94%A8%E5%9F%9F%E4%B8%8E%E5%8A%A8%E6%80%81%E4%BD%9C%E7%94%A8%E5%9F%9F)，即编译时静态确定的作用域
> 

作用域可以表示如下：

```jsx
{
  path: path,
  block: path.node,
  parentBlock: path.parent,
  parent: parentScope,
  bindings: [...]
}
```

所有引用属于特定的作用域，引用和作用域的这种关系被称作：**绑定（binding）**，即保存了引用与作用域的对应关系。

# API

> Babel 实际上是一组模块的集合
> 

## babylon

Babel 的解析器

## babel-traverse

[Babel-traverse](https://babeljs.io/docs/en/babel-traverse) 是 Babel 的遍历器模块，它提供了一组用于遍历和操作 AST 的方法。通过使用 babel-traverse，开发者可以方便地在 AST 上执行各种操作，例如查找节点、替换节点、插入节点等。这个模块是 Babel 中非常重要的一部分，插件和预设都会用到它来访问和修改 AST。

## babel-types

用于 AST 节点的 Lodash 式工具库，构造、验证以及变换 AST 节点的方法

```jsx
t.isBinaryExpression(maybeBinaryExpressionNode, { operator: "*" });
```

## babel-template

能力：编写字符串形式且带有占位符的代码来代替手动编码

```jsx
const buildRequire = template(`
  var IMPORT_NAME = require(SOURCE);
`);

const ast = buildRequire({
  IMPORT_NAME: t.identifier("myModule"),
  SOURCE: t.stringLiteral("my-module")
});

console.log(generate(ast).code);
// 输出结果
// var myModule = require("my-module");
```

# 你的第一个 Babel 插件！

一个 babel 插件是类似以下的形式：

```jsx
exports.default = function({ types: t }) {
  return {
    visitor: {
      Identifier(path, state) {},
      ASTNodeTypeHere(path, state) {}
    }
  };
};
module.exports = exports['default'];
```

# 转换操作 // Transformation Operations

## 查询操作

### 访问子节点路径

- `path.node.property`访问节点的属性
- `path.get('body.0')`获取子节点的路径，可以通过子符号路径进行索引

```jsx
// declaration function f(){}
// body {}
// body statement list
// 0 return bar
export default function f() {
  return bar;
}
// 获取上述的 return 语句
const visitor = {
	ExportDefaultDeclaration(path) {
	  path.get("declaration.body.body.0");
	}
}
```

### 检查节点类型

- `t.isXXX(path.node, {prop: xxx})`检查节点（Node）是否XXX类型，并对相应属性做浅比较
- `path.get('left').isXXX(path.node, {prop: xxx})`检查路径（Path）是否XXX类型，并对相应属性做浅比较

### 查找父路径（Parent Path）

- `path.findParent((path) => boolean);`
- 有一些快捷操作，`getFunctionParent``getStatementParent`

### 查找兄弟路径

- `path.inList` 路径是否在某个list中
- `path.getSibling(index)` 索引查找
- `path.key` 路径的索引
- `getNextSibling`,`getPrevSibling` …

## 修改操作

### 替换当前节点

- `path.replaceWith(node)`
- `path.replaceWithMultiple(nodes)`
- `path.replaceWithSourceString(string)`

### 插入节点

- `path.insertBefore(node)`
- `path.insertAfter(node)`
- `path.get('body').unshiftContainer(node)`类似数组的操作
- `path.get('body').pushContainer(node)`类似数组的操作

### 删除操作

- `path.remove()`

## 作用域相关操作

- `path.scope.hasBinding(name),` `path.scope.hasOwnBinding("n")`检查绑定
- `path.scope.generateUidIdentifier()`生成唯一id
- `path.scope.rename(oldName, newName?)`重命名

# 插件选项

在`.babelrc`配置插件时，可以传入插件对应的选项，写法如下：

```jsx
{
  plugins: [
    ["my-plugin", {
      "option1": true,
      "option2": false
    }]
  ]
}
```

# 写一个有业务背景的插件

## 背景

1. 项目跑在不同的区域(zone)，例如中国(cn)，新加坡(sg)，美东(va)
2. 有些组件/脚本在不同的区域有不同的需求/业务/逻辑，例如广告位在cn和sg有不同的请求和UI结构
3. ZONE变量在编译代码时会注入。

通常情况我们会使用 [`process.env.ZONE](http://process.env.ZONE) ===  “cn”`这类代码来判断，但是这导致代码变得复杂且丑陋，考虑以下方案：

1. 将不同区域的代码分开写在不同的文件中，并且使用一个统一文件作为接口，举例 `./hello/index.js` 作为接口/默认实现，`./hello/index.{cn|sg|va}.js` 作为区域的异化实现。
2. 使用时，只需要导入接口文件`./hello`,构建/编译时会自动替换成相应的区域实现代码

## 实现这个插件

1. 使用`@babel/helper-plugin-utils`来辅助定义一个插件

```jsx
// my-plugin.js
const { declare } = require("@babel/helper-plugin-utils");
exports.default = declare(({ types }, opts) => {
  return {
    visitor: {
      ...
    },
  };
});
module.exports = exports["default"];
```

1. 由于我们需要修改的是导入语句，那我们需要实现`visitor`的`ImportDeclaration`方法

```jsx
visitor: {
  ImportDeclaration(path) {
		...
	}
},

```

1. 逻辑很简单，我们已经假定了只能从`./xxx`的形式导入，并且区域异化的代码也都在`xxx`目录下，那只需要将`./xxx`改写成 `./xxx/index.{cn|sg|va}.js`，并且判断是否存在对应区域的异化文件

```jsx
ImportDeclaration(path) {
    const sourceValue = path.node.source.value;
		// 格式化一下
    const formatSource = sourceValue.replace(/\/index(?:\.js)?/, "");
		// 将./xxx改写成 ./xxx/index.{cn|sg|va}.js
    const withZoneSource =
      formatSource + "/index." + process.env.ZONE + ".js";
    const fullPath = nodePath.resolve(this.filename, "..", withZoneSource);
    const exists = fs.existsSync(fullPath);
    if (exists) {
      path.node.source = types.stringLiteral(withZoneSource);
    }
  },
```

1. 我们并不希望每个导入文件都这样处理，可以通过插件options来传入一个include参数，以glob形式来确定哪些文件需要处理

```jsx
// .babelrc
{
	"plugins": [["./plugins/my-plugin.js", { "include": ["hello"] }]]
}
```

```jsx
// my-plugin.js
ImportDeclaration(path) {
	const { include = [] } = opts;
	const sourceValue = path.node.source.value;
	const included = micromatch.isMatch(sourceValue, include, {
	  contains: true,
	});
	console.log(sourceValue, include, included);
	if (!included) {
	  return;
	}
}
```

1. 我们的插件已经写完了，现存使用以下文件

```jsx
|-- src
		|-- hello
					|-- index.js
					|-- index.cn.js
		|-- index.js
```

```jsx
// src/hello/index.js
export default () => {
  console.log('index.js');
}
// src/hello/index.cn.js
export default () => {
  console.log('index.cn.js');
}
// src/index.js
import hello from './hello';
hello();
```

使用命令 `ZONE=cn babel src --out-dir dist` 编译代码，得到`dis/index.js`如下的内容

```jsx
// dist/index.js
import hello from "./hello/index.cn.js";
hello();
```

`node dist/index.js`将代码运行，控制台得到结果：`index.cn.js`

# 总结

Babel的能力总结如下：

将源代码（字符串）分析，构建成一棵语法树（AST），使用访问者模式对AST进行遍历，期间对节点 （Node）进行各种变换操作，最终再生成新代码（字符串）。