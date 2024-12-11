import { BrowserRouter} from "react-router-dom"

import Header from "./layout/Header"
import Navegacion from "./layout/Navegacion"
import Routing from "./router/Routing"


const App = () => {
  return (
    <>
    <BrowserRouter>
      <Header />
      <div className="flex gap-10 contenedor contenido-principal">
        <Navegacion/>
        <main className="caja-contenido w-full mb-96"> 
          <Routing/>
        </main>
      </div>
      </BrowserRouter>
    </>
  )
}

export default App