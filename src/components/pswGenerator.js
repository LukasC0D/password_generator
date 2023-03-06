import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer } from "react-toastify"
import { COPY_SUCCESS } from './message';
import { numbers, upperCaseLetters, lowerCaseLetters, specialCharacters } from './Characters';
const PswGenerator = () => {

  const [previousPassword, setPreviousPassword] = useState([])

  const [password, setPassword] = useState('')
  const [passwordLength, setPasswordLength] = useState(20)
  const [includeUpperCase, setIncludeUpperCase] = useState(false)
  const [includeLowerCase, setIncludeLowerCase] = useState(false)
  const [includeNumbers, setIncludeNumbers] = useState(false)
  const [includeSymbols, setIncludeSymbols] = useState(false)

  const handleGeneratePassword = (e) => {

    if (
      !includeLowerCase &&
      !includeUpperCase &&
      !includeNumbers &&
      !includeSymbols) {
      notify('You must select at least one option', true)
    }

    let characterList = ''

    if (includeLowerCase) {
      characterList += lowerCaseLetters
    }

    if (includeUpperCase) {
      characterList += upperCaseLetters
    }

    if (includeNumbers) {
      characterList += numbers
    }

    if (includeSymbols) {
      characterList += specialCharacters
    }
    setPassword(createPassword(characterList))
  }

  const createPassword = (characterList) => {
    let password = ''
    const characterListLength = characterList.length

    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength)
      password = password + characterList.charAt(characterIndex)
    }
    if (password !== '')
      setPreviousPassword([...previousPassword, password])

    return password

  }

  const copyToClipboard = () => {
    const newTextArea = document.createElement('textarea')
    newTextArea.innerText = password
    document.body.appendChild(newTextArea)
    newTextArea.select()
    document.execCommand('copy')
    newTextArea.remove()
  }

  const notify = (message, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      toast('🦄' + " " + message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }
  const handleCopyPassword = (e) => {
    if (password === '') {
      notify('the blank is empty')
    } else {
      copyToClipboard()
      notify(COPY_SUCCESS)
      console.log(handleCopyPassword)
    }
  }

  useEffect(() => {
    const retrievedItems = localStorage.getItem("password");
    if (!retrievedItems) localStorage.setItem("password", JSON.stringify(previousPassword));
    setPreviousPassword(JSON.parse(retrievedItems));
  }, []);

  useEffect(() => { localStorage.setItem('password', JSON.stringify(previousPassword)) }, [previousPassword])

  return (
    <div>
      <div className='box'>
        <div className='generator'>
          <h2 className='genHeader'>
            Password Generator
          </h2>
          <div className='genPassword'>
            <h3>{password}</h3>
            <button onClick={handleCopyPassword} className='copyBtn'>
              <i class="bi bi-clipboard"></i>
            </button>
          </div>
          <div className='form-group'>
            <label htmlFor='password-strength'>Password length</label>
            <input
              defaultValue={passwordLength}
              onChange={(e) => setPasswordLength(e.target.value)}
              type="number"
              id='password-strength'
              name='password-strength'
              max="20"
              min="10" />
          </div>
          <div className='form-group'>
            <label htmlFor='uppercase-letters'>Include Uppercase Letters</label>
            <input
              checked={includeUpperCase}
              onChange={(e) => setIncludeUpperCase(e.target.checked)}
              type="checkbox"
              id='uppercase-letters'
              name='uppercase-letters'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='lowercase-letters'>Include Lowercase Letters</label>
            <input
              checked={includeLowerCase}
              onChange={(e) => setIncludeLowerCase(e.target.checked)}
              type="checkbox"
              id='lowercase-letters'
              name='lowercase-letters'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='include-numbers'>Include Numbers</label>
            <input
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              type="checkbox"
              id='include-numbers'
              name='include-numbers'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='include-symbols'>Include Symbols</label>
            <input
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              type="checkbox"
              id='include-symbols'
              name='include-symbols'
            />
          </div>

          <button
            onClick={handleGeneratePassword}
            className='generatorBtn'>
            Generate Password
          </button>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
        <div className="text-center container pt-4 text-white">
          <h4>ankstesni slaptažodžiai (previous passwords)</h4>
          {previousPassword.map((value, index) => <div key={index}>{value}</div>)}
        </div>
      </div>
    </div>

  )
}

export default PswGenerator;