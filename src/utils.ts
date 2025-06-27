import { StyleConfig, ConsoleConfig } from './types';

// 类型声明，避免在非Node.js环境中的类型错误
declare global {
  interface Window {
    process?: NodeJS.Process;
  }
  interface Navigator {
    userAgent: string;
  }
}

/**
 * 将样式配置转换为CSS字符串
 * @param style 样式配置对象
 * @returns CSS样式字符串
 */
export function styleToCSS(style: StyleConfig): string {
  const cssProps: string[] = [];

  if (style.color) {
    cssProps.push(`color: ${style.color}`);
  }

  if (style.backgroundColor) {
    cssProps.push(`background-color: ${style.backgroundColor}`);
  }

  if (style.fontWeight) {
    cssProps.push(`font-weight: ${style.fontWeight}`);
  }

  if (style.fontSize) {
    cssProps.push(`font-size: ${style.fontSize}`);
  }

  if (style.padding) {
    cssProps.push(`padding: ${style.padding}`);
  }

  if (style.borderRadius) {
    cssProps.push(`border-radius: ${style.borderRadius}`);
  }

  return cssProps.join('; ');
}

/**
 * 检查是否支持控制台样式
 * @returns 是否支持样式
 */
export function supportsConsoleStyles(): boolean {
  if (typeof window !== 'undefined') {
    // 浏览器环境
    return true;
  }

  if (typeof process !== 'undefined' && process.env) {
    // Node.js环境，检查是否支持颜色
    return !!(process.env.FORCE_COLOR || process.stdout?.isTTY);
  }

  return false;
}

/**
 * 检查是否应该禁用输出
 * @param config 控制台配置
 * @returns 是否应该禁用
 */
export function shouldDisableOutput(config?: ConsoleConfig): boolean {
  if (config?.disabled) {
    return true;
  }

  if (config?.disableInProduction && isProduction()) {
    return true;
  }

  return false;
}

/**
 * 检查是否为生产环境
 * @returns 是否为生产环境
 */
export function isProduction(): boolean {
  if (typeof process !== 'undefined' && process.env) {
    return process.env.NODE_ENV === 'production';
  }
  return false;
}

/**
 * 格式化日期为字符串
 * @param date 日期对象或字符串
 * @returns 格式化后的日期字符串
 */
export function formatDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return String(date);
  }

  return dateObj.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
}

/**
 * 获取当前时间戳
 * @returns 时间戳字符串
 */
export function getCurrentTimestamp(): string {
  return new Date().toLocaleTimeString('zh-CN');
}

/**
 * 转义特殊字符
 * @param text 要转义的文本
 * @returns 转义后的文本
 */
export function escapeText(text: string): string {
  return text.replace(/[%]/g, '%%');
}

/**
 * 检测运行环境
 * @returns 环境信息
 */
export function detectEnvironment(): {
  isBrowser: boolean;
  isNode: boolean;
  supportsStyles: boolean;
  userAgent?: string;
  nodeVersion?: string;
} {
  const isBrowser = typeof window !== 'undefined';
  const isNode = typeof process !== 'undefined' && process.versions?.node;

  return {
    isBrowser,
    isNode: !!isNode,
    supportsStyles: supportsConsoleStyles(),
    userAgent: isBrowser ? navigator.userAgent : undefined,
    nodeVersion: isNode ? process.versions.node : undefined
  };
} 