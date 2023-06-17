import axios from 'axios';
import { useState } from 'react';
import { Input, Select, Button } from 'antd';
import Header from './components/header/header';
import { languages } from './languages/index';
import './App.css';

function App() {
  const { TextArea } = Input;
  const [language, setLanguage] = useState('Select language to translate');
  const [newCode, setNewCode] = useState('Select language for translation');
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const handleTranslate = async () => {
    try {
      const response = await axios.get(
        `https://api.mymemory.translated.net/get?q=${inputText}&langpair=en|${newCode}`
      );
      setTranslatedText(response.data.responseData.translatedText);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <div className="App">
        <div className="card">
          <div className="main-section">
            <div className="input-section">
              <label htmlFor="language">Write Text</label>
              <TextArea rows={8} onChange={(e) => setInputText(e.target.value)} /><br></br>
              <Select
                showSearch='true'
                name="language"
                onChange={(value) => setLanguage(value)}
                value={language}
              >
                {Object.entries(languages).map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </Select>
            </div>
            <div className="result-section">
              <label htmlFor="language">Result</label>
              <TextArea rows={8} value={translatedText} readOnly />
              <Select
                showSearch='true'
                className='select'
                name="language"
                onChange={(value) => setNewCode(value)}
                value={newCode}
              >
                {Object.entries(languages).map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </Select>
            </div>
            <div className="button-section">
              <Button className='btn' onClick={handleTranslate}>Translate</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
