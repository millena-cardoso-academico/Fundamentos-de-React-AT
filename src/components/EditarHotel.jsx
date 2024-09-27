import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import '../styles/EditarHotel.css';

function EditarHotel() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState({
    nome: '',
    classificacao: 1,
    cidade: '',
    estado: '',
    preco: '',
    descricao: '',
    imagemPrincipal: ''
  });
  const [nomeImagemPrincipal, setNomeImagemPrincipal] = useState('');

  useEffect(() => {
    const hoteis = JSON.parse(localStorage.getItem('hoteis')) || [];
    const hotelEdit = hoteis[parseInt(id)];
    if (hotelEdit) {
      setHotel(hotelEdit);
      setNomeImagemPrincipal(hotelEdit.imagemPrincipal ? 'Imagem existente' : '');
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotel({ 
      ...hotel, 
      [name]: name === 'classificacao' || name === 'preco' ? parseFloat(value) : value 
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNomeImagemPrincipal(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        setHotel({ ...hotel, imagemPrincipal: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const removerImagemPrincipal = () => {
    setNomeImagemPrincipal('');
    setHotel({ ...hotel, imagemPrincipal: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const novoHotel = {
      ...hotel,
      classificacao: parseInt(hotel.classificacao, 10),
      preco: parseFloat(hotel.preco)
    };

    const hoteis = JSON.parse(localStorage.getItem('hoteis')) || [];
    hoteis[parseInt(id)] = novoHotel;
    localStorage.setItem('hoteis', JSON.stringify(hoteis));

    navigate('/', { state: { atualizado: true } });
  };

  return (
    <div className="container">
      <header className="site-header">
        <h1>Editar Hotel</h1>
        <Link to="/" className="add-hotel-btn">Voltar à Lista</Link>
      </header>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="hotel-form">
          <input
            name="nome"
            placeholder="Nome do Hotel"
            value={hotel.nome}
            onChange={handleChange}
            required
            className="form-input"
          />
          <input
            name="classificacao"
            type="number"
            min="1"
            max="5"
            placeholder="Classificação"
            value={hotel.classificacao}
            onChange={handleChange}
            required
            className="form-input"
          />
          <input
            name="cidade"
            placeholder="Cidade"
            value={hotel.cidade}
            onChange={handleChange}
            required
            className="form-input"
          />
          <input
            name="estado"
            placeholder="Estado"
            value={hotel.estado}
            onChange={handleChange}
            required
            className="form-input"
          />
          <input
            name="preco"
            type="number"
            placeholder="Preço da diária"
            value={hotel.preco}
            onChange={handleChange}
            required
            className="form-input"
          />
          <textarea
            name="descricao"
            placeholder="Descrição do hotel"
            value={hotel.descricao}
            onChange={handleChange}
            required
            className="form-textarea"
          />
          <div className="image-upload-section">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="form-input"
            />
            {nomeImagemPrincipal && (
              <div className="image-preview-item">
                <p className="image-name">{nomeImagemPrincipal}</p>
                <button type="button" onClick={removerImagemPrincipal} className="remove-btn">X</button>
              </div>
            )}
          </div>
          <button type="submit" className="form-button">Salvar Alterações</button>
        </form>
      </div>
    </div>
  );
}

export default EditarHotel;
