import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Spinner from './Spinner';

const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;
const Random = () => {
  const[gif,setGif] = useState('');
  const[loading,setLoading] = useState('false');

async function fetchData() {
    setLoading(true)
    const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`;
    const {data} = await axios.get(url);
    const imageSource = data.data.images.downsized_large.url;
    setGif(imageSource);
    setLoading(false)
  }
  useEffect( () =>{
    fetchData();
  },[])

  function clickHandler(){
    fetchData();

  }

  return (
    <div className='w-1/2 bg-green-500 rounded-lg border border-black flex flex-col items-center gap-y-5 mt-[15px]'>
      <h1 className='text-3xl underline font-bold mt-6'>Random Gif</h1>
      {
        loading ? (<Spinner />): ( <img src={gif} width="450"  />)
      }
      <button onClick={clickHandler}
        className='w-9/12 bg-white text-lg py-2 rounded-lg mb-[15px] mt-[15px]'
      >
        Generate
      </button>
    </div>
  )
}

export default Random