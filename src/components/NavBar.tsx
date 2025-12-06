import { Moon, Paintbrush, Sun } from "lucide-react";
import useTheme from "./Theme";

export default function NavBar() {
    const { theme, setTheme } = useTheme();
    return (
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
                <Paintbrush className="h-8 w-8 md:h-10 md:w-10" />
                <h1 className="font-bold text-xl md:text-3xl lg:text-4xl">Palette<span className="text-orange-600">Craft</span></h1>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex bg-gray-200 rounded-full p-1 gap-1">
                    <Sun
                        className={`h-6 w-6 p-1 rounded-full cursor-pointer transition-colors
    ${theme === "light" ? "stroke-orange-600 bg-gray-300 shadow" : ""}
  `}
                        onClick={() => setTheme("light")}
                    />

                    <Moon
                        className={`h-6 w-6 p-1 rounded-full cursor-pointer transition-colors
    ${theme === "dark" ? "stroke-orange-600 bg-gray-300 shadow" : ""}
  `}
                        onClick={() => setTheme("dark")}
                    />
                </div>
            </div>
        </div>
    )
}