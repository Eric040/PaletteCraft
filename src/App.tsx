import GenerateColorPalette from "./components/PaletteGenerator";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

function App() {

  return (
    <>
      <div className="p-5 md:px-[15%] md:py-4">
        <NavBar />

        <div className="flex flex-col md:flex-row justify-between gap-4">
            <GenerateColorPalette />
        </div>

        <hr className="my-4" />

        <Footer />
        
      </div>

    </>
  )
}

export default App
