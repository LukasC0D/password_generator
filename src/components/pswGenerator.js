import React, { useState } from 'react';

const pswGenerator = () => {


  return (
    <div className='App'>
      <div className='container'>
        <div className='generator'>
          <h2 className='genHeader'>
            Password Generator
          </h2>
          <div className='genPassword'>
            <h3>Password</h3>
            <button className='copyBtn'>
            <i class="bi bi-clipboard"></i>
            </button>
          </div>
          <div className='form-group'>
            <label htmlFor='password-strength'>Password Strength</label>
            <input 
             type="number"
             id='password-strength' 
             name='password-strength' 
             max="20" 
             min="10"/>
          </div> 
          <div className='form-group'>
            <label htmlFor='uppercase-letters'>Include Uppercase Letters</label>
            <input 
             type="checkbox"
             id='uppercase-letters' 
             name='uppercase-letters' 
             />
          </div>
          <div className='form-group'>
            <label htmlFor='lowercase-letters'>Include Lowercase Letters</label>
            <input  
             type="checkbox"
             id='lowercase-letters' 
             name='lowercase-letters' 
             />
          </div>
          <div className='form-group'>
            <label htmlFor='include-numbers'>Include Numbers</label>
            <input  
             type="checkbox"
             id='include-numbers' 
             name='include-numbers' 
             />
          </div> 
          <div className='form-group'>
            <label htmlFor='include-symbols'>Include Symbols</label>
            <input  
             type="checkbox"
             id='include-symbols' 
             name='include-symbols' 
             />
          </div> 
          <div className='generatorBtn'>
            <button>Generate Password</button>
          </div>
        </div>
      </div>
    </div>

  )
}

export default pswGenerator;