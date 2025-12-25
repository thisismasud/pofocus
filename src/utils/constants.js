export const TIMER_MODES = {
  FOCUS: 'focus',
  SHORT_BREAK: 'shortBreak',
  LONG_BREAK: 'longBreak',
};

export const DEFAULT_DURATIONS = {
  [TIMER_MODES.FOCUS]: 25 * 60,
  [TIMER_MODES.SHORT_BREAK]: 5 * 60,
  [TIMER_MODES.LONG_BREAK]: 15 * 60,
};

export const SOUNDS = {
  COMPLETE: '/sounds/complete.mp3',
  CLICK: '/sounds/click.mp3', // Placeholder
};
