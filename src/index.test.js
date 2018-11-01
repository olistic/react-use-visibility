import React, { useRef } from 'react';
import { render } from 'react-testing-library';

import checkVisibility from './checkVisibility';
import useVisibility from '.';

jest.mock('./checkVisibility');
const addEventListenerSpy = jest.spyOn(window, 'addEventListener');

const Foo = ({ partial }) => {
  const elRef = useRef(null);
  const isVisible = useVisibility(elRef.current, { partial });
  return <div ref={elRef}>{isVisible ? 'visible' : 'not visible'}</div>;
};

describe('useVisibility', () => {
  test('is initially not visible', () => {
    const { container } = render(<Foo />);
    const el = container.firstChild;
    expect(el).toHaveTextContent('not visible');
    expect(checkVisibility).not.toHaveBeenCalled();
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

  test('checks visibility using partial option', () => {
    const { container, rerender } = render(<Foo partial />);
    const el = container.firstChild;
    // Force useEffect to run.
    rerender(<Foo partial />);
    expect(checkVisibility).toHaveBeenCalledWith(el, true);
  });
});
