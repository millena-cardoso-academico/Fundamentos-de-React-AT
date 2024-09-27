import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/CardHotel.css';

import PousadaArteImg from '../imgs/hoteis/pousada-arte.jpg';
import CarmelResortImg from '../imgs/hoteis/carmel-resort.jpg';
import HotelCataratasImg from '../imgs/hoteis/hotel-cataratas.webp';
import TransamericaComandatubaImg from '../imgs/hoteis/transmerica-comandatuba.jpg';
import PedrasPatachoImg from '../imgs/hoteis/pedras-patacho.jpg';
import NannaiMuroImg from '../imgs/hoteis/nannai-muro.jpg';

const imagensHoteis = [
  PousadaArteImg,
  CarmelResortImg,
  HotelCataratasImg,
  TransamericaComandatubaImg,
  PedrasPatachoImg,
  NannaiMuroImg,
];

function CardHotel({ hotel, index, onDelete, onToggleFavorite }) {
  const renderStars = () => {
    const classificacao = hotel.classificacao || 0;
    const maxStars = 5;
    const filledStars = Math.floor(classificacao);
    const hasHalfStar = classificacao % 1 >= 0.5 ? 1 : 0;
    const emptyStars = maxStars - filledStars - hasHalfStar;

    return (
      <>
        {Array(filledStars)
          .fill('⭐')
          .map((star, idx) => (
            <span key={`filled-${idx}`}>{star}</span>
          ))}
        {hasHalfStar === 1 && <span key="half-star">⭐</span>}
        {Array(emptyStars)
          .fill('✩')
          .map((star, idx) => (
            <span key={`empty-${idx}`}>{star}</span>
          ))}
      </>
    );
  };

  return (
    <div className="card-hotel">
      <div className="card-header">
        <h2>{hotel.nome}</h2>
        <div className="icons">
          <Link to={`/editar/${index}`} className="icon edit-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-edit"
            >
              <path d="M11 4h-2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2m-1.5-6.5l2-2a2.121 2.121 0 0 0 0-3l-2-2a2.121 2.121 0 0 0-3 0l-2 2m-1 1l6 6"></path>
            </svg>
          </Link>
          <span onClick={() => onDelete(index)} className="icon delete-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-trash"
            >
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m5 6v6m4-6v6"></path>
            </svg>
          </span>
          <span
            onClick={() => onToggleFavorite(index)}
            className={`icon favorite-icon ${hotel.favorito ? 'favorited' : ''}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={hotel.favorito ? '#f39c12' : 'none'}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-star"
            >
              <polygon points="12 2 15 8.8 22 9.5 17 14 18.5 21 12 17.5 5.5 21 7 14 2 9.5 9 8.8 12 2"></polygon>
            </svg>
          </span>
        </div>
      </div>

      <div className="hotel-image">
        <img 
          src={hotel.imagemPrincipal || imagensHoteis[index % imagensHoteis.length]} 
          alt={hotel.nome} 
          className="hotel-img" 
        />
      </div>

      <p><span className="label">Classificação:</span> {renderStars()}</p>
      <p><span className="label">Cidade:</span> {hotel.cidade}</p>
      <p><span className="label">Estado:</span> {hotel.estado}</p>
      <p><span className="label">Preço da diária:</span> R${hotel.preco}</p>
      <p>{hotel.descricao}</p>

      <Link to={`/detalhes/${index}`} className="ver-mais-btn">
        Ver mais detalhes
      </Link>
    </div>
  );
}

CardHotel.propTypes = {
  hotel: PropTypes.shape({
    nome: PropTypes.string.isRequired,
    classificacao: PropTypes.number,
    cidade: PropTypes.string.isRequired,
    estado: PropTypes.string.isRequired,
    preco: PropTypes.number.isRequired,
    descricao: PropTypes.string.isRequired,
    imagemPrincipal: PropTypes.string,
    favorito: PropTypes.bool.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
};

export default CardHotel;
