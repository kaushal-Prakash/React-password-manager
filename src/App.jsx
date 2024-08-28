import { useState,useCallback,useEffect,useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [pass, setPass] = useState("");

  const passGen = useCallback(() => {
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*(){}[]~`"; 

    for (let i = 1; i <=length; i++){
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPass(pass);

  }, [length,numAllowed,charAllowed,setPass]);

  useEffect(()=> {
    passGen();
  }
  , [length,numAllowed,charAllowed,setPass]);

  //useRef hook
  const passRef = useRef(null);

  const copyPass = useCallback(() => {
    passRef.current?.select();
    window.navigator.clipboard.writeText(pass);  
  }, [pass])
  
  return (
    <>
      <div className='w-full max-w-lg mx-auto shadow-md bg-gray-600
      my-20 rounded-md p-4
      '>
        <h1 className='text-2xl font-semibold
        w-full text-center text-slate-200'>Password Generator</h1>
        <div className='w-full h-max px-3 py-5 rounded-lg flex gap-2'>
          <input className='pass-input h-12 w-full outline-none rounded-md 
            shadow-lg p-2 text-xl
            font-semibold text-slate-500' 
            readOnly 
            placeholder='Password'
            value={pass}
            ref={passRef}
            ></input>
            <button className='center w-32 shadow-md mx-auto p-2
             shrink-0 text-white font-semibold text-xl rounded-md
              bg-blue-600'
              onClick={copyPass}
              >Copy</button>

        </div>      
        <div className='flex gap-2 items-center'>
          <input type="range"
          id='length-range'
          className='cursor-pointer'
          value={length}
          min={8}
          max={22}
          onChange={(e) => setLength(e.target.value)}
          />
         <label className='text-lg text-red-500' htmlFor='length-range'>Length : {length}</label>
         <input type="checkbox"
          className='size-4 cursor-pointer ml-2'
          defaultChecked={numAllowed}
          id='num-input'
          onChange={() => {setNumAllowed((prev) => !prev)}}
          />
          <label className='text-lg text-red-500' htmlFor='num-input'>Numbers</label>
          <input type="checkbox"
          className='size-4 cursor-pointer ml-2'
          defaultChecked={charAllowed}
          id='char-input'
          onChange={() => {setCharAllowed((prev) => !prev)}}
          />
          <label className='text-lg text-red-500' htmlFor='char-input'>Characters</label>
        </div>
      </div>
    </>
  )
}

export default App
