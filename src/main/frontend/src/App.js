import React from 'react';
import LoginPage from './pages/LoginPage'; // Import the component
import './App.css'; // Or your relevant CSS file

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* You might have other components or routing here */}
        <LoginPage />
      </header>
    </div>
  );
}

export default App;
