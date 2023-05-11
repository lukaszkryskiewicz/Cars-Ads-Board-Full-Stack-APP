import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/views/Header/Header'
import Footer from './components/views/Footer/Footer'

// import routes
import Ad from './components/pages/Ad/Ad';
import Home from './components/pages/Home/Home';
import NotFound from './components/pages/NotFound/NotFound'
import AdAdd from './components/pages/AdAdd/AdAdd';
import AdEdit from './components/pages/AdEdit/AdEdit';
import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';
import Search from './components/pages/Search/Search'
import Logout from './components/pages/LogOut/LogOut';
import { loadAdsRequest } from './redux/adsRedux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { checkLogedUser } from './redux/usersRedux';



const App = () => {
  const dispatch = useDispatch();

  useEffect(() => { dispatch(loadAdsRequest()) }, [dispatch]);
  useEffect(() => { dispatch(checkLogedUser()) }, [dispatch]);

  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ad/:id" element={<Ad />} />
        <Route path="/ad/add" element={<AdAdd />} />
        <Route path="/ad/edit/:id" element={<AdEdit />} />
        <Route path="/search/:searchPhrase" element={<Search />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Container>
  )
};

export default App;
