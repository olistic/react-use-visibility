import React, { useRef } from 'react';
import { render } from '@testing-library/react';

import checkVisibility from './checkVisibility';
import useVisibility from '.';

jest.mock('./checkVisibility');
const addEventListenerSpy = jest.spyOn(window, 'addEventListener');

const Foo = ({ partial, scrollableEl }) => {
  const elRef = useRef(null);
  const isVisible = useVisibility(elRef.current, { partial, scrollableEl });
  return <div ref={elRef}>{isVisible ? 'visible' : 'not visible'}</div>;
};

describe('useVisibility', () => {
  test('is initially not visible', () => {
    const { container } = render(<Foo />);
    const el = container.firstChild;
    expect(el).toHaveTextContent('not visible');
  });

  test('attaches scroll and resize event listeners to window', () => {
    const { rerender } = render(<Foo />);
    // Force useEffect to run.
    rerender(<Foo />);
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
    );
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'resize',
      expect.any(Function),
    );
  });

  test('updates visibility after component is rendered', () => {
    const { container, rerender } = render(<Foo />);
    const el = container.firstChild;
    expect(el).toHaveTextContent('not visible');
    checkVisibility.mockReturnValue(true);
    // Force useEffect to run.
    rerender(<Foo />);
    expect(el).toHaveTextContent('visible');
    expect(checkVisibility).toHaveBeenCalledWith(el, false);
  });

  test.skip('updates visibility on window scroll', () => {});

  test.skip('updates visibility on window resize', () => {});

  describe('with partial option', () => {
    test('checks partial visibility', () => {
      const { container, rerender } = render(<Foo partial />);
      const el = container.firstChild;
      // Force useEffect to run.
      rerender(<Foo partial />);
      expect(checkVisibility).toHaveBeenCalledWith(el, true);
    });
  });

  describe('with scrollableEl option', () => {
    test('attaches scroll event listener to passed in scrollable element', () => {
      const scrollableEl = {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      };
      const { rerender } = render(<Foo scrollableEl={scrollableEl} />);
      // Force useEffect to run.
      rerender(<Foo />);
      expect(scrollableEl.addEventListener).toHaveBeenCalledWith(
        'scroll',
        expect.any(Function),
      );
    });
  });
});
