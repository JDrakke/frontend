import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; 

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="home-title">Bienvenido a la App de E-commerce</h1>
        <p className="home-description">Descubre productos increíbles y disfruta de una experiencia de compra sin igual.</p>
        <nav className="home-nav">
          <ul className="home-nav-list">
            <li className="home-nav-item">
              <Link to="/products" className="home-nav-link">Explorar Productos</Link>
            </li>
            <li className="home-nav-item">
              <Link to="/login" className="home-nav-link">Iniciar Sesión</Link>
            </li>
            <li className="home-nav-item">
              <Link to="/register" className="home-nav-link">Registrarse</Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Home;
