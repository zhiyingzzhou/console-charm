import { ConsoleCharm } from './ConsoleCharm';
import { BadgeConfig, StyleConfig, PresetTheme, BuildInfo, ConsoleConfig } from './types';
import { getPresetTheme, PRESET_THEMES, SPECIAL_THEMES } from './themes';
import { detectEnvironment } from './utils';

// 导出所有类型
export type {
  BadgeConfig,
  StyleConfig,
  PresetTheme,
  BuildInfo,
  ConsoleConfig
};

// 导出主类
export { ConsoleCharm };

// 导出主题相关
export { getPresetTheme, PRESET_THEMES, SPECIAL_THEMES };

// 导出工具函数
export { detectEnvironment };

/**
 * 默认实例
 */
const defaultCharm = new ConsoleCharm();

/**
 * 便捷的静态方法 - 输出自定义徽章
 * @param badgeConfig 徽章配置
 */
export function badge(badgeConfig: BadgeConfig): void {
  defaultCharm.badge(badgeConfig);
}

/**
 * 便捷的静态方法 - 使用预设主题输出徽章
 * @param label 标签文本
 * @param value 值文本
 * @param theme 预设主题
 */
export function badgeWithTheme(label: string, value: string, theme: PresetTheme): void {
  defaultCharm.badgeWithTheme(label, value, theme);
}

/**
 * 便捷的静态方法 - 输出环境信息
 * @param environment 环境名称
 */
export function environment(environment: string): void {
  defaultCharm.environment(environment);
}

/**
 * 便捷的静态方法 - 输出版本信息
 * @param version 版本号
 */
export function version(version: string): void {
  defaultCharm.version(version);
}

/**
 * 便捷的静态方法 - 输出构建日期
 * @param buildDate 构建日期
 */
export function buildDate(buildDate: string | Date): void {
  defaultCharm.buildDate(buildDate);
}

/**
 * 便捷的静态方法 - 输出Git分支信息
 * @param branch 分支名称
 */
export function branch(branch: string): void {
  defaultCharm.branch(branch);
}

/**
 * 便捷的静态方法 - 输出Git提交信息
 * @param commit 提交哈希
 */
export function commit(commit: string): void {
  defaultCharm.commit(commit);
}

/**
 * 便捷的静态方法 - 批量输出构建信息
 * @param buildInfo 构建信息对象
 */
export function buildInfo(buildInfo: BuildInfo): void {
  defaultCharm.buildInfo(buildInfo);
}

/**
 * 便捷的静态方法 - 输出成功信息
 * @param message 消息内容
 */
export function success(message: string): void {
  defaultCharm.success(message);
}

/**
 * 便捷的静态方法 - 输出信息
 * @param message 消息内容
 */
export function info(message: string): void {
  defaultCharm.info(message);
}

/**
 * 便捷的静态方法 - 输出警告信息
 * @param message 消息内容
 */
export function warning(message: string): void {
  defaultCharm.warning(message);
}

/**
 * 便捷的静态方法 - 输出错误信息
 * @param message 消息内容
 */
export function error(message: string): void {
  defaultCharm.error(message);
}

/**
 * 创建新的ConsoleCharm实例
 * @param config 控制台配置
 * @returns ConsoleCharm实例
 */
export function createConsoleCharm(config?: ConsoleConfig): ConsoleCharm {
  return new ConsoleCharm(config);
}

/**
 * 更新默认实例的配置
 * @param config 新的配置
 */
export function updateDefaultConfig(config: Partial<ConsoleConfig>): void {
  defaultCharm.updateConfig(config);
}

/**
 * 获取默认实例的配置
 * @returns 当前配置
 */
export function getDefaultConfig(): ConsoleConfig {
  return defaultCharm.getConfig();
}

// 默认导出
export default {
  ConsoleCharm,
  badge,
  badgeWithTheme,
  environment,
  version,
  buildDate,
  branch,
  commit,
  buildInfo,
  success,
  info,
  warning,
  error,
  createConsoleCharm,
  updateDefaultConfig,
  getDefaultConfig,
  getPresetTheme,
  PRESET_THEMES,
  SPECIAL_THEMES,
  detectEnvironment
}; 