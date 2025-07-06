const lightPalletteUrl =
  "https://raw.githubusercontent.com/radix-ui/colors/refs/heads/main/src/light.ts";

const darkPalletteUrl =
  "https://raw.githubusercontent.com/radix-ui/colors/refs/heads/main/src/dark.ts";

interface RadixColorPalette {
  [key: string]: {
    [key: string]: string;
  };
}

const contrast: Record<string, string> = {
  gray: "#fff",
  mauve: "#fff",
  slate: "#fff",
  sage: "#fff",
  olive: "#fff",
  sand: "#fff",
  amber: "#21201c",
  blue: "#fff",
  bronze: "#fff",
  brown: "#fff",
  crimson: "#fff",
  cyan: "#fff",
  gold: "#fff",
  grass: "#fff",
  green: "#fff",
  indigo: "#fff",
  iris: "#fff",
  jade: "#fff",
  lime: "#1d211c",
  mint: "#1a211e",
  orange: "#fff",
  pink: "#fff",
  plum: "#fff",
  purple: "#fff",
  red: "#fff",
  ruby: "#fff",
  sky: "#1c2024",
  teal: "#fff",
  tomato: "#fff",
  violet: "#fff",
  yellow: "#21201c",
};

const lightSurfaceColors: Record<string, string> = {
  gray: "#fffc",
  mauve: "#fffc",
  slate: "#fffc",
  sage: "#fffc",
  olive: "#fffc",
  sand: "#fffc",
  amber: "#fefae4cc",
  blue: "#f1f9ffcc",
  bronze: "#fdf5f3cc",
  brown: "#fbf8f4cc",
  crimson: "#fef5f8cc",
  cyan: "#eff9facc",
  gold: "#f9f8efcc",
  grass: "#f3faf3cc",
  green: "#f1faf4cc",
  indigo: "#f5f8ffcc",
  iris: "#f6f6ffcc",
  jade: "#f1faf5cc",
  lime: "#f6f9f0cc",
  mint: "#effaf8cc",
  orange: "#fff5e9cc",
  pink: "#fef5facc",
  plum: "#fdf5fdcc",
  purple: "#faf5fecc",
  red: "#fff5f5cc",
  ruby: "#fff5f6cc",
  sky: "#eef9fdcc",
  teal: "#f0faf8cc",
  tomato: "#fff6f5cc",
  violet: "#f9f6ffcc",
  yellow: "#fefbe4cc",
};

const darkSurfaceColors: Record<string, string> = {
  gray: "#21212180",
  mauve: "#22212380",
  slate: "#1f212380",
  sage: "#1e201f80",
  olive: "#1f201e80",
  sand: "#21212080",
  amber: "#271f1380",
  blue: "#11213d80",
  bronze: "#27211d80",
  brown: "#271f1b80",
  crimson: "#2f151f80",
  cyan: "#11252d80",
  gold: "#25231d80",
  grass: "#19231b80",
  green: "#15251d80",
  indigo: "#171d3b80",
  iris: "#1d1b3980",
  jade: "#13271f80",
  lime: "#1b211580",
  mint: "#15272780",
  orange: "#271d1380",
  pink: "#31132980",
  plum: "#2f152f80",
  purple: "#2b173580",
  red: "#2f151780",
  ruby: "#2b191d80",
  sky: "#13233b80",
  teal: "#13272580",
  tomato: "#2d191580",
  violet: "#25193980",
  yellow: "#231f1380",
};

function hexToOKLCH(hex: string): string {
  // Convert hex to RGB
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  // Helper function to linearize sRGB
  function linearizeRGB(value: number): number {
    return value <= 0.04045
      ? value / 12.92
      : Math.pow((value + 0.055) / 1.055, 2.4);
  }

  // Linearize RGB values
  const rLinear = linearizeRGB(r);
  const gLinear = linearizeRGB(g);
  const bLinear = linearizeRGB(b);

  // Convert linear RGB to XYZ (D65 illuminant)
  const x = 0.4124564 * rLinear + 0.3575761 * gLinear + 0.1804375 * bLinear;
  const y = 0.2126729 * rLinear + 0.7151522 * gLinear + 0.072175 * bLinear;
  const z = 0.0193339 * rLinear + 0.119192 * gLinear + 0.9503041 * bLinear;

  // Convert XYZ to OKLab
  const l_ = Math.cbrt(0.8189330101 * x + 0.3618667424 * y - 0.1288597137 * z);
  const m_ = Math.cbrt(0.0329845436 * x + 0.9293118715 * y + 0.0361456387 * z);
  const s_ = Math.cbrt(0.0482003018 * x + 0.2643662691 * y + 0.633851707 * z);

  const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
  const a = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
  const b_lab = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;

  // Convert OKLab to OKLCH
  const lightness = L;
  const chroma = Math.sqrt(a * a + b_lab * b_lab);
  let hue = Math.atan2(b_lab, a) * (180 / Math.PI);

  // Normalize hue to 0-360 range
  if (hue < 0) {
    hue += 360;
  }

  // Round to reasonable precision
  const roundedL = Math.round(lightness * 10000) / 10000;
  const roundedC = Math.round(chroma * 10000) / 10000;
  const roundedH = Math.round(hue * 10000) / 10000;

  return `oklch(${roundedL} ${roundedC} ${roundedH})`;
}

function parseRadixColors(colorText: string): RadixColorPalette {
  const colorPalette: RadixColorPalette = {};

  // Extract all export statements with color objects
  const exportRegex = /export const (\w+) = \{([^}]+)\};/g;
  let match;

  while ((match = exportRegex.exec(colorText)) !== null) {
    const [, colorName, colorObject] = match;

    // Filter out variant colors (those ending with A, P3, P3A, or containing these patterns)
    if (colorName.endsWith("A") || colorName.includes("P3")) {
      continue;
    }

    const colors: { [key: string]: string } = {};

    // Parse individual color properties
    const colorRegex = /(\w+):\s*"([^"]+)"/g;
    let colorMatch;

    while ((colorMatch = colorRegex.exec(colorObject)) !== null) {
      const [, colorKey, colorValue] = colorMatch;
      colors[colorKey] = colorValue;
    }

    colorPalette[colorName] = colors;
  }

  return colorPalette;
}

