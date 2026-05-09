import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './context/AuthContext';
import Navbar from './components/NavBar';
import News from './components/News';
import Login from './components/Login';
import Register from './components/Register';
import SavedArticles from './components/SavedArticles';
import SearchResults from './components/SearchResults';
import Profile from './components/Profile';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

export default class App extends Component {
  state = { progress: 0 };

  setProgress = (progress) => this.setState({ progress });

  render() {
    const { progress } = this.state;
    const pageSize = 9;

    const newsRoute = (category) => (
      <News
        setProgress={this.setProgress}
        key={category}
        pageSize={pageSize}
        country="us"
        category={category}
      />
    );

    return (
      <AuthProvider>
        <Router>
          <Navbar />
          <LoadingBar height={3} color="#a75f6dff" progress={progress} />
          <div className="main-page-wrapper" style={{ paddingTop: '56px' }}>
            <Routes>
              <Route path="/" element={newsRoute('general')} />
              <Route path="/general" element={newsRoute('general')} />
              <Route path="/business" element={newsRoute('business')} />
              <Route path="/entertainment" element={newsRoute('entertainment')} />
              <Route path="/health" element={newsRoute('health')} />
              <Route path="/science" element={newsRoute('science')} />
              <Route path="/sports" element={newsRoute('sports')} />
              <Route path="/technology" element={newsRoute('technology')} />
              <Route path="/search" element={<SearchResults setProgress={this.setProgress} />} />
              <Route path="/saved" element={<SavedArticles />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
          <Footer />
          <ScrollToTop />
          <ToastContainer position="bottom-right" autoClose={3000} />
        </Router>
      </AuthProvider>
    );
  }
}
