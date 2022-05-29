
import { useState } from 'react';
import { useRouter } from 'next/router'

import Head from 'next/head'
import Main from '@/components/layouts/main'

import texts from '@/consts/translations'




export default function Home() {

  const router = useRouter();

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event)=>{
    
    setInputValue(event.target.value)
  }
  console.log(inputValue);
  

  const handleButtonClick=(event)=>{
    event.preventDefault();

    if (inputValue.length < 3) {return alert('Error occured: field empty') }
    router.push(`/results/${inputValue}`)
}

  return (
    <div>
    
    <Main>
    <Head>
      <title>index page</title>
    </Head>
      <div className="border-2 border-gray-500 p-2">
        <input className='w-full border-2 border-gray-500 p-2 rounded '
        type="text" 
        placeholder='Search' 
        value={inputValue}
        onChange={handleInputChange}
        />

    
        <button className='rounded bg-red-800 w-full my-3 border-2 text-white ' type='button' onClick={handleButtonClick}>Send</button>
      </div>
      
    </Main>

    </div>
  )
}


export async function getStaticProps() {
  const title = texts.title;
  return {
    props: {
      title: {title}
    }
  }
}
