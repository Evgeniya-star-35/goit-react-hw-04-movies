// import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from '../_pages/HomePage/HomePage';
import MoviesPage from '../_pages/MoviesPage/MoviesPage';

import Container from '../Container';
import AppBar from '../AppBar/AppBar';
import NotFoundMovie from '../_pages/NotFoundMovie/NotFoundMovie';

// import NoFound from '../NoFound';

function App() {
  return (
    <Container>
      <ToastContainer autoClose={4000} />

      <AppBar />
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>

        <Route path="/movies" exact>
          <MoviesPage />
        </Route>

        <Route>
          <NotFoundMovie />
        </Route>
      </Switch>
    </Container>
  );
}

export default App;
