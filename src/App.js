import React, { useState } from 'react'
import InvalidBox from './InvalidBox'
import SingleColor from './SingleColor'
import Values from 'values.js'
import Footer from './Footer';

function App() {
  // State values
  const [color, setColor] = useState([]);
  const [error, setError] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [errorShow, setErrorShow] = useState(false);
  const [dropdown, setDropdown] = useState(10);

  //default value to display on the screen
  const [list, setList] = useState(new Values('#3d6aa7').all(10));

  // https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      //Getting "Values" from the external library
      console.log("handleSubmit: dropdown: ", typeof dropdown)
      let colors = null
      colors = new Values(color).all(parseInt(dropdown))
      //We get an array of 20 different colors with the base color, tints and shades
      setList(colors)
      console.log("handleSubmit: colors: ", colors)
    } catch (error) {
      setErrorShow(true)
      setErrorMsg("Please enter a valid HEX code")
      setTimeout(() => setErrorShow(false), 3000)
      setError(true)
      console.log("Invalid hex code")
    }

  }

  // Created a new function for the dropdown values - on clicking the different dropdown options - we will be dividing the initial color into tints and shades based on the dropdown number
  const handleSelect = (event) => {
    console.log(event.target.value)
    setDropdown(event.target.value)
  }

  return (
    <>
      <section className='container'>
        <h2>Hue Express</h2>
        <p>Discover endless colors at your fingertips: Try Hue Express, your ultimate color generator! 🎨 Optionally, select color intervals from the dropdown to diversify your palette from the initial color. ⬇️</p>
        <div>
          <input
            type="text"
            value={color}
            onChange={(event) => setColor(event.target.value)}
            placeholder='#3d6aa7'
            // checking state value for error - if true then classname will be error
            className={`${error ? 'error' : null}`}
          />
          <select className="dropdown" onChange={handleSelect} value={dropdown}>
            <option value="1">1</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
          </select>
        </div>
        <button className='btn' onClick={handleSubmit}>
          Generate
        </button>
        {errorShow && <InvalidBox msg={errorMsg} />}
      </section>
      <section className='colors'>
        {/* Object spread operator to get all the properties */}
        {list.map((color, index) => {
          return (
            <SingleColor
              key={index}
              {...color}
              index={index}
              hexColor={color.hex}
            />
          )
        })}
        
      </section>
      <Footer />
    </>
  )
}

export default App


