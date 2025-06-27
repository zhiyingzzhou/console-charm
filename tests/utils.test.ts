import { styleToCSS, formatDate, escapeText } from '../src/utils';

describe('utils', () => {
  describe('styleToCSS', () => {
    test('应该正确转换样式对象为CSS字符串', () => {
      const style = {
        color: '#ffffff',
        backgroundColor: '#007bff',
        fontWeight: 'bold' as const,
        padding: '4px 8px',
        borderRadius: '4px'
      };

      const css = styleToCSS(style);
      
      expect(css).toContain('color: #ffffff');
      expect(css).toContain('background-color: #007bff');
      expect(css).toContain('font-weight: bold');
      expect(css).toContain('padding: 4px 8px');
      expect(css).toContain('border-radius: 4px');
    });

    test('应该处理空样式对象', () => {
      const css = styleToCSS({});
      expect(css).toBe('');
    });

    test('应该处理部分样式属性', () => {
      const style = {
        color: '#red',
        fontWeight: 'normal' as const
      };

      const css = styleToCSS(style);
      expect(css).toContain('color: #red');
      expect(css).toContain('font-weight: normal');
      expect(css).not.toContain('background-color');
    });
  });

  describe('formatDate', () => {
    test('应该正确格式化Date对象', () => {
      const date = new Date('2023-01-01T12:00:00Z');
      const formatted = formatDate(date);
      expect(typeof formatted).toBe('string');
      expect(formatted).toMatch(/\d{4}\/\d{2}\/\d{2}/); // 匹配日期格式
    });

    test('应该正确格式化日期字符串', () => {
      const dateString = '2023-01-01';
      const formatted = formatDate(dateString);
      expect(typeof formatted).toBe('string');
    });

    test('应该处理无效日期', () => {
      const invalidDate = 'invalid-date';
      const formatted = formatDate(invalidDate);
      expect(formatted).toBe(invalidDate);
    });
  });

  describe('escapeText', () => {
    test('应该转义百分号', () => {
      const text = 'Progress: 50%';
      const escaped = escapeText(text);
      expect(escaped).toBe('Progress: 50%%');
    });

    test('应该处理多个百分号', () => {
      const text = '100% complete 90%';
      const escaped = escapeText(text);
      expect(escaped).toBe('100%% complete 90%%');
    });

    test('应该处理没有百分号的文本', () => {
      const text = 'No percent signs here';
      const escaped = escapeText(text);
      expect(escaped).toBe(text);
    });
  });
}); 