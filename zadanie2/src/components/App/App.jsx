import React, { useEffect, useState } from 'react';
import Chat from '../Chat/Chat';

import styles from './App.module.css';

// Twoim zadaniem jest napisanie aplikacji typu chat, skladajacej sie z 2 komponentow: App i Chat.

// App jest to rodzic, ktory ma w sobie komponent chat.
// App renderuje formularz, ktory ma 2 pola: person i message

// Dane niech sie zapisuja do localStorage

// Po wypelnieniu formularza, niech dane dopisza sie do chatu (przekaz to przez propsy)

// Zrob walidacje, ze pole person nie moze byc puste
// Zrob walidacje, ze pole message nie moze byc puste

// Postaraj sie to zadanie ostylowac
// mniej wiecej https://www.chip.pl/wp-content/uploads/2008/11/4e8ac7a1d3587e40c02c2333c9e1365e.jpg

function App() {
  const [inputPerson, setInputPerson] = useState('');
  const [inputMsg, setInputMsg] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    const chatHistoryInit =
      JSON.parse(localStorage.getItem('chatHistory')) ?? [];
    setChatHistory(chatHistoryInit);
  }, []);

  const handleInputPersonChange = (event) => {
    const input = event.target.value;
    setInputPerson(input);
  };

  const handleInputMsgChange = (event) => {
    const input = event.target.value;
    setInputMsg(input);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const lastChatHistory = [
      ...chatHistory,
      {
        person: inputPerson,
        message: inputMsg,
      },
    ];
    setChatHistory(lastChatHistory);

    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
  };

  return (
    <div className={styles.mainBox}>
      <h1>Chat to chat</h1>
      <Chat history={chatHistory} />
      <div className={styles.chatForm}>
        <form className={styles.chatForm} onSubmit={handleSubmit}>
          <label htmlFor="inputPerson" className={styles.chatInput}>
            Person
            <input
              type="text"
              id="inputPerson"
              value={inputPerson}
              onChange={handleInputPersonChange}
            />
          </label>
          <label htmlFor="inputMsg">
            Message
            <textarea
              id="inputMsg"
              value={inputMsg}
              onChange={handleInputMsgChange}
            />
          </label>

          <button type="submit">Send Msg</button>
        </form>
      </div>
    </div>
  );
}

export default App;
