import React, { useEffect, useState } from 'react';

// import { v4 as uuid4 } from 'uuid';
// eslint-disable-next-line import/no-cycle

import Button from 'components/elements/button/Button';
import InputGroup from 'components/elements/inputGroup/InputGroup';
import { observe, save, get } from 'services/firebase';
import Main from 'components/layouts/main/Main';

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

  const [errorInPerson, setErrorInPerson] = useState(false);
  const [errorInMsg, setErrorInMsg] = useState(false);

  useEffect(() => {
    // funkcja zaawansowana
    observe('messages/', setChatHistory);
    // const chatHistoryInit =
    //   JSON.parse(localStorage.getItem('chatHistory')) ?? [];
    // setChatHistory(chatHistoryInit);
    get('currentUser').then((user) => {
      console.log('User', user);
      if (user && user.name) {
        setInputPerson(user.name);
      }
    });
  }, []);

  const handleInputPersonChange = (event) => {
    const input = event.target.value;
    setInputPerson(input);
    setErrorInPerson(false);
  };

  const handleInputMsgChange = (event) => {
    const input = event.target.value;
    setInputMsg(input);
    setErrorInMsg(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (inputMsg.length === 0) {
      setErrorInMsg(true);
      return;
    }

    if (inputPerson.length === 0) {
      setErrorInPerson(true);
      return;
    }
    // const newMessageId = Date.now();

    // set(ref(database, `/${newMessageId}`), {
    //   id: newMessageId,
    //   person: inputPerson,
    //   message: inputMsg,
    // });

    save('messages/', {
      person: inputPerson,
      message: inputMsg,
    });

    setInputPerson('');
    setInputMsg('');

    // const lastChatHistory = [...chatHistory, newMessage];
    // setChatHistory(lastChatHistory);

    // localStorage.setItem('chatHistory', JSON.stringify(lastChatHistory));
  };

  return (
    <Main>
      <div className={styles.wrapper}>
        <h1>Chat to chat</h1>
        <div className={styles.chatBox}>
          <Chat history={chatHistory} />
        </div>

        <div className={styles.chatForm}>
          <form className={styles.chatForm} onSubmit={handleSubmit}>
            <div>
              <InputGroup
                inputId="inputPerson"
                type="text"
                label="Person"
                handleInputChange={handleInputPersonChange}
                inputValue={inputPerson}
                errorInInput={errorInPerson}
              />
              <InputGroup
                inputId="inputMsg"
                type="text"
                label="Message"
                handleInputChange={handleInputMsgChange}
                inputValue={inputMsg}
                errorInInput={errorInMsg}
              />
              {/* Send Msg jest typu children */}
              <Button type="submit">
                <i>&#9728;</i>
                Send Msg
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Main>
  );
}

export default App;
