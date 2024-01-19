import React, { useState } from 'react'
import InvalidBox from './InvalidBox'
import SingleColor from './SingleColor'

import Values from 'values.js'

function App() {
  // State values
  const [color, setColor] = useState([]);
  const [error, setError] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [errorShow, setErrorShow] = useState(false);

  //default value to display on the screen
  const [list, setList] = useState(new Values('#3d6aa7').all(10));

  // https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      //Getting "Values" from the external library
      let colors = new Values(color).all(10)
      //We get an array of 20 different colors with the base color, tints and shades
      setList(colors)
      console.log(colors)
    } catch (error) {
      setErrorShow(true)
      setErrorMsg("Please enter a valid HEX code")
      setTimeout(() => setErrorShow(false), 3000)
      setError(true)
      console.log("Invalid hex code")
    }

  }
  return (
    <>
      <section className='container'>
        <h2>Hue Express</h2>
        {errorShow && <InvalidBox msg={errorMsg} />}
        <form>
          <input
            type="text"
            value={color}
            onChange={(event) => setColor(event.target.value)}
            placeholder='#3d6aa7'
            // checking state value for error - if true then classname will be error
            className={`${error ? 'error' : null}`}
          />
          
        </form>
        <button className='btn' onClick={handleSubmit}>
          Generate
        </button> 
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
    </>
  )
}

export default App


