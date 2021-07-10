import React, { useState, useEffect, useRef } from "react";
import "./Content.css";

function Content() {
  const [words, setWords] = useState([]);
  const [example, setExample] = useState([]);
  const [count, setCount] = useState(0);
  const [input, setInput] = useState("");
  const [buttonClick, setButtonClick] = useState("");
  const containerRef = useRef(null)

  useEffect(() => {
    if (buttonClick !== "") {
      fetch('Enter API key')
      
        .then((response) => response.json())
        .then((data) => {
          console.log(data.list[count].definition);
          setWords(data.list[count].definition);
          setExample(data.list[count].example);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [count, buttonClick]);
  const handleClick = () => {
    setButtonClick(input);
    setTimeout(() => {
        containerRef.current.classList.add('showContainer')
    }, 2000);
  };
  return (
    <div className="content">
      <div className="content-head">
        <h1>Dictionary</h1>
      </div>
      <form className="form-class">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <br />
      <div className="button-grp">
      <button type="button" id="search-btn" onClick={handleClick}>
        Search
      </button>
      <button
        type="button"
        id="next-btn"
        onClick={() =>
          setCount(count < 9 ? (prevCount) => prevCount + 1 : count)
        }
      >
        Next
      </button>
      <button
        type="button"
        id="prev-btn"
        onClick={() => setCount((prevCount) => prevCount - 1)}
      >
        Previous
      </button>
      </div>
      
      <div className="container" ref={containerRef}>
        <div className="meaning left">
          <h2>Meaning</h2>
          <ul>{<li>{words}</li>}</ul>
        </div>
        <div className="example right">
          <h2>Example</h2>
          <ul>{<li>{example}</li>}</ul>
        </div>
      </div>
    </form>
    </div>
    );
}

export default Content;
