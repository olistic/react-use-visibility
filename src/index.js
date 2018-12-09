import throttle from 'lodash.throttle';
import { useEffect, useState } from 'react';

import checkVisibility from './checkVisibility';

const throttleInterval = 150;

const useVisibility = (el, { partial = false, scrollableEl = window } = {}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(
    () => {
      const handleScrollOrResize = throttle(
        () => setIsVisible(checkVisibility(el, partial)),
        throttleInterval,
      );

      scrollableEl.addEventListener('scroll', handleScrollOrResize);
      window.addEventListener('resize', handleScrollOrResize);

      setIsVisible(checkVisibility(el, partial));

      return () => {
        scrollableEl.removeEventListener('scroll', handleScrollOrResize);
        window.removeEventListener('resize', handleScrollOrResize);
      };
    },
    [el, partial, scrollableEl],
  );

  return isVisible;
};

export default useVisibility;
