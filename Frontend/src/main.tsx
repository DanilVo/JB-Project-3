import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import Layout from './Components/LayoutArea/Layout/Layout';
import './index.css';
import Home from './Components/HomeArea/Home/Home';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <Home />
  </HashRouter>
);
