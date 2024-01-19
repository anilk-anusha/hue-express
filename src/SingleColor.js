import React, { useState, useEffect } from 'react'
import rgbToHex from './utils'

// rgb is an array of the color values, weight is the percentages of the color
// Why considering rgb? The background of every cell in Single Color will be that rgb color itself

const SingleColor = ({ rgb, weight, index, hexColor }) => {
  console.log(hexColor)

  // setting up state values 
  const [alert, setAlert] = useState(false);

  //Turn the individual RGB into a string in order to make it the cell's background.
  const backgroundColor = rgb.join(',')

  //Converting RGB to HEX 
  const hexConverted = rgbToHex(...rgb)

  //Function for copy to clipboard functionality 
  function copyHex() {
    setAlert(true);
    navigator.clipboard.writeText(hexConverted)
  }

  // Using useEffect to set a timeout to clear the values
  useEffect(
    () => {
      const timeout = setTimeout(() => {
        setAlert(false)
      }, 2000)
      return ()=> clearTimeout(timeout)
    }, [alert])


  /*Changing the font color of the percentages and hex code at the basecolor or the 10th index position 
  -- because we get an array of 20(+1) items when "Values" is returned from the external library 
  -- In className - checking the index value and if it's greater than 10 then changing the color to light*/
  
  //adding inline style to add the bg color
  return <article className={`color ${index > 10 && 'color-light'}`}
    style={{ backgroundColor: `rgb(${backgroundColor})` }}
    onClick={copyHex}>
    {/* // Adding the percentage values -- weight is taken from array produced by the color
        // Adding the HEX code to the cells
    */}
    <p className='percent-value'>{weight}%</p>
    <p className='color-value'>{hexConverted}</p>
    {alert && <p className='alert'>Copied to Clipboard</p>}
  </article>
}

export default SingleColor

//Two ways of accessing HEX - use the function or use the value that the library provide
// Method 1: rgbToHex and use hexConverted
// Method 2: hexColor directly 


