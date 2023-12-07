// ___________ Helper ___________ //
import './assets/css/main.css';
import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ___________ Components ___________ //
import Layout from './src/static/Layout/Layout';
import Home from './src/main/Home/Home';
import ArticleDetailPage from './src/main/ArticleDetailPage/ArticleDetailPage';

const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="article/:id"  element={<ArticleDetailPage />} />
      </Route>
    </Routes>
      <ToastContainer position="top-right" pauseOnHover newestOnTop autoClose={3000} />
      </>
  );
}

export default App;
