import { ConsoleCharm } from '../src/ConsoleCharm';
import { badge, success, info, warning, error } from '../src/index';

// 获取全局的 consoleLogSpy
const getConsoleLogSpy = () => (global as any).consoleLogSpy as jest.Mock;

describe('ConsoleCharm', () => {
  let charm: ConsoleCharm;

  beforeEach(() => {
    charm = new ConsoleCharm();
  });

  describe('基本功能', () => {
    test('应该能创建实例', () => {
      expect(charm).toBeInstanceOf(ConsoleCharm);
    });

    test('success方法应该输出成功消息', () => {
      charm.success('测试成功');
      const spy = getConsoleLogSpy();
      expect(spy).toHaveBeenCalled();
      const callArgs = spy.mock.calls[0];
      expect(callArgs[0]).toContain('SUCCESS');
      expect(callArgs[0]).toContain('测试成功');
    });

    test('info方法应该输出信息消息', () => {
      charm.info('测试信息');
      const spy = getConsoleLogSpy();
      expect(spy).toHaveBeenCalled();
      const callArgs = spy.mock.calls[0];
      expect(callArgs[0]).toContain('INFO');
      expect(callArgs[0]).toContain('测试信息');
    });

    test('warning方法应该输出警告消息', () => {
      charm.warning('测试警告');
      const spy = getConsoleLogSpy();
      expect(spy).toHaveBeenCalled();
      const callArgs = spy.mock.calls[0];
      expect(callArgs[0]).toContain('WARNING');
      expect(callArgs[0]).toContain('测试警告');
    });

    test('error方法应该输出错误消息', () => {
      charm.error('测试错误');
      const spy = getConsoleLogSpy();
      expect(spy).toHaveBeenCalled();
      const callArgs = spy.mock.calls[0];
      expect(callArgs[0]).toContain('ERROR');
      expect(callArgs[0]).toContain('测试错误');
    });
  });

  describe('主题功能', () => {
    test('badgeWithTheme应该使用指定主题', () => {
      charm.badgeWithTheme('标签', '值', 'primary');
      const spy = getConsoleLogSpy();
      expect(spy).toHaveBeenCalled();
      const callArgs = spy.mock.calls[0];
      expect(callArgs[0]).toContain('标签');
      expect(callArgs[0]).toContain('值');
    });

    test('应该支持所有预设主题', () => {
      const themes = ['success', 'info', 'warning', 'error', 'primary', 'secondary', 'dark', 'light'] as const;
      
      themes.forEach(theme => {
        charm.badgeWithTheme('测试', theme, theme);
        const spy = getConsoleLogSpy();
        expect(spy).toHaveBeenCalled();
      });
    });
  });

  describe('构建信息功能', () => {
    test('version应该输出版本信息', () => {
      charm.version('1.0.0');
      const spy = getConsoleLogSpy();
      expect(spy).toHaveBeenCalled();
      const callArgs = spy.mock.calls[0];
      expect(callArgs[0]).toContain('Version');
      expect(callArgs[0]).toContain('1.0.0');
    });

    test('environment应该输出环境信息', () => {
      charm.environment('production');
      const spy = getConsoleLogSpy();
      expect(spy).toHaveBeenCalled();
      const callArgs = spy.mock.calls[0];
      expect(callArgs[0]).toContain('Environment');
      expect(callArgs[0]).toContain('production');
    });

    test('buildDate应该输出构建日期', () => {
      const date = new Date('2023-01-01');
      charm.buildDate(date);
      const spy = getConsoleLogSpy();
      expect(spy).toHaveBeenCalled();
      const callArgs = spy.mock.calls[0];
      expect(callArgs[0]).toContain('Build Date');
    });

    test('branch应该输出分支信息', () => {
      charm.branch('main');
      const spy = getConsoleLogSpy();
      expect(spy).toHaveBeenCalled();
      const callArgs = spy.mock.calls[0];
      expect(callArgs[0]).toContain('Branch');
      expect(callArgs[0]).toContain('main');
    });

    test('commit应该输出提交信息并截取哈希', () => {
      charm.commit('a1b2c3d4e5f67890');
      const spy = getConsoleLogSpy();
      expect(spy).toHaveBeenCalled();
      const callArgs = spy.mock.calls[0];
      expect(callArgs[0]).toContain('Commit');
      expect(callArgs[0]).toContain('a1b2c3d4');
    });

    test('buildInfo应该输出完整构建信息', () => {
      charm.buildInfo({
        version: '1.0.0',
        environment: 'test',
        buildDate: new Date(),
        branch: 'main',
        commit: 'abc123'
      });

      const spy = getConsoleLogSpy();
      expect(spy).toHaveBeenCalledTimes(5); // 5个信息项
    });
  });

  describe('自定义徽章功能', () => {
    test('badge应该支持自定义样式', () => {
      charm.badge({
        label: '自定义',
        value: '测试',
        labelStyle: {
          color: '#ffffff',
          backgroundColor: '#007bff'
        },
        valueStyle: {
          color: '#007bff',
          backgroundColor: '#e3f2fd'
        }
      });

      const spy = getConsoleLogSpy();
      expect(spy).toHaveBeenCalled();
      const callArgs = spy.mock.calls[0];
      expect(callArgs[0]).toContain('自定义');
      expect(callArgs[0]).toContain('测试');
    });
  });

  describe('配置功能', () => {
    test('应该支持禁用输出', () => {
      const disabledCharm = new ConsoleCharm({ disabled: true });
      disabledCharm.success('应该被禁用');
      const spy = getConsoleLogSpy();
      expect(spy).not.toHaveBeenCalled();
    });

    test('应该支持显示时间戳', () => {
      const timestampCharm = new ConsoleCharm({ showTimestamp: true });
      timestampCharm.success('带时间戳');
      const spy = getConsoleLogSpy();
      expect(spy).toHaveBeenCalled();
      const callArgs = spy.mock.calls[0];
      expect(callArgs[0]).toMatch(/\[\d{2}:\d{2}:\d{2}\]/); // 匹配时间戳格式
    });

    test('应该支持自定义前缀', () => {
      const prefixCharm = new ConsoleCharm({ prefix: '🚀 TEST' });
      prefixCharm.success('带前缀');
      const spy = getConsoleLogSpy();
      expect(spy).toHaveBeenCalled();
      const callArgs = spy.mock.calls[0];
      expect(callArgs[0]).toContain('🚀 TEST');
    });

    test('updateConfig应该更新配置', () => {
      charm.updateConfig({ prefix: '新前缀' });
      const config = charm.getConfig();
      expect(config.prefix).toBe('新前缀');
    });

    test('getConfig应该返回当前配置', () => {
      const config = charm.getConfig();
      expect(typeof config).toBe('object');
    });
  });
});

describe('静态方法', () => {
  test('success静态方法应该正常工作', () => {
    success('静态成功');
    const spy = getConsoleLogSpy();
    expect(spy).toHaveBeenCalled();
  });

  test('info静态方法应该正常工作', () => {
    info('静态信息');
    const spy = getConsoleLogSpy();
    expect(spy).toHaveBeenCalled();
  });

  test('warning静态方法应该正常工作', () => {
    warning('静态警告');
    const spy = getConsoleLogSpy();
    expect(spy).toHaveBeenCalled();
  });

  test('error静态方法应该正常工作', () => {
    error('静态错误');
    const spy = getConsoleLogSpy();
    expect(spy).toHaveBeenCalled();
  });

  test('badge静态方法应该正常工作', () => {
    badge({
      label: '静态',
      value: '徽章'
    });
    const spy = getConsoleLogSpy();
    expect(spy).toHaveBeenCalled();
  });
}); 