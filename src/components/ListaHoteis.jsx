import { useEffect, useState } from 'react';
import CardHotel from './CardHotel';
import FlashMessage from './FlashMessage';
import Header from './Header';
import '../styles/ListaHoteis.css';

import PousadaArteImg from '../imgs/hoteis/pousada-arte.jpg';
import CarmelResortImg from '../imgs/hoteis/carmel-resort.jpg';
import HotelCataratasImg from '../imgs/hoteis/hotel-cataratas.webp';
import TransamericaComandatubaImg from '../imgs/hoteis/transmerica-comandatuba.jpg';
import PedrasPatachoImg from '../imgs/hoteis/pedras-patacho.jpg';
import NannaiMuroImg from '../imgs/hoteis/nannai-muro.jpg';

function ListaHoteis() {
  const [hoteis, setHoteis] = useState([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');
  const [showFavorites, setShowFavorites] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
  };

  useEffect(() => {
    const savedDarkMode = JSON.parse(localStorage.getItem('darkMode'));
    if (savedDarkMode) {
      setIsDarkMode(savedDarkMode);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  useEffect(() => {
    try {
      const dadosHoteis = JSON.parse(localStorage.getItem('hoteis'));

      if (!dadosHoteis) {
        const hoteisExemplo = [
          {
            nome: 'Pousada Arte da Natureza',
            classificacao: 4.0,
            cidade: 'Bonito',
            estado: 'MS',
            preco: 562,
            descricao: 'Uma pousada que proporciona contato com a natureza e conforto.',
            descricaoCompleta: 'A pousada em Bonito, a bonita pousada: localizada no coração de Bonito/MS, a Pousada Arte da Natureza surgiu com o objetivo de integrar modernidade, conforto e práticas ecologicamente corretas, proporcionando ao hóspede experiências marcantes de puro lazer e tranquilidade, regidas por toda a beleza e recursos naturais da região. A pousada oferece uma infraestrutura com três piscinas externas maravilhosas, incluindo a maior lateral de vidro da América do Sul, além de uma piscina coberta aquecida, seis hidromassagens externas, cachoeira artificial e cortina d’água.',
            imagensAdicionais: ['../imgs/detalhes/pousadaarte/1.jpeg', '../imgs/detalhes/pousadaarte/2.jpg'],
            servicos: [
              'Nova decoração do quarto eco classe mundial',
              'Vista especial para a piscina, spa e bar',
              'Chuveiro com energia solar',
              'Cama Box',
              'SMART TV 43″',
              'Ar Condicionado Split',
              'Frigobar',
              'Cofre com código programável',
              'Internet Wi-Fi',
            ],
            favorito: false,
            imagem: PousadaArteImg,
          },
          {
            nome: 'Carmel Cumbuco Resort',
            classificacao: 5.0,
            cidade: 'Caucaia',
            estado: 'CE',
            preco: 887,
            descricao: 'Resort sofisticado à beira-mar, com excelente infraestrutura.',
            descricaoCompleta: 'O Carmel Cumbuco Resort surge com a promessa de fazer você se sentir em casa, proporcionando um ambiente sofisticado em que o sentimento de liberdade se faz presente com os pés na areia e a brisa no rosto. O resort oferece um SPA de luxo, piscinas térmicas, jacuzzis, sauna seca e a vapor, além de uma completa infraestrutura para relaxamento e lazer.',
            imagensAdicionais: ['../imgs/detalhes/carmel/1.jpeg', '../imgs/detalhes/carmel/2.jpg'],
            servicos: [
              'Berço disponível a pedido',
              'Quartos para Deficientes',
              'Lavanderia/ Limpeza a seco',
              'Serviço de limpeza diário',
              'Wifi gratuito',
            ],
            favorito: false,
            imagem: CarmelResortImg,
          },
          {
            nome: 'Belmond Hotel das Cataratas',
            classificacao: 5.0,
            cidade: 'Foz do Iguaçu',
            estado: 'PR',
            preco: 3663,
            descricao: 'Luxuoso hotel localizado dentro do Parque Nacional do Iguaçu.',
            descricaoCompleta: 'Em nosso icônico retiro com paredes rosa, aconchegue-se em uma das mais belas maravilhas da natureza e reacenda seu espírito aventureiro. Admire o pôr do sol com uma caipirinha antes de um autêntico churrasco brasileiro, ou relaxe na piscina externa aquecida, protegida pela floresta tropical exuberante.',
            imagensAdicionais: ['../imgs/detalhes/belmond/1.jpg', '../imgs/detalhes/belmond/2.jpg'],
            servicos: [
              'Acomodação de luxo',
              'Café da manhã brasileiro diário',
              'Cama king size',
              'Artigos de higiene pessoal de luxo',
              'Mini bar com itens personalizados',
            ],
            favorito: false,
            imagem: HotelCataratasImg,
          },
          {
            nome: 'Transamerica Comandatuba',
            classificacao: 4.0,
            cidade: 'Una',
            estado: 'BA',
            preco: 1848,
            descricao: 'Resort isolado e exclusivo em uma ilha paradisíaca.',
            descricaoCompleta: 'O Transamerica Comandatuba é o destino ideal para quem busca uma experiência de resort all inclusive em um ambiente exclusivo e repleto de atividades. O resort oferece uma infraestrutura completa com piscinas, quadras esportivas, spa e acesso direto à praia.',
            imagensAdicionais: ['../imgs/detalhes/transamerica/1.jpg', '../imgs/detalhes/transamerica/2.jpg'],
            servicos: [
              'Lavabo na sala',
              'Frigobar',
              'TVs Samsung 4k de 50 Polegadas',
              'Cofre eletrônico digital',
              'Ar condicionado central',
            ],
            favorito: false,
            imagem: TransamericaComandatubaImg,
          },
          {
            nome: 'Pedras do Patacho',
            classificacao: 3.0,
            cidade: 'Porto de Pedras',
            estado: 'AL',
            preco: 1225,
            descricao: 'Hotel rústico-chique, perfeito para relaxar em praias tranquilas.',
            descricaoCompleta: 'Localizado nas areias brancas da Praia de Muro Alto, o Nannai Resort & Spa fornece diversas atividades para relaxamento e lazer. Você pode desfrutar de piscinas ao ar livre, spa e sauna, além de chalés com piscina privativa.',
            imagensAdicionais: ['../imgs/detalhes/patacho/1.jpg', '../imgs/detalhes/patacho/2.jpg'],
            servicos: [
              'Ar condicionado',
              'Wi-fi',
              'Máquina de café expresso',
              'Hidromassagem aquecida',
              'Amenidades l’occitane',
            ],
            favorito: false,
            imagem: PedrasPatachoImg,
          },
          {
            nome: 'Nannai Muro Alto',
            classificacao: 2.0,
            cidade: 'Ipojuca',
            estado: 'PE',
            preco: 433,
            descricao: 'Resort de luxo à beira-mar, com bangalôs e uma grande piscina.',
            descricaoCompleta: 'O Nannai Resort & Spa oferece uma vasta gama de atividades para relaxamento e lazer. Com bangalôs e uma grande piscina à beira-mar, o resort é ideal para quem busca tranquilidade em um ambiente paradisíaco.',
            imagensAdicionais: ['../imgs/detalhes/nannai/1.webp', '../imgs/detalhes/nannai/2.jpg'],
            servicos: [
              'Academia de ginástica gratuita',
              'Acesso direto à praia',
              'Bar de Piscina',
              'Recepção 24 horas',
              'SPA',
            ],
            favorito: false,
            imagem: NannaiMuroImg,
          },
        ];
        localStorage.setItem('hoteis', JSON.stringify(hoteisExemplo));
        setHoteis(hoteisExemplo);
      } else {
        const hoteisConvertidos = dadosHoteis.map(hotel => ({
          ...hotel,
          classificacao: parseFloat(hotel.classificacao),
          preco: parseFloat(hotel.preco),
        }));
        setHoteis(hoteisConvertidos);
      }
    } catch (error) {
      setMessage(`Erro ao carregar os hotéis: ${error.message}`);
      setMessageType('error');
    }
  }, []);

  const handleDelete = (index) => {
    try {
      const confirmacao = window.confirm('Tem certeza que deseja deletar este hotel?');
      if (confirmacao) {
        const novosHoteis = hoteis.filter((_, i) => i !== index);
        localStorage.setItem('hoteis', JSON.stringify(novosHoteis));
        setHoteis(novosHoteis);
        setMessage('Hotel deletado com sucesso!');
        setMessageType('success');
      }
    } catch (error) {
      setMessage(`Erro ao deletar o hotel: ${error.message}`);
      setMessageType('error');
    }
  };

  const handleToggleFavorite = (index) => {
    const novosHoteis = [...hoteis];
    novosHoteis[index].favorito = !novosHoteis[index].favorito;
    localStorage.setItem('hoteis', JSON.stringify(novosHoteis));
    setHoteis(novosHoteis);
  };

  const handleSort = (option) => {
    setSortOption(option);
  };

  const filteredAndSortedHoteis = hoteis
    .filter((hotel) =>
      hotel.nome.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === 'preco-asc') {
        return a.preco - b.preco;
      } else if (sortOption === 'preco-desc') {
        return b.preco - a.preco;
      } else if (sortOption === 'classificacao-asc') {
        return a.classificacao - b.classificacao;
      } else if (sortOption === 'classificacao-desc') {
        return b.classificacao - a.classificacao;
      }
      return 0;
    });

  const filteredHoteis = showFavorites
    ? filteredAndSortedHoteis.filter((hotel) => hotel.favorito)
    : filteredAndSortedHoteis;

  return (
    <div className={`container ${isDarkMode ? 'dark-mode' : ''}`}>
      <Header showFavorites={showFavorites} setShowFavorites={setShowFavorites} />
      <FlashMessage message={message} type={messageType} setMessage={setMessage} />

      <div className="search-and-sort">
        <input
          type="text"
          placeholder="Pesquisar hotel por nome..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select
          value={sortOption}
          onChange={(e) => handleSort(e.target.value)}
          className="sort-select"
        >
          <option value="">Ordenar por...</option>
          <option value="preco-asc">Preço: Menor para Maior</option>
          <option value="preco-desc">Preço: Maior para Menor</option>
          <option value="classificacao-asc">Classificação: Menor para Maior</option>
          <option value="classificacao-desc">Classificação: Maior para Menor</option>
        </select>
      </div>

      <div className="lista-hoteis">
        {filteredHoteis.map((hotel, index) => (
          <CardHotel
            key={index}
            hotel={hotel}
            index={index}
            onDelete={handleDelete}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </div>

      <button className="theme-toggle-btn" onClick={toggleDarkMode}>
        {isDarkMode ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-sun" width="24" height="24">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-moon" width="24" height="24">
            <path d="M21 12.79A9 9 0 1111.21 3 7.5 7.5 0 0021 12.79z"></path>
          </svg>
        )}
      </button>
    </div>
  );
}

export default ListaHoteis;
