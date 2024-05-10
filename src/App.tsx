import logoIcon from '@/assets/icons/logo.svg?url'
import LogoIcon from '@/assets/icons/logo.svg'

import './App.css';

const App = () =>{
  return (
    <div className="App">
      <header className="App-header">
        <img src={logoIcon} className="App-logo" alt="logo" />
        <LogoIcon className="App-logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App
