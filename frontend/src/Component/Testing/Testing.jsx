import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';

function Testing() {
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const handleEmojiClick = (event, emojiObject) => {
    event.preventDefault();
    setChosenEmoji(emojiObject);
    setInputValue(inputValue + emojiObject.emoji);
  };

  return (
    <div>
      <form>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          onClick={() => {
            if (!chosenEmoji) {
              alert('Please select an emoji first.');
              return;
            }
            setInputValue(inputValue + chosenEmoji.emoji);
          }}
        >
          Add Emoji
        </button>
      </form>

      <EmojiPicker onEmojiClick={handleEmojiClick} />
    </div>
  );
}

export default Testing;
