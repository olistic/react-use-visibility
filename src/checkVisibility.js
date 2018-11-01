/**
 * Checks if the given element is on the screen.
 *
 * @param {Element} el The element.
 * @param {boolean} partial Whether to consider the element visible when only a
 *   part of it is on the screen.
 *
 * @returns {boolean} Whether the element is visible.
 */
function checkVisibility(el, partial) {
  if (!el) {
    return false;
  }

  const {
    top,
    right,
    bottom,
    left,
    width,
    height,
  } = el.getBoundingClientRect();

  if (top + right + bottom + left === 0) {
    return false;
  }

  const topCheck = partial ? top + height : top;
  const bottomCheck = partial ? bottom - height : bottom;
  const rightCheck = partial ? right - width : right;
  const leftCheck = partial ? left + width : left;

  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  return (
    topCheck >= 0 &&
    leftCheck >= 0 &&
    bottomCheck <= windowHeight &&
    rightCheck <= windowWidth
  );
}

export default checkVisibility;