function titleCase(str: string): string {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function generateCSSCustomProperties(
  lightColors: RadixColorPalette,
  darkColors: RadixColorPalette
): string {
  let css = ":root {\n";

  // Add light theme colors
  Object.entries(lightColors).forEach(([paletteName, colors]) => {
    css += `\n /* ${titleCase(paletteName)} color */ \n`;
    Object.entries(colors).forEach(([colorKey, colorValue], index) => {
      const cleanColorKey = colorKey.replace(/\d+$/, "");
      css += `  --${cleanColorKey}-${index + 1}: ${colorValue};\n`;
    });
    css += `  --${paletteName}-contrast: ${contrast[paletteName]};\n`;
    css += `  --${paletteName}-surface: ${lightSurfaceColors[paletteName]};\n`;
  });

  css += "}\n\n";

  // Add data-theme attribute

  css += ".dark {\n";
  Object.entries(darkColors).forEach(([paletteName, colors]) => {
    css += `\n /* ${titleCase(paletteName)} color */ \n`;
    Object.entries(colors).forEach(([colorKey, colorValue], index) => {
      const cleanColorKey = colorKey.replace(/\d+$/, "");
      css += `  --${cleanColorKey}-${index + 1}: ${colorValue};\n`;
    });

    let color = paletteName.slice(0, -4);
    css += `  --${color}-contrast: ${contrast[color]};\n`;
    css += `  --${color}-surface: ${darkSurfaceColors[color]};\n`;
  });
  css += "}\n";

  return css;
}

export async function fetchRadixColors(): Promise<RadixColorPalette[]> {
  try {
    const [lightResponse, darkResponse] = await Promise.all([
      fetch(lightPalletteUrl),
      fetch(darkPalletteUrl),
    ]);

    const lightColors = await lightResponse.text();
    const darkColors = await darkResponse.text();

    const parsedLightColors = parseRadixColors(lightColors);
    const parsedDarkColors = parseRadixColors(darkColors);

    return [parsedLightColors, parsedDarkColors];
  } catch (error) {
    console.error("Error fetching Radix colors:", error);
    throw error;
  }
}

export async function saveRadixColorsToFile(
  filePath: string = "./src/styles/radix-colors.css"
): Promise<void> {
  const [lightColors, darkColors] = await fetchRadixColors();
  const css = generateCSSCustomProperties(lightColors, darkColors);

  // Create directory if it doesn't exist using mkdir
  const dir = filePath.substring(0, filePath.lastIndexOf("/"));
  if (dir) {
    await Bun.$`mkdir -p ${dir}`.quiet();
  }

  // Use Bun's built-in file system API
  await Bun.write(filePath, css);
  console.log(`Radix colors CSS saved to: ${filePath}`);
}

export async function addRadixColorsToProject(
  filePath: string = "./src/app/globals.css"
): Promise<void> {
  const [lightColors, darkColors] = await fetchRadixColors();

  // Read the existing globals.css file
  const existingContent = await Bun.file(filePath).text();

  // Check if colors are already added to avoid duplication
  if (existingContent.includes("/* Gray colors */")) {
    console.log("Radix colors already exist in the file. Skipping...");
    return;
  }

  // Generate light colors CSS for :root selector
  let lightColorsCSS = "";
  Object.entries(lightColors).forEach(([paletteName, colors]) => {
    lightColorsCSS += `\n  /* ${titleCase(paletteName)} color */\n`;
    Object.entries(colors).forEach(([colorKey, colorValue], index) => {
      const cleanColorKey = colorKey.replace(/\d+$/, "");
      lightColorsCSS += `  --${cleanColorKey}-${index + 1}: ${colorValue};\n`;
    });
    lightColorsCSS += `  --${paletteName}-contrast: ${contrast[paletteName]};\n`;
    lightColorsCSS += `  --${paletteName}-surface: ${lightSurfaceColors[paletteName]};\n`;
  });

  // Generate dark colors CSS for .dark selector
  let darkColorsCSS = "";
  Object.entries(darkColors).forEach(([paletteName, colors]) => {
    darkColorsCSS += `\n  /* ${titleCase(paletteName)} color */\n`;
    Object.entries(colors).forEach(([colorKey, colorValue], index) => {
      const cleanColorKey = colorKey.replace(/\d+$/, "");
      darkColorsCSS += `  --${cleanColorKey}-${index + 1}: ${colorValue};\n`;
    });
    let color = paletteName.slice(0, -4);
    darkColorsCSS += `  --${color}-contrast: ${contrast[color]};\n`;
    darkColorsCSS += `  --${color}-surface: ${darkSurfaceColors[color]};\n`;
  });

  let updatedContent = existingContent;

  // Find the :root selector and add light colors before the closing brace
  const rootMatch = updatedContent.match(/(:root\s*{[\s\S]*?)(\s*})/);
  if (rootMatch) {
    updatedContent = updatedContent.replace(
      rootMatch[0],
      `${rootMatch[1]}${lightColorsCSS}${rootMatch[2]}`
    );
  }

  // For .dark selector, find the position right after the last CSS property (before @theme inline)
  const darkStart = updatedContent.indexOf(".dark {");
  const themeStart = updatedContent.indexOf("@theme inline", darkStart);

  if (darkStart !== -1 && themeStart !== -1) {
    // Find the last CSS property before @theme inline
    const beforeTheme = updatedContent.substring(darkStart, themeStart);
    const lastSemicolon = beforeTheme.lastIndexOf(";");

    if (lastSemicolon !== -1) {
      const insertionPoint = darkStart + lastSemicolon + 1;
      updatedContent =
        updatedContent.slice(0, insertionPoint) +
        darkColorsCSS +
        "\n" +
        updatedContent.slice(insertionPoint);
    }
  }

  // Write the updated content back to the file
  await Bun.write(filePath, updatedContent);
  console.log(`Radix colors CSS added to: ${filePath}`);
}

await addRadixColorsToProject("./src/app/globals.css");
// await saveRadixColorsToFile();
