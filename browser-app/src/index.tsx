import ReactDOM from 'react-dom/client';
import App from './pages/App';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Router>
    <App />
  </Router>
);
