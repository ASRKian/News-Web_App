import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import React, { useState } from 'react'
import News from './Components/News';
import NavBar from './NavBar';
import LoadingBar from 'react-top-loading-bar'

const App = () => {
  let pageSize = 9;
  const [progress, setProgress] = useState(0);

  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <LoadingBar
          color='#f11946'
          progress={progress}
        // onLoaderFinished={() => setProgress(0)}
        />
        {/* <News setProgress = { setProgress} pageSize={ pageSize} country="in" category="general" /> */}
        <Routes>
          <Route path="/" element={<News key="general" setProgress={setProgress} pageSize={pageSize} country="in" category="general" />}></Route>
          <Route path="/business" element={<News key="business" setProgress={setProgress} pageSize={pageSize} country="in" category="business" />}></Route>
          <Route path="/entertainment" element={<News key="entertainment" setProgress={setProgress} pageSize={pageSize} country="in" category="entertainment" />}></Route>
          <Route path="/health" element={<News key="health" setProgress={setProgress} pageSize={pageSize} country="in" category="health" />}></Route>
          <Route path="/science" element={<News key="science" setProgress={setProgress} pageSize={pageSize} country="in" category="science" />}></Route>
          <Route path="/sports" element={<News key="sports" setProgress={setProgress} pageSize={pageSize} country="in" category="sports" />}></Route>
          <Route path="/technology" element={<News key="technology" setProgress={setProgress} pageSize={pageSize} country="in" category="technology" />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
