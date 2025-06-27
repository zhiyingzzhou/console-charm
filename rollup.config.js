import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import dts from 'rollup-plugin-dts';
import { readFileSync } from 'fs';

// 读取 package.json 文件 (ESM 方式)
const packageJson = JSON.parse(readFileSync('./package.json', 'utf8'));

// 基础配置
const baseConfig = {
  input: 'src/index.ts',
  external: [],
  plugins: [
    resolve({
      browser: true,
      preferBuiltins: false
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: false,
      declarationMap: false
    })
  ]
};

// 生产环境插件
const productionPlugins = [
  ...baseConfig.plugins,
  terser({
    format: {
      comments: false
    },
    compress: {
      drop_console: false // 保留 console 语句，因为这是控制台输出库
    }
  })
];

export default [
  // ESM 构建
  {
    ...baseConfig,
    output: {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true
    }
  },

  // CommonJS 构建
  {
    ...baseConfig,
    output: {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
      exports: 'named'
    }
  },

  // UMD 构建 (未压缩)
  {
    ...baseConfig,
    output: {
      file: 'dist/umd/index.js',
      format: 'umd',
      name: 'ConsoleCharm',
      sourcemap: true,
      exports: 'named'
    }
  },

  // UMD 构建 (压缩)
  {
    ...baseConfig,
    plugins: productionPlugins,
    output: {
      file: 'dist/umd/index.min.js',
      format: 'umd',
      name: 'ConsoleCharm',
      sourcemap: true,
      exports: 'named'
    }
  },

  // AMD 构建
  {
    ...baseConfig,
    output: {
      file: 'dist/amd/index.js',
      format: 'amd',
      sourcemap: true,
      exports: 'named'
    }
  },

  // 类型定义文件
  {
    input: 'src/index.ts',
    output: {
      file: packageJson.types,
      format: 'esm'
    },
    plugins: [dts()]
  }
]; 