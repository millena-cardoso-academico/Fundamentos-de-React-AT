import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/AdicionarHotel.css';

function AdicionarHotel() {
  const [hotel, setHotel] = useState({
    nome: '',
    classificacao: 1,
    cidade: '',
    estado: '',
    preco: '',
    descricao: '',
    descricaoDetalhada: '',
    imagemPrincipal: '',
    imagensAdicionais: [],
    servicos: '',
    favorito: false
  });
  const [nomeImagemPrincipal, setNomeImagemPrincipal] = useState('');
  const [nomesImagensAdicionais, setNomesImagensAdicionais] = useState([]);

  const navigate = useNavigate();

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

  const handleAdicionalImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imageReaders = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imageReaders).then((images) => {
      setHotel((prev) => ({
        ...prev,
        imagensAdicionais: [...prev.imagensAdicionais, ...images]
      }));
    });

    setNomesImagensAdicionais([...nomesImagensAdicionais, ...files.map(file => file.name)]);
  };

  const removerImagemAdicional = (index) => {
    const novasImagens = hotel.imagensAdicionais.filter((_, i) => i !== index);
    const novosNomes = nomesImagensAdicionais.filter((_, i) => i !== index);

    setHotel({ ...hotel, imagensAdicionais: novasImagens });
    setNomesImagensAdicionais(novosNomes);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const novoHotel = {
      ...hotel,
      favorito: false,
      classificacao: parseInt(hotel.classificacao, 10),
      preco: parseFloat(hotel.preco),
      servicos: hotel.servicos.split(',').map(servico => servico.trim())
    };

    const hoteis = JSON.parse(localStorage.getItem('hoteis')) || [];
    hoteis.push(novoHotel);
    localStorage.setItem('hoteis', JSON.stringify(hoteis));

    navigate('/', { state: { atualizado: true } });
  };

  return (
    <div className="container">
      <header className="site-header">
        <h1>Adicionar Novo Hotel</h1>
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
          <textarea
            name="descricaoDetalhada"
            placeholder="Descrição detalhada dos serviços e itens"
            value={hotel.descricaoDetalhada}
            onChange={handleChange}
            required
            className="form-textarea"
          />
          <div className="image-upload-section">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
              className="form-input"
            />
            {nomeImagemPrincipal && (
              <div className="image-preview-item">
                <p className="image-name">{nomeImagemPrincipal}</p>
                <button type="button" onClick={removerImagemPrincipal} className="remove-btn">X</button>
              </div>
            )}
          </div>
          <div className="image-upload-section">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleAdicionalImageChange}
              className="form-input"
            />
            <div className="image-preview-list">
              {nomesImagensAdicionais.map((nome, index) => (
                <div key={index} className="image-preview-item">
                  <span>{nome}</span>
                  <button type="button" onClick={() => removerImagemAdicional(index)} className="remove-btn">X</button>
                </div>
              ))}
            </div>
          </div>
          <textarea
            name="servicos"
            placeholder="Serviços e itens (separados por vírgula)"
            value={hotel.servicos}
            onChange={handleChange}
            required
            className="form-textarea"
          />
          <button type="submit" className="form-button">Adicionar Hotel</button>
        </form>
      </div>
    </div>
  );
}

export default AdicionarHotel;
