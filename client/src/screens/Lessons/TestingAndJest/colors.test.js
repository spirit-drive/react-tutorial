import { hex2rgb, toHex } from './colors';

describe('colors', () => {
  describe('toHex', () => {
    it('white', () => {
      expect(toHex(255, 255, 255)).toBe('#ffffff');
    });

    it('black', () => {
      expect(toHex(0, 0, 0)).toBe('#000000');
    });

    it('red', () => {
      expect(toHex(255, 0, 0)).toBe('#ff0000');
    });

    it('green', () => {
      expect(toHex(0, 255, 0)).toBe('#00ff00');
    });

    it('blue', () => {
      expect(toHex(0, 0, 255)).toBe('#0000ff');
    });

    it('complex', () => {
      expect(toHex(171, 205, 239)).toBe('#abcdef');
    });
  });

  describe('hex2rgb', () => {
    it('white', () => {
      expect(hex2rgb('#ffFFff')).toEqual([255, 255, 255]);
    });

    it('black', () => {
      expect(hex2rgb('#000000')).toEqual([0, 0, 0]);
    });

    it('red', () => {
      expect(hex2rgb('#ff0000')).toEqual([255, 0, 0]);
    });

    it('green', () => {
      expect(hex2rgb('#00ff00')).toEqual([0, 255, 0]);
    });

    it('blue', () => {
      expect(hex2rgb('#0000ff')).toEqual([0, 0, 255]);
    });

    it('complex', () => {
      expect(hex2rgb('#aBcDeF')).toEqual([171, 205, 239]);
    });

    it('check out validation', () => {
      expect(() => hex2rgb('#ffFFfff')).toThrow('invalid hex color: #ffFFff');
      expect(() => hex2rgb('ffFFff')).toThrow('invalid hex color: ffFFff');
      expect(() => hex2rgb('#jfFFff')).toThrow('invalid hex color: #jfFFff');
    });
  });
});
