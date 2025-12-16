import { Routes, Route, Outlet } from "react-router-dom";
import './App.css'
import { Header } from './components/header'
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="app-root">
      <Header />
      <div className="app-content" >
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default App
