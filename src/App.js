import logo from './logo.svg';
import './App.css';
import DocumentList from './components/Textbox';
import UploadButton from './components/upload';
function App() {
  return (
    <div className="App">
      <header className="App-header">
      <div>
          <UploadButton />
        </div>
        <br/>
        <br/>
        <div>
        <DocumentList/>
        </div>
        
        
         
      </header>
    </div>
  );
}

export default App;
