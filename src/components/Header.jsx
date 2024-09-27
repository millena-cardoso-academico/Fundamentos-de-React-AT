import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

function Header({ showFavorites, setShowFavorites }) {
  return (
    <header className="site-header">
      <h1>Hotelmania</h1>
      <p className="site-tagline">Transforme suas viagens em algo épico!</p>
      <Link to="/adicionar" className="add-hotel-btn">Adicionar Novo Hotel</Link>
      <button
        onClick={() => setShowFavorites(!showFavorites)}
        className="toggle-favorites-btn"
      >
        {showFavorites ? 'Mostrar Todos' : 'Mostrar Favoritos'}
      </button>
    </header>
  );
}

Header.propTypes = {
  showFavorites: PropTypes.bool.isRequired,
  setShowFavorites: PropTypes.func.isRequired,
};

export default Header;