import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/HotelDetalhes.css';

function HotelDetalhes() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [imagemAtual, setImagemAtual] = useState(0);

  useEffect(() => {
    const hoteisAdicionados = JSON.parse(localStorage.getItem('hoteis')) || [];
    const hotelEncontrado = hoteisAdicionados[parseInt(id, 10)];

    if (hotelEncontrado) {
      setHotel(hotelEncontrado);
    }
  }, [id]);

  const proximaImagem = () => {
    if (hotel?.imagensAdicionais && hotel.imagensAdicionais.length > 0) {
      setImagemAtual((prevIndex) => (prevIndex + 1) % hotel.imagensAdicionais.length);
    }
  };

  const imagemAnterior = () => {
    if (hotel?.imagensAdicionais && hotel.imagensAdicionais.length > 0) {
      setImagemAtual((prevIndex) => (prevIndex - 1 + hotel.imagensAdicionais.length) % hotel.imagensAdicionais.length);
    }
  };

  if (!hotel) {
    return <div>Hotel não encontrado</div>;
  }

  return (
    <div className="hotel-detalhes-container">
      <h1>{hotel.nome}</h1>
      <p><strong>Localização:</strong> {hotel.cidade}, {hotel.estado}</p>
      <p><strong>Preço diário:</strong> R${hotel.preco}</p>

      {hotel.descricaoCompleta && (
        <p className="descricao">{hotel.descricaoCompleta}</p>
      )}

      <div className="hotel-imagens">
        {hotel.imagensAdicionais && hotel.imagensAdicionais.length > 0 ? (
          <>
            <button onClick={imagemAnterior} className="image-nav prev-btn">←</button>
            <img src={hotel.imagensAdicionais[imagemAtual]} alt={`${hotel.nome} imagem adicional`} className="imagem-detalhe" />
            <button onClick={proximaImagem} className="image-nav next-btn">→</button>
          </>
        ) : (
          hotel.imagemPrincipal && (
            <img src={hotel.imagemPrincipal} alt={`${hotel.nome} imagem principal`} className="imagem-detalhe" />
          )
        )}
      </div>

      <h3>Serviços e Itens Oferecidos</h3>
      <ul>
        {hotel.servicos && Array.isArray(hotel.servicos) ? (
          hotel.servicos.map((servico, index) => <li key={index}>{servico}</li>)
        ) : (
          hotel.servicos?.split(',').map((servico, index) => <li key={index}>{servico.trim()}</li>)
        )}
      </ul>

      <Link to="/" className="voltar-btn">Voltar</Link>
    </div>
  );
}

export default HotelDetalhes;
