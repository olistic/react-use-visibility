import checkVisibility from './checkVisibility';

describe('checkVisibility', () => {
  let el;

  beforeEach(() => {
    window.innerWidth = 1024;
    window.innerHeight = 768;
  });

  afterEach(() => {
    window.innerWidth = null;
    window.innerHeight = null;
  });

  describe('with no element', () => {
    beforeEach(() => {
      el = null;
    });

    test('is not visible', () => {
      expect(checkVisibility(el, false)).toBe(false);
    });

    test('is not partially visible', () => {
      expect(checkVisibility(el, true)).toBe(false);
    });
  });

  describe('when element has no size', () => {
    beforeEach(() => {
      el = {
        getBoundingClientRect: () => ({
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          width: 0,
          height: 0,
        }),
      };
    });

    test('is not visible', () => {
      expect(checkVisibility(el, false)).toBe(false);
    });

    test('is not partially visible', () => {
      expect(checkVisibility(el, true)).toBe(false);
    });
  });

  describe('when element is on the screen', () => {
    beforeEach(() => {
      el = {
        getBoundingClientRect: () => ({
          top: 0,
          right: 100,
          bottom: 100,
          left: 0,
          width: 100,
          height: 100,
        }),
      };
    });

    test('is visible', () => {
      expect(checkVisibility(el, false)).toBe(true);
    });

    test('is partially visible', () => {
      expect(checkVisibility(el, true)).toBe(true);
    });
  });

  describe('when element is not fully on the screen', () => {
    describe('appearing from the top', () => {
      beforeEach(() => {
        el = {
          getBoundingClientRect: () => ({
            top: -50,
            right: 100,
            bottom: 50,
            left: 0,
            width: 100,
            height: 100,
          }),
        };
      });

      test('is not visible', () => {
        expect(checkVisibility(el, false)).toBe(false);
      });

      test('is partially visible', () => {
        expect(checkVisibility(el, true)).toBe(true);
      });
    });

    describe('appearing from the right', () => {
      beforeEach(() => {
        el = {
          getBoundingClientRect: () => ({
            top: 0,
            right: 1074,
            bottom: 100,
            left: 974,
            width: 100,
            height: 100,
          }),
        };
      });

      test('is not visible', () => {
        expect(checkVisibility(el, false)).toBe(false);
      });

      test('is partially visible', () => {
        expect(checkVisibility(el, true)).toBe(true);
      });
    });

    describe('appearing from the bottom', () => {
      beforeEach(() => {
        el = {
          getBoundingClientRect: () => ({
            top: 758,
            right: 100,
            bottom: 858,
            left: 0,
            width: 100,
            height: 100,
          }),
        };
      });

      test('is not visible', () => {
        expect(checkVisibility(el, false)).toBe(false);
      });

      test('is partially visible', () => {
        expect(checkVisibility(el, true)).toBe(true);
      });
    });

    describe('appearing from the left', () => {
      beforeEach(() => {
        el = {
          getBoundingClientRect: () => ({
            top: 0,
            right: 50,
            bottom: 100,
            left: -50,
            width: 100,
            height: 100,
          }),
        };
      });

      test('is not visible', () => {
        expect(checkVisibility(el, false)).toBe(false);
      });

      test('is partially visible', () => {
        expect(checkVisibility(el, true)).toBe(true);
      });
    });
  });
});
