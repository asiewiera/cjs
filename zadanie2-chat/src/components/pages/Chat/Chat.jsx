/* eslint-disable react/prop-types */
import React from 'react';
import styles from './Chat.module.css';

function Chat({ history }) {
  if (!Array.isArray(history) || history.length === 0) return null;
  // console.log(history);
  return (
    <div className={styles.chat}>
      <ul>
        {history.map((singleChat, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>
            <p>
              <snap className={styles.chatPerson}>{singleChat.person}</snap> :{' '}
              <snap className={styles.chatMessage}>{singleChat.message}</snap>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Chat.propTypes = {
//   history: propTypes.arrayOf(Object),
// };

// Chat.defaultProps = {
//   history: [],
// };

export default Chat;
