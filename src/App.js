import React, { useCallback, useEffect, useRef, useState } from 'react'

const App = () => {
  const [length,setLength] = useState(8);
  const [numAllowed,setNumAllowed] = useState(false);
  const [charAllowed,setCharAllowed] = useState(false);
  const [password,setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGeneretor = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numAllowed) str+="0123456789";
    if(charAllowed) str+="!@#$%^&*()";

    for(let i=0;i<length;i++){
        let charInd = Math.floor(Math.random() * str.length+1);
        pass+=str.charAt(charInd);
        setPassword(pass);
    }
  },[length,numAllowed,charAllowed])

  const copyPasswordtoClipboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,101);
    window.navigator.clipboard.writeText(password);
  },[password])

  useEffect(()=>{
    passwordGeneretor();
  },[length,charAllowed,numAllowed,passwordGeneretor])

  return (
    <div className='w-full max-w-md mx-auto sadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
     <h1 className='text-white text-center my-3'> Password Generetor</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
        type='text'
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='Password'
        readOnly
        ref={passwordRef}
        />
        <button onClick = {copyPasswordtoClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type='range'
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type='checkbox'
          defaultChecked={numAllowed}
          id='numberInput'
          onChange={()=>{setNumAllowed((prev)=>!prev)}}
          />
          <label>Number</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
           type='checkbox'
           defaultChecked={charAllowed}
           id='charInput'
           onChange={()=>{setCharAllowed((prev)=>!prev)}}
          />
          <label>Character</label>
        </div>
      </div>
    </div>
  )
}

export default App
