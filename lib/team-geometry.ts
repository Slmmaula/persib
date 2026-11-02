export const STAGE_HEIGHT = 850;
export const HEADROOM = 125;
export const HEADROOM_OVERLAP = 0.6;

const CYCLIC_MIN = 7;

export interface Slot {
  w: number;
  h: number;
  dx: number;
  top: number;
  opacity: number;
}

const focus: Slot = { w: 436, h: 605, dx: 0, top: 125, opacity: 1 };
const near = { w: 321, h: 485, top: 225, opacity: 0.9 };
const far = { w: 254, h: 380, top: 290, opacity: 0.7 };

export function getSlot(offset: number): Slot {
  const distance = Math.abs(offset);
  if (distance === 0) return focus;
  if (distance === 1) {
    return { ...near, dx: offset < 0 ? -438.5 : 532.5 };
  }
  if (distance === 2) {
    return { ...far, dx: offset < 0 ? -786 : 881 };
  }
  return { ...far, dx: offset < 0 ? -1150 : 1180, opacity: 0 };
}

export function getScale(width: number): number {
  const t = Math.min(1, Math.max(0, (width - 360) / 920));
  return Math.min(1.5, Math.max(width / 1920, 0.55 + 0.14 * t));
}

export function isCyclic(count: number): boolean {
  return count >= CYCLIC_MIN;
}

export function getOffset(
  index: number,
  active: number,
  count: number,
): number {
  if (isCyclic(count)) {
    const half = Math.floor(count / 2);
    return ((((index - active + half) % count) + count) % count) - half;
  }
  return index - active;
}
