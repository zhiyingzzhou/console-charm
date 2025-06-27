import { BadgeConfig, StyleConfig, PresetTheme, BuildInfo, ConsoleConfig } from './types';
import { getPresetTheme, SPECIAL_THEMES } from './themes';
import { 
  styleToCSS, 
  shouldDisableOutput, 
  formatDate, 
  getCurrentTimestamp, 
  escapeText,
  supportsConsoleStyles 
} from './utils';

/**
 * ConsoleCharm - 控制台样式输出类
 * 用于在控制台输出带有样式的徽章式信息
 */
export class ConsoleCharm {
  private config: ConsoleConfig;

  /**
   * 构造函数
   * @param config 控制台配置
   */
  constructor(config: ConsoleConfig = {}) {
    this.config = config;
  }

  /**
   * 输出自定义徽章
   * @param badgeConfig 徽章配置
   */
  public badge(badgeConfig: BadgeConfig): void {
    if (shouldDisableOutput(this.config)) {
      return;
    }

    const { label, value, labelStyle = {}, valueStyle = {} } = badgeConfig;
    
    this.outputStyledBadge(label, value, labelStyle, valueStyle);
  }

  /**
   * 使用预设主题输出徽章
   * @param label 标签文本
   * @param value 值文本
   * @param theme 预设主题
   */
  public badgeWithTheme(label: string, value: string, theme: PresetTheme): void {
    if (shouldDisableOutput(this.config)) {
      return;
    }

    const themeConfig = getPresetTheme(theme);
    this.outputStyledBadge(label, value, themeConfig.label, themeConfig.value);
  }

  /**
   * 输出环境信息
   * @param environment 环境名称
   */
  public environment(environment: string): void {
    const envTheme = SPECIAL_THEMES.environment[environment as keyof typeof SPECIAL_THEMES.environment] 
      || SPECIAL_THEMES.environment.development;
    
    this.outputStyledBadge('Environment', environment, envTheme.label, envTheme.value);
  }

  /**
   * 输出版本信息
   * @param version 版本号
   */
  public version(version: string): void {
    const themeConfig = SPECIAL_THEMES.version;
    this.outputStyledBadge('Version', version, themeConfig.label, themeConfig.value);
  }

  /**
   * 输出构建日期
   * @param buildDate 构建日期
   */
  public buildDate(buildDate: string | Date): void {
    const formattedDate = formatDate(buildDate);
    const themeConfig = SPECIAL_THEMES.buildDate;
    this.outputStyledBadge('Build Date', formattedDate, themeConfig.label, themeConfig.value);
  }

  /**
   * 输出Git分支信息
   * @param branch 分支名称
   */
  public branch(branch: string): void {
    const themeConfig = SPECIAL_THEMES.git.branch;
    this.outputStyledBadge('Branch', branch, themeConfig.label, themeConfig.value);
  }

  /**
   * 输出Git提交信息
   * @param commit 提交哈希
   */
  public commit(commit: string): void {
    const themeConfig = SPECIAL_THEMES.git.commit;
    // 截取前8位哈希
    const shortCommit = commit.length > 8 ? commit.substring(0, 8) : commit;
    this.outputStyledBadge('Commit', shortCommit, themeConfig.label, themeConfig.value);
  }

  /**
   * 批量输出构建信息
   * @param buildInfo 构建信息对象
   */
  public buildInfo(buildInfo: BuildInfo): void {
    if (shouldDisableOutput(this.config)) {
      return;
    }

    const { version, environment, buildDate, buildHash, branch, commit } = buildInfo;

    if (version) {
      this.version(version);
    }

    if (environment) {
      this.environment(environment);
    }

    if (buildDate) {
      this.buildDate(buildDate);
    }

    if (buildHash) {
      this.commit(buildHash);
    }

    if (branch) {
      this.branch(branch);
    }

    if (commit && !buildHash) {
      this.commit(commit);
    }
  }

  /**
   * 输出成功信息
   * @param message 消息内容
   */
  public success(message: string): void {
    this.badgeWithTheme('SUCCESS', message, 'success');
  }

  /**
   * 输出信息
   * @param message 消息内容
   */
  public info(message: string): void {
    this.badgeWithTheme('INFO', message, 'info');
  }

  /**
   * 输出警告信息
   * @param message 消息内容
   */
  public warning(message: string): void {
    this.badgeWithTheme('WARNING', message, 'warning');
  }

  /**
   * 输出错误信息
   * @param message 消息内容
   */
  public error(message: string): void {
    this.badgeWithTheme('ERROR', message, 'error');
  }

  /**
   * 输出带样式的徽章（核心方法）
   * @param label 标签文本
   * @param value 值文本
   * @param labelStyle 标签样式
   * @param valueStyle 值样式
   */
  private outputStyledBadge(
    label: string, 
    value: string, 
    labelStyle: StyleConfig, 
    valueStyle: StyleConfig
  ): void {
    const timestamp = this.config.showTimestamp ? `[${getCurrentTimestamp()}] ` : '';
    const prefix = this.config.prefix ? `${this.config.prefix} ` : '';

    if (supportsConsoleStyles()) {
      // 支持样式的环境
      const labelCSS = styleToCSS(labelStyle);
      const valueCSS = styleToCSS(valueStyle);
      const resetCSS = 'color: inherit; background-color: inherit; font-weight: inherit; padding: inherit; border-radius: inherit;';

      console.log(
        `${timestamp}${prefix}%c${escapeText(label)}%c${escapeText(value)}%c`,
        labelCSS,
        valueCSS,
        resetCSS
      );
    } else {
      // 不支持样式的环境，输出纯文本
      console.log(`${timestamp}${prefix}${label}: ${value}`);
    }
  }

  /**
   * 更新配置
   * @param config 新的配置
   */
  public updateConfig(config: Partial<ConsoleConfig>): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * 获取当前配置
   * @returns 当前配置
   */
  public getConfig(): ConsoleConfig {
    return { ...this.config };
  }
} 