import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import ScrollToTop from './utils/ScrollToTop.js';

import Home from './components/Home';
import Page2 from './components/Page2';
import NewPage from './components/NewPage';


function App() {
  return (
    <RecoilRoot>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path='/page2' element={<Page2 />} />
            <Route path='/newpage' element={<NewPage />} />
            <Route path='/*' element={<Home />} />
          </Routes>
        </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
