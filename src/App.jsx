import { useState } from 'react'
import './App.css'
import Menu from './components/Menu/Menu'
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="app-root">
      <Menu />
      <div className="app-content" style={{ padding: '20px' }}>
        {/* content */}
      </div>
      <Footer />
    </div>
  )
}

export default App
