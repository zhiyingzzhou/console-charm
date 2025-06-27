#!/usr/bin/env node

/**
 * Console Charm - Node.js 示例
 * 运行命令: node examples/node.js
 */

// 如果是在开发环境，需要先构建
// 实际使用时这样导入: const { success, info, warning, error, buildInfo } = require('console-charm');
const path = require('path');

// 模拟从构建后的包导入（实际使用时从node_modules导入）
let ConsoleCharm;
try {
  // 尝试导入构建后的CJS版本
  ConsoleCharm = require('../dist/cjs/index.js');
} catch (err) {
  console.log('⚠️  请先运行 npm run build 构建项目');
  console.log('或者直接使用源码:');
  
  // 开发环境下的备用方案（需要ts-node）
  try {
    require('ts-node/register');
    ConsoleCharm = require('../src/index.ts');
  } catch (tsErr) {
    console.log('❌ 无法加载模块，请确保项目已构建或安装了ts-node');
    process.exit(1);
  }
}

console.log('🚀 Console Charm - Node.js 示例演示\n');

// 基本消息类型示例
console.log('=== 基本消息类型 ===');
ConsoleCharm.success('数据库连接成功');
ConsoleCharm.info('服务启动完成');
ConsoleCharm.warning('内存使用率较高');
ConsoleCharm.error('API调用失败');
console.log('');

// 主题样式示例
console.log('=== 主题样式演示 ===');
ConsoleCharm.badgeWithTheme('状态', 'primary', 'primary');
ConsoleCharm.badgeWithTheme('状态', 'secondary', 'secondary');
ConsoleCharm.badgeWithTheme('状态', 'success', 'success');
ConsoleCharm.badgeWithTheme('状态', 'info', 'info');
ConsoleCharm.badgeWithTheme('状态', 'warning', 'warning');
ConsoleCharm.badgeWithTheme('状态', 'error', 'error');
ConsoleCharm.badgeWithTheme('状态', 'dark', 'dark');
ConsoleCharm.badgeWithTheme('状态', 'light', 'light');
console.log('');

// 环境信息示例
console.log('=== 环境信息演示 ===');
ConsoleCharm.environment('development');
ConsoleCharm.environment('test');
ConsoleCharm.environment('staging');
ConsoleCharm.environment('production');
console.log('');

// 版本信息示例
console.log('=== 版本信息演示 ===');
ConsoleCharm.version('1.0.0');
ConsoleCharm.version('2.1.3-beta');
ConsoleCharm.version('3.0.0-rc.1');
console.log('');

// 构建日期示例
console.log('=== 构建日期演示 ===');
ConsoleCharm.buildDate(new Date());
ConsoleCharm.buildDate('2025-01-26 19:38:18');
console.log('');

// Git信息示例
console.log('=== Git信息演示 ===');
ConsoleCharm.branch('main');
ConsoleCharm.branch('feature/new-ui');
ConsoleCharm.commit('a1b2c3d4e5f67890');
ConsoleCharm.commit('短哈希abc123');
console.log('');

// 完整构建信息示例
console.log('=== 完整构建信息演示 ===');
ConsoleCharm.buildInfo({
  version: '2.1.3',
  environment: 'production',
  buildDate: new Date(),
  branch: 'main',
  commit: 'a1b2c3d4e5f67890abcdef1234567890'
});
console.log('');

// 自定义徽章示例
console.log('=== 自定义徽章演示 ===');
ConsoleCharm.badge({
  label: '自定义',
  value: '样式',
  labelStyle: {
    color: '#ffffff',
    backgroundColor: '#ff6b6b',
    fontWeight: 'bold',
    padding: '4px 8px',
    borderRadius: '4px 0 0 4px'
  },
  valueStyle: {
    color: '#ff6b6b',
    backgroundColor: '#ffe0e0',
    fontWeight: 'bold',
    padding: '4px 8px',
    borderRadius: '0 4px 4px 0'
  }
});

ConsoleCharm.badge({
  label: '性能',
  value: '优秀',
  labelStyle: {
    color: '#ffffff',
    backgroundColor: '#28a745',
    fontWeight: 'bold',
    padding: '3px 6px',
    borderRadius: '3px 0 0 3px'
  },
  valueStyle: {
    color: '#28a745',
    backgroundColor: '#d4edda',
    fontWeight: 'bold',
    padding: '3px 6px',
    borderRadius: '0 3px 3px 0'
  }
});
console.log('');

// 高级配置示例
console.log('=== 高级配置演示 ===');

// 创建带时间戳的实例
const timestampCharm = ConsoleCharm.createConsoleCharm({
  showTimestamp: true,
  prefix: '🕒'
});

timestampCharm.success('带时间戳的成功消息');
timestampCharm.info('带时间戳的信息消息');

// 创建带自定义前缀的实例
const customPrefixCharm = ConsoleCharm.createConsoleCharm({
  prefix: '🚀 MyApp'
});

customPrefixCharm.success('带前缀的成功消息');
customPrefixCharm.warning('带前缀的警告消息');

// 创建可禁用的实例
const configurableCharm = ConsoleCharm.createConsoleCharm({
  disableInProduction: true // 在生产环境自动禁用
});

configurableCharm.info('这条消息在生产环境不会显示');
console.log('');

// 环境检测示例
console.log('=== 环境检测演示 ===');
const envInfo = ConsoleCharm.detectEnvironment();
console.log('环境信息:', envInfo);

if (envInfo.isNode) {
  ConsoleCharm.success(`Node.js 环境 v${envInfo.nodeVersion}`);
} else if (envInfo.isBrowser) {
  ConsoleCharm.success(`浏览器环境: ${envInfo.userAgent}`);
}

ConsoleCharm.info(`样式支持: ${envInfo.supportsStyles ? '✅' : '❌'}`);
console.log('');

// 实际应用场景示例
console.log('=== 实际应用场景演示 ===');

// 模拟应用启动日志
ConsoleCharm.success('应用启动成功');
ConsoleCharm.environment(process.env.NODE_ENV || 'development');
ConsoleCharm.version('1.0.0');
ConsoleCharm.buildDate(new Date());

// 模拟一些操作日志
setTimeout(() => {
  ConsoleCharm.info('连接数据库...');
  setTimeout(() => {
    ConsoleCharm.success('数据库连接成功');
    setTimeout(() => {
      ConsoleCharm.info('加载配置文件...');
      setTimeout(() => {
        ConsoleCharm.success('配置加载完成');
        setTimeout(() => {
          ConsoleCharm.success('🎉 所有服务已就绪');
        }, 200);
      }, 300);
    }, 400);
  }, 500);
}, 100);

console.log('\n✨ 示例演示完成！你可以查看上面的输出效果。');
console.log('💡 提示：在支持颜色的终端中效果更佳！'); 