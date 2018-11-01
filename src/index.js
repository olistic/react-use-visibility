import throttle from 'lodash.throttle';
import { useEffect, useState } from 'react';

import checkVisibility from './checkVisibility';

const throttleInterval = 150;

function useVisibility(el, { partial = false } = {}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(
    () => {
      const handleScrollOrResize = throttle(
        () => setIsVisible(checkVisibility(el, partial)),
        throttleInterval,
      );

      window.addEventListener('scroll', handleScrollOrResize);
      window.addEventListener('resize', handleScrollOrResize);

      setIsVisible(checkVisibility(el, partial));

      return () => {
        window.removeEventListener('scroll', handleScrollOrResize);
        window.removeEventListener('resize', handleScrollOrResize);
      };
    },
    [el],
  );

  return isVisible;
}

export default useVisibility;
