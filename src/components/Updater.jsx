// WeatherDetail.jsx
import React from 'react';
import { supabase } from '../client'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

const Updater = () => {
  // Retrieve the timestamp from the query parameter
  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get('id');
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    const parse = async () => {

      let { data, error } = await supabase
        .from('Posts')
        .select('*')
        .eq('id', id)

      if (error) {
        console.error('Error fetching data:', error)
      } else {
        console.log('Fetched data:', data)
        setTitle(data[0].title)
        setContent(data[0].content)
        setImage(data[0].image)
      }
    };
    parse();
  }, []); // Only does this on the initial render

  const handleSetTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleSetContent = (event) => {
    setContent(event.target.value);
  };

  const handleSetImage = (event) => {
    setImage(event.target.value);
  };

  const updateForm = async (event) => {
    console.log(title);
    console.log(content);
    event.preventDefault();

    await supabase
      .from('Posts')
      .update({ title: title, content: content, image: image })
      .eq('id', id)
      .select()

    navigate(
      `/gallery`
    )
  };

  return (
    <div className='Creator'>
      <h1>Update your Post</h1>
      <input
        type="text"
        placeholder="Enter the Post's Title"
        value={title}
        onChange={handleSetTitle}
        className="title"
      />
      <textarea
        type="text"
        placeholder="Enter the Post's Content"
        value={content}
        onChange={handleSetContent}
        className="postContent"
        wrap="soft"
      />
      <input
        type="text"
        placeholder="Enter the Post's Image Link"
        value={image}
        onChange={handleSetImage}
        className="image"
      />
      <button onClick={updateForm} type="button">Update Post</button>
    </div>
  );
};

export default Updater;
