import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Spinner from './Spinner';

const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;
const Tag = () => {
  const[tag,setTag] = useState('')
  const[gif,setGif] = useState('');
  const[loading,setLoading] = useState('false');

async function fetchData() {
    setLoading(true)
    const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${tag}`;
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

  function changeHandler(event) {
    setTag(event.target.value);

  }

  return (
    <div className='w-1/2 bg-blue-500 rounded-lg border border-black flex flex-col items-center gap-y-5 mt-[15px]'>
      <h1 className='text-3xl font-bold mt-6'>Random {tag} Gif</h1>
      {
        loading ? (<Spinner />): ( <img src={gif} width="450"  />)
      }

        <input type="text" className='w-10/12 text-lg py-2 rounded-lg mb-[3px] text-center'
        onChange={changeHandler}
        value={tag}/>


      <button onClick={clickHandler}
        className='w-9/12 bg-white text-lg py-2 rounded-lg mb-[15px] mt-[15px]'
      >
        Generate
      </button>
    </div>
  )
}

export default Tag