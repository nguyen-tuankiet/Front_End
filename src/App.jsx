import { useState } from 'react'
import './App.css'
import Menu from './components/Menu/Menu'
import Footer from './components/Footer/Footer';
import HealthPage from './components/Health/HealthPage';

function App() {
  return (
    <div className="app-root">
      <Menu />
      <div className="app-content" style={{ padding: '20px' }}>
        <HealthPage />
      </div>
      <Footer />
    </div>
  )
}

export default App
