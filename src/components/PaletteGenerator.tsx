import { useState, useEffect } from "react";
import ColorCard from "./ColorCard";
import { harmonies } from "../utils/colorUtils";
import { addToHistory, getHistory, clearHistory } from "../utils/history";
import { RefreshCcw, Trash2 } from "lucide-react";

// Types pour les harmonies
type HarmonyKey =
  | "complementary"
  | "analogous"
  | "triadic"
  | "tetradic"
  | "splitComplementary"
  | "monochromatic"
  | "shades";

type PalettesState = Record<HarmonyKey, string[]>;

export default function PaletteGenerator() {
  const [hexInput, setHexInput] = useState("#ff6600");
  const [palettes, setPalettes] = useState<PalettesState>({} as PalettesState);
  const [history, setHistory] = useState<string[]>([]);

  const harmonyList: { key: HarmonyKey; label: string }[] = [
    { key: "complementary", label: "Complémentaire" },
    { key: "analogous", label: "Analogique" },
    { key: "triadic", label: "Triadique" },
    { key: "tetradic", label: "Tétradique" },
    { key: "splitComplementary", label: "Complémentaire scindée" },
    { key: "monochromatic", label: "Monochromatique" },
    { key: "shades", label: "Nuances" },
  ];

  const generateAll = () => {
    if (!/^#[0-9A-Fa-f]{6}$/.test(hexInput)) return;

    const newPalettes = {} as PalettesState;

    for (let h of harmonyList) {
      newPalettes[h.key] = harmonies[h.key](hexInput);
    }

    setPalettes(newPalettes);
    addToHistory(hexInput);
    setHistory(getHistory());
  };

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="flex flex-col">
        <div className="flex flex-col">
          <label className="text-sm">Sélecteur :</label>
          <input type="color" value={hexInput} onChange={(e) => setHexInput(e.target.value)} />
        </div>

        <div className="flex flex-col">
          <label className="text-sm">Hexadécimal :</label>
          <input
            type="text"
            className="border border-orange-500 w-fit caret-amber-600 p-1 rounded"
            value={hexInput}
            onChange={(e) => setHexInput(e.target.value)}
            maxLength={7}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={generateAll}
          className="px-2 py-1 flex bg-orange-500 hover:bg-orange-600 active:bg-orange-800 active:scale-95 transition text-white rounded w-fit"
        >
          <RefreshCcw className="pr-1" />
          Générer
        </button>

        <button
          onClick={() => {
            clearHistory();
            setHistory([]);
          }}
          className="px-3 py-1 flex bg-red-500 text-white rounded hover:bg-red-600 active:bg-red-800 active:scale-95 transition w-fit"
        >
          <Trash2 className="pr-1" />
          Effacer l’historique
        </button>
      </div>

      {/* Historique */}
      <div>
        <h3 className="font-bold mb-2">Historique</h3>

        {history.length === 0 ? (
          <p className="text-gray-500 italic">Historique vide</p>
        ) : (
          <div className="flex gap-2 flex-wrap">
            {history.map((c, i) => (
              <div
                key={i}
                onClick={() => setHexInput(c)}
                className="w-8 h-8 rounded border cursor-pointer hover:scale-110 transition"
                style={{ background: c }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Palettes */}
      <div className="space-y-10">
        <h3 className="font-bold mb-2">Palette de couleurs</h3>

        {Object.keys(palettes).length > 0 &&
          harmonyList.map((h) => (
            <div key={h.key}>
              <h2 className="font-bold text-lg mb-2">{h.label}</h2>
              <div className="flex flex-wrap gap-2">
                {palettes[h.key]?.map((color, i) => (
                  <ColorCard key={i} color={color} />
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
