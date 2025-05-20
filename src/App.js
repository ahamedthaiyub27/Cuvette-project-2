import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Notes from './components/Notes';
import Main from './components/Mainpage/Main';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />
        <div className="content-area">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/notes/:groupId" element={<Notes />} />
    
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
