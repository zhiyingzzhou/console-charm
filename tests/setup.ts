/**
 * Jest 测试设置文件
 */

// 扩展全局类型定义
declare global {
  var consoleLogSpy: jest.Mock;
}

// 模拟 console.log 以便测试
const originalConsoleLog = console.log;
const consoleLogSpy = jest.fn();

beforeEach(() => {
  // 重置 console.log spy
  consoleLogSpy.mockClear();
  console.log = consoleLogSpy;
});

afterEach(() => {
  // 恢复原始的 console.log
  console.log = originalConsoleLog;
});

// 导出给测试文件使用
global.consoleLogSpy = consoleLogSpy;

export {}; 