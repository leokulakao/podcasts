import React, { useEffect } from 'react';
import { usePodcasts } from './podcasts/hooks';
import { AppRouter } from './routes/AppRouter';
// import logo from './logo.svg';
// import './App.css';

function App() {
  const { isLoading, podcasts } = usePodcasts();

  useEffect(() => console.log('isLoading', isLoading), [isLoading]);

  console.log(podcasts);
  return <AppRouter></AppRouter>;
}

export default App;
