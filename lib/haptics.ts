import "ios-vibrator-pro-max";

function vibrate(pattern: number | number[]) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }
  navigator.vibrate?.(pattern);
}

// Short tap for taps
export function tap() {
  vibrate(8);
}

// Three pulses
export function error() {
  vibrate([40, 40, 40, 40, 40]);
}

// Single solid thud
export function impact() {
  vibrate(35);
}

// Escalating burst for the stress relief explode
export function burst() {
  vibrate([12, 20, 25, 20, 45]);
}

// Stuttering rumble for the stress relief shake
export function rumble() {
  vibrate([15, 25, 15, 25, 15, 25, 15]);
}
