import { Facebook, Linkedin } from "lucide-react"

const Footer = () => {
    return (
        <footer id="contact" className="footer footer-center flex flex-col p-10">
            <aside>
                <div className="flex flex-col justify-center text-center items-center space-x-1.5">
                    <p className="font-bold">
                        <span>Réalisé par</span> <br />
                        <span className="text-2xl text-orange-600">Eric Toumoudagou</span>
                    </p>
                    <p>Copyright {new Date().getFullYear()} - Tout droit reservé</p>
                </div>
            </aside>
            <nav>
                <div className="flex justify-center gap-4">
                    <a target="__blanck" href="https://www.facebook.com/eric.toum05" className="transition-transform duration-300 hover:scale-125">
                        <Facebook />
                    </a>
                    <a target="__blanck" href="https://www.linkedin.com/in/eritoumdakoua-e2024-62150923b" className="transition-transform duration-300 hover:scale-125">
                        <Linkedin />
                    </a>
                </div>
            </nav>
        </footer>
    )
}

export default Footer