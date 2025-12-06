const HISTORY_KEY = "paletteHistory";

/**
 * Ajoute une couleur à l'historique des palettes
 * @param {string} color - Couleur au format hexadécimal (ex: "#ff6600")
 * @returns {void}
 */
export function addToHistory(color: string) {
  const history = getHistory();
  const newHistory = [color, ...history.filter((c) => c !== color)];

  if (newHistory.length > 25) newHistory.pop();

  localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
}

/**
 * Récupère l'historique des couleurs depuis le localStorage
 * @returns {string[]} - Tableau des couleurs au format hexadécimal
 */
export function getHistory(): string[] {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  } catch {
    return [];
  }
}

/**
 * Efface complètement l'historique des couleurs du localStorage
 * @returns {void}
 */
export function clearHistory() {
  localStorage.removeItem(HISTORY_KEY);
}

