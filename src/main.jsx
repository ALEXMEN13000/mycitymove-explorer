import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/clubcenter">
      <App />
    </BrowserRouter>
  </React.StrictMode>,
) 