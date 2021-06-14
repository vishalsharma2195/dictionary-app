import React, { useState, useEffect, useRef } from "react";

function Content() {
  const [words, setWords] = useState([]);
  const [example, setExample] = useState([]);
  const [count, setCount] = useState(0);
  const [input, setInput] = useState("");
  const [buttonClick, setButtonClick] = useState("");
  const containerRef = useRef(null)

  useEffect(() => {
    if (buttonClick !== "") {
      fetch(
        `https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=${buttonClick}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key":
              "cc0e3f1597msh8e9eba028b145dap1fea0cjsnd0f95a437c66",
            "x-rapidapi-host":
              "mashape-community-urban-dictionary.p.rapidapi.com",
          },
        }
      )
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
    <form className="form-class">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <br />
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
      <div className="container" ref={containerRef}>
        <div className="meaning">
          <h2>Meaning</h2>
          <ul>{<li>{words}</li>}</ul>
        </div>
        <div className="example">
          <h2>Example</h2>
          <ul>{<li>{example}</li>}</ul>
        </div>
      </div>
    </form>
  );
}

export default Content;
