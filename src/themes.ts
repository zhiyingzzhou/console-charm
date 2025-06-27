import { StyleConfig, PresetTheme } from './types';

/**
 * 预设主题配置
 * 包含标签和值的样式配置
 */
export const PRESET_THEMES: Record<PresetTheme, { label: StyleConfig; value: StyleConfig }> = {
  /**
   * 成功主题 - 绿色系
   */
  success: {
    label: {
      color: '#ffffff',
      backgroundColor: '#28a745',
      fontWeight: 'bold',
      padding: '2px 6px',
      borderRadius: '3px 0 0 3px'
    },
    value: {
      color: '#28a745',
      backgroundColor: '#d4edda',
      padding: '2px 6px',
      borderRadius: '0 3px 3px 0',
      fontWeight: 'bold'
    }
  },

  /**
   * 信息主题 - 蓝色系
   */
  info: {
    label: {
      color: '#ffffff',
      backgroundColor: '#007bff',
      fontWeight: 'bold',
      padding: '2px 6px',
      borderRadius: '3px 0 0 3px'
    },
    value: {
      color: '#007bff',
      backgroundColor: '#d1ecf1',
      padding: '2px 6px',
      borderRadius: '0 3px 3px 0',
      fontWeight: 'bold'
    }
  },

  /**
   * 警告主题 - 橙色系
   */
  warning: {
    label: {
      color: '#ffffff',
      backgroundColor: '#fd7e14',
      fontWeight: 'bold',
      padding: '2px 6px',
      borderRadius: '3px 0 0 3px'
    },
    value: {
      color: '#fd7e14',
      backgroundColor: '#fff3cd',
      padding: '2px 6px',
      borderRadius: '0 3px 3px 0',
      fontWeight: 'bold'
    }
  },

  /**
   * 错误主题 - 红色系
   */
  error: {
    label: {
      color: '#ffffff',
      backgroundColor: '#dc3545',
      fontWeight: 'bold',
      padding: '2px 6px',
      borderRadius: '3px 0 0 3px'
    },
    value: {
      color: '#dc3545',
      backgroundColor: '#f8d7da',
      padding: '2px 6px',
      borderRadius: '0 3px 3px 0',
      fontWeight: 'bold'
    }
  },

  /**
   * 主要主题 - 深蓝色系
   */
  primary: {
    label: {
      color: '#ffffff',
      backgroundColor: '#0d6efd',
      fontWeight: 'bold',
      padding: '2px 6px',
      borderRadius: '3px 0 0 3px'
    },
    value: {
      color: '#0d6efd',
      backgroundColor: '#cfe2ff',
      padding: '2px 6px',
      borderRadius: '0 3px 3px 0',
      fontWeight: 'bold'
    }
  },

  /**
   * 次要主题 - 灰色系
   */
  secondary: {
    label: {
      color: '#ffffff',
      backgroundColor: '#6c757d',
      fontWeight: 'bold',
      padding: '2px 6px',
      borderRadius: '3px 0 0 3px'
    },
    value: {
      color: '#6c757d',
      backgroundColor: '#e9ecef',
      padding: '2px 6px',
      borderRadius: '0 3px 3px 0',
      fontWeight: 'bold'
    }
  },

  /**
   * 深色主题 - 黑色系
   */
  dark: {
    label: {
      color: '#ffffff',
      backgroundColor: '#212529',
      fontWeight: 'bold',
      padding: '2px 6px',
      borderRadius: '3px 0 0 3px'
    },
    value: {
      color: '#212529',
      backgroundColor: '#f8f9fa',
      padding: '2px 6px',
      borderRadius: '0 3px 3px 0',
      fontWeight: 'bold'
    }
  },

  /**
   * 浅色主题 - 白色系
   */
  light: {
    label: {
      color: '#212529',
      backgroundColor: '#f8f9fa',
      fontWeight: 'bold',
      padding: '2px 6px',
      borderRadius: '3px 0 0 3px'
    },
    value: {
      color: '#495057',
      backgroundColor: '#ffffff',
      padding: '2px 6px',
      borderRadius: '0 3px 3px 0',
      fontWeight: 'bold'
    }
  }
};

/**
 * 获取预设主题配置
 * @param theme 主题名称
 * @returns 主题配置对象
 */
export function getPresetTheme(theme: PresetTheme): { label: StyleConfig; value: StyleConfig } {
  return PRESET_THEMES[theme];
}

/**
 * 特殊用途的预设配置
 */
export const SPECIAL_THEMES = {
  /**
   * 环境标识主题
   */
  environment: {
    development: getPresetTheme('warning'),
    test: getPresetTheme('success'),
    staging: getPresetTheme('info'),
    production: getPresetTheme('error')
  },

  /**
   * 版本标识主题
   */
  version: getPresetTheme('primary'),

  /**
   * 时间标识主题
   */
  buildDate: getPresetTheme('info'),

  /**
   * Git相关主题
   */
  git: {
    branch: getPresetTheme('secondary'),
    commit: getPresetTheme('dark')
  }
}; 