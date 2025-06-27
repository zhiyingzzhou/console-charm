/**
 * 样式配置接口
 */
export interface StyleConfig {
  /** 文本颜色 */
  color?: string;
  /** 背景颜色 */
  backgroundColor?: string;
  /** 是否加粗 */
  fontWeight?: 'normal' | 'bold';
  /** 字体大小 */
  fontSize?: string;
  /** 内边距 */
  padding?: string;
  /** 边框半径 */
  borderRadius?: string;
}

/**
 * 徽章配置接口
 */
export interface BadgeConfig {
  /** 标签文本 */
  label: string;
  /** 值文本 */
  value: string;
  /** 标签样式 */
  labelStyle?: StyleConfig;
  /** 值样式 */
  valueStyle?: StyleConfig;
}

/**
 * 预设主题类型
 */
export type PresetTheme = 
  | 'success'     // 成功 - 绿色
  | 'info'        // 信息 - 蓝色
  | 'warning'     // 警告 - 橙色
  | 'error'       // 错误 - 红色
  | 'primary'     // 主色 - 深蓝
  | 'secondary'   // 次要 - 灰色
  | 'dark'        // 深色 - 黑色
  | 'light';      // 浅色 - 白色

/**
 * 构建信息接口
 */
export interface BuildInfo {
  /** 版本号 */
  version?: string;
  /** 构建环境 */
  environment?: string;
  /** 构建时间 */
  buildDate?: string | Date;
  /** 构建哈希 */
  buildHash?: string;
  /** 分支名称 */
  branch?: string;
  /** 提交信息 */
  commit?: string;
}

/**
 * 控制台输出配置
 */
export interface ConsoleConfig {
  /** 是否禁用样式输出 */
  disabled?: boolean;
  /** 是否显示时间戳 */
  showTimestamp?: boolean;
  /** 自定义前缀 */
  prefix?: string;
  /** 是否在生产环境禁用 */
  disableInProduction?: boolean;
} 