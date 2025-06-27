# 📦 构建配置说明

本项目使用 **Rollup** 作为构建工具，支持生成多种模块格式的输出。

## 🎯 构建目标

- **ESM** (ES Modules): `dist/esm/index.js` - 现代浏览器和Node.js的ES模块格式
- **CJS** (CommonJS): `dist/cjs/index.js` - Node.js的传统模块格式  
- **UMD** (Universal Module Definition): `dist/umd/index.js` - 通用模块格式，支持浏览器全局变量
- **UMD (压缩版)**: `dist/umd/index.min.js` - 压缩版本，用于生产环境
- **AMD** (Asynchronous Module Definition): `dist/amd/index.js` - AMD模块格式
- **类型定义**: `dist/index.d.ts` - TypeScript类型定义文件

## 🔧 Rollup 配置特点

### 插件配置

1. **@rollup/plugin-typescript** - TypeScript编译支持
2. **@rollup/plugin-node-resolve** - 解析Node.js模块
3. **@rollup/plugin-commonjs** - CommonJS模块转换
4. **@rollup/plugin-terser** - 代码压缩（仅用于生产版本）
5. **rollup-plugin-dts** - 生成类型定义文件

> **注意**: 项目使用 Rollup 4.x 版本，相比 3.x 版本有以下改进：
> - 使用 `@rollup/plugin-terser` 替代 `rollup-plugin-terser`
> - 更好的 ES 模块支持和性能优化
> - 项目配置为 ES 模块 (`"type": "module"` in package.json)

### 构建优化

- ✅ **Tree Shaking** - 自动移除未使用的代码
- ✅ **源码映射** - 所有格式都包含source map
- ✅ **保留Console** - 不移除console语句（因为这是控制台输出库）
- ✅ **代码压缩** - UMD压缩版本用于生产环境
- ✅ **多格式支持** - 一次构建生成所有模块格式

## 📂 输出结构

```
dist/
├── esm/
│   ├── index.js
│   └── index.js.map
├── cjs/
│   ├── index.js
│   └── index.js.map
├── umd/
│   ├── index.js
│   ├── index.js.map
│   ├── index.min.js
│   └── index.min.js.map
├── amd/
│   ├── index.js
│   └── index.js.map
├── index.d.ts
└── index.d.ts.map
```

## 🚀 构建命令

```bash
# 完整构建（清理 + 构建所有格式）
npm run build

# 开发模式（监听文件变化，自动重新构建）
npm run dev

# 监听模式构建
npm run build:watch

# 清理构建目录
npm run clean
```

## 🔍 构建验证

构建完成后，可以通过以下方式验证：

```bash
# 检查输出文件
ls -la dist/

# 验证不同模块格式
node -e "console.log(require('./dist/cjs/index.js'))"
node -e "import('./dist/esm/index.js').then(console.log)"

# 运行示例
node examples/node.js
# 浏览器打开 examples/basic.html
```

## ⚡ 性能特点

相比 Webpack，Rollup 在库构建方面的优势：

- 🔥 **更快的构建速度** - 专为库优化
- 📦 **更小的包体积** - 更好的tree-shaking
- 🎯 **更清晰的输出** - 更易读的生成代码
- 🔧 **更简单的配置** - 专注于库的构建需求

## 🛠 自定义构建

如需修改构建配置，编辑 `rollup.config.js` 文件：

```javascript
// 添加新的输出格式
{
  ...baseConfig,
  output: {
    file: 'dist/custom/index.js',
    format: 'iife',  // 立即执行函数格式
    name: 'ConsoleCharm',
    sourcemap: true
  }
}
``` 