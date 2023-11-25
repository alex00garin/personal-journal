import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';

const SignIn = React.lazy(() => import('./components/SignIn'));
const SignUp = React.lazy(() => import('./components/SignUp'));
const HomePage = React.lazy(() => import('./pages/HomePage'));

function App() {
  return (
    <Router>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="*" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/homepage" element={<HomePage />} />
        </Routes>
      </React.Suspense>
    </Router>
  );
}

export default App;