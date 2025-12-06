export interface ColorResult {
  hex: string;
}

export interface HSL {
  h: number;
  s: number;
  l: number;
}

// export function hexToHSL(hex: string): HSL {
//   hex = hex.replace("#", "");

//   let r = parseInt(hex.substring(0, 2), 16) / 255;
//   let g = parseInt(hex.substring(2, 4), 16) / 255;
//   let b = parseInt(hex.substring(4, 6), 16) / 255;

//   let max = Math.max(r, g, b), min = Math.min(r, g, b);
//   let h, s, l = (max + min) / 2;

//   if (max === min) {
//     h = 0;
//     s = 0;
//   } else {
//     const d = max - min;
//     s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

//     if (max === r) h = ((g - b) / d) % 6;
//     else if (max === g) h = (b - r) / d + 2;
//     else h = (r - g) / d + 4;

//     h = h * 60;              
//     if (h < 0) h += 360;    
//   }

//   return { 
//     h: Math.round(h), 
//     s: Math.round(s * 100), 
//     l: Math.round(l * 100) 
//   };
// }

export function hexToHSL(hex: string): HSL {
  hex = hex.replace("#", "");

  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (delta !== 0) {
    if (max === r) h = ((g - b) / delta) % 6;
    else if (max === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;

    h = (h * 60 + 360) % 360;
    s = delta / (1 - Math.abs(2 * l - 1));
  }

  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

// export function hslToHex(h: number, s: number, l: number): string {
//   s /= 100;
//   l /= 100;

//   let c = (1 - Math.abs(2 * l - 1)) * s;
//   let x = c * (1 - Math.abs(((h / 60) % 2) - 1));
//   let m = l - c / 2;

//   let r: number, g: number, b: number;

//   if (h < 60) { r = c; g = x; b = 0; }
//   else if (h < 120) { r = x; g = c; b = 0; }
//   else if (h < 180) { r = 0; g = c; b = x; }
//   else if (h < 240) { r = 0; g = x; b = c; }
//   else if (h < 300) { r = x; g = 0; b = c; }
//   else { r = c; g = 0; b = x; }

//   const toHex = (v: number): string => {
//     const hex = Math.round((v + m) * 255).toString(16).padStart(2, "0");
//     return hex;
//   };

//   return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
// }

export function hslToHex(h: number, s: number, l: number): string {
  h = ((h % 360) + 360) % 360;
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;

  let r = 0, g = 0, b = 0;

  if (h < 60) { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else { r = c; b = x; }

  const toHex = (v: number) =>
    Math.round((v + m) * 255)
      .toString(16)
      .padStart(2, "0");

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function getColorFromStorage(key: string): string {
  try {
    return localStorage.getItem(key) || "#ffffff";
  } catch {
    return "#ffffff";
  }
}

export function setColorToStorage(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Silent fail
  }
}

// Helper pour décaler un HSL
function shiftHue(h: number, degree: number) {
  let newHue = (h + degree) % 360;
  return newHue < 0 ? newHue + 360 : newHue;
}

// 1️⃣ Complementary (2 couleurs)
export function complementary(hex: string) {
  const { h, s, l } = hexToHSL(hex);
  return [
    hex,
    hslToHex(shiftHue(h, 180), s, l),
  ];
}

// 2️⃣ Analogous (3 couleurs)
export function analogous(hex: string) {
  const { h, s, l } = hexToHSL(hex);
  return [
    hslToHex(shiftHue(h, -30), s, l),
    hex,
    hslToHex(shiftHue(h, 30), s, l),
  ];
}

// 3️⃣ Triadic (3 couleurs)
export function triadic(hex: string) {
  const { h, s, l } = hexToHSL(hex);
  return [
    hex,
    hslToHex(shiftHue(h, 120), s, l),
    hslToHex(shiftHue(h, 240), s, l),
  ];
}

// 4️⃣ Tetradic (4 couleurs)
export function tetradic(hex: string) {
  const { h, s, l } = hexToHSL(hex);
  return [
    hex,
    hslToHex(shiftHue(h, 90), s, l),
    hslToHex(shiftHue(h, 180), s, l),
    hslToHex(shiftHue(h, 270), s, l),
  ];
}

// 5️⃣ Split Complementary (3 couleurs)
export function splitComplementary(hex: string) {
  const { h, s, l } = hexToHSL(hex);
  return [
    hex,
    hslToHex(shiftHue(h, 150), s, l),
    hslToHex(shiftHue(h, -150), s, l),
  ];
}

// 🎨 HARMONIES
export const harmonies = {
  complementary(hex: string) {
    const { h, s, l } = hexToHSL(hex);
    return [hex, hslToHex(shiftHue(h, 180), s, l)];
  },

  analogous(hex: string) {
    const { h, s, l } = hexToHSL(hex);
    return [
      hslToHex(shiftHue(h, -30), s, l),
      hex,
      hslToHex(shiftHue(h, 30), s, l)
    ];
  },

  triadic(hex: string) {
    const { h, s, l } = hexToHSL(hex);
    return [
      hex,
      hslToHex(shiftHue(h, 120), s, l),
      hslToHex(shiftHue(h, 240), s, l)
    ];
  },

  tetradic(hex: string) {
    const { h, s, l } = hexToHSL(hex);
    return [
      hex,
      hslToHex(shiftHue(h, 90), s, l),
      hslToHex(shiftHue(h, 180), s, l),
      hslToHex(shiftHue(h, 270), s, l),
    ];
  },

  splitComplementary(hex: string) {
    const { h, s, l } = hexToHSL(hex);
    return [
      hex,
      hslToHex(shiftHue(h, 150), s, l),
      hslToHex(shiftHue(h, -150), s, l)
    ];
  },

  monochromatic(hex: string) {
    const { h, s, l } = hexToHSL(hex);

    return [
      hslToHex(h, s, clamp(l - 30)), // plus sombre
      hslToHex(h, s, clamp(l - 15)),
      hex,                           // couleur de base
      hslToHex(h, s, clamp(l + 15)),
      hslToHex(h, s, clamp(l + 30)), // plus clair
    ];
  },

  shades(hex: string) {
    const { h, s, l } = hexToHSL(hex);

    return [
      hslToHex(h, s, clamp(l)),      // base
      hslToHex(h, s, clamp(l - 20)),
      hslToHex(h, s, clamp(l - 40)),
      hslToHex(h, s, clamp(l - 60)),
      hslToHex(h, s, clamp(l - 80)), // presque noir
    ];
  }


};

function clamp(value: number) {
  return Math.min(100, Math.max(0, value));
}

