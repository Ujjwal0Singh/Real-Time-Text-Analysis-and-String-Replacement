import React, { useState } from "react";
import './App.css';

function App() {
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");
  const [replace, setReplace] = useState("");
  const [highlightedText, setHighlightedText] = useState("");

  // Handle text change
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  // Unique word count
  const getUniqueWordCount = () => {
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const uniqueWords = new Set(words);
    return uniqueWords.size;
  };

  // Character count excluding spaces and punctuation
  const getCharCount = () => {
    const chars = text.replace(/[^\w]/g, ""); // \w matches letters, digits, and underscore
    return chars.length;
  };

  // Replace string function
  const handleReplaceAll = () => {
    const updatedText = text.split(search).join(replace);
    setText(updatedText);
    highlightReplacedText(updatedText);
  };

  // Highlight replaced words (optional feature)
  const highlightReplacedText = (updatedText) => {
    const regex = new RegExp(`(${replace})`, "gi");
    const newText = updatedText.replace(regex, "<mark>$1</mark>");
    setHighlightedText(newText);
  };

  return (
    <div className="App">
      <h1>Real-Time Text Analysis and String Replacement</h1>

      <textarea
        rows="10"
        cols="80"
        value={text}
        onChange={handleTextChange}
        placeholder="Type or paste your text here..."
      ></textarea>

      <div className="stats">
        <p>Unique Words: {getUniqueWordCount()}</p>
        <p>Character Count (Excluding Spaces & Punctuation): {getCharCount()}</p>
      </div>

      <div className="replacement">
        <input
          type="text"
          placeholder="Search string"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="text"
          placeholder="Replace with"
          value={replace}
          onChange={(e) => setReplace(e.target.value)}
        />
        <button onClick={handleReplaceAll}>Replace All</button>
      </div>

      <div className="highlightedText">
        <p dangerouslySetInnerHTML={{ __html: highlightedText }} />
      </div>
    </div>
  );
}

export default App;

