import React from 'react';
import { supabase } from '../client'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
const Creator = () => {
    // Retrieve the timestamp from the query parameter
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");
    const navigate = useNavigate()

    const handleSetTitle = (event) => {
        setTitle(event.target.value);
    };

    const handleSetContent = (event) => {
        setContent(event.target.value);
    };

    const handleSetImage = (event) => {
        setImage(event.target.value);
    };

    const submitForm = async (event) => {
        console.log(title);
        console.log(content);
        console.log(image);
        event.preventDefault();

        await supabase
            .from('Posts')
            .insert({ title: title, content: content, image: image, timeStamp: Date.now() })
            .select();

        navigate(
            `/gallery`
        )
    };

    return (
        <div className='Creator'>
            <h1>Create your Post</h1>
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
            <button onClick={submitForm} type="button">Create Post</button>
        </div>
    );
};

export default Creator;
