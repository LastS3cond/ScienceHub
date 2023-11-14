// WeatherDetail.jsx
import React from 'react';
import { supabase } from '../client'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

const Post = () => {
    // Retrieve the timestamp from the query parameter
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('id');
    const [upvotes, setUpvotes] = useState(0);
    const [comments, setComments] = useState([]);
    const [current, setCurrent] = useState("");
    const navigate = useNavigate()

    const [Posts, setPosts] = useState([]);

    const convertTime = (timeStamp) => {
        const timeDiff = Math.floor((Date.now() - timeStamp) / 60000)
        if (Math.floor(timeDiff / 3679200) != 0)
            return Math.floor(timeDiff / 60) + (Math.floor(timeDiff / 60) == 1 ? " year ago" : " years ago")
        if (Math.floor(timeDiff / 306600) != 0)
            return Math.floor(timeDiff / 60) + (Math.floor(timeDiff / 60) == 1 ? " month ago" : " months ago")
        if (Math.floor(timeDiff / 1440) != 0)
            return Math.floor(timeDiff / 1440) + (Math.floor(timeDiff / 60) == 1 ? " day ago" : " days ago")
        if (Math.floor(timeDiff / 60) != 0)
            return Math.floor(timeDiff / 60) + (Math.floor(timeDiff / 60) == 1 ? " hour ago" : " hours ago")
        else {
            return timeDiff + (timeDiff == 1 ? " minute ago" : " minutes ago")
        }
    }

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
                setPosts(data[0])
                setComments(data[0].comments.split("@#^%$new comment$%^#@"))
                setUpvotes(data[0].upvotes)
            }
        };
        parse();
    }, []); // Only does this on the initial render

    const updateForm = async (event) => {
        event.preventDefault();
        navigate(
            `/updater?id=${Posts.id}`
        )
    };

    const updateUpvotes = async (event) => {
        event.preventDefault();

        await supabase
            .from('Posts')
            .update({ upvotes: upvotes + 1 })
            .eq('id', id)
            .select()

        setUpvotes(upvotes + 1);
    };

    const handleCommentChange = (event) => {
        setCurrent(event.target.value);
    };

    const updateComments = async (event) => {
        event.preventDefault();

        let { data, error } = await supabase
            .from('Posts')
            .select('*')
            .eq('id', id)

        console.log(data)
        await supabase
            .from('Posts')
            .update({ comments: data[0].comments + "@#^%$new comment$%^#@" + current })
            .eq('id', id)
            .select()

        setComments(comments.concat([current]));
        setCurrent("");
    };

    const deleteForm = async (event) => {
        event.preventDefault();

        await supabase
            .from('Posts')
            .delete()
            .eq('id', id)

        navigate(
            `/gallery`
        )
    };
    // "comment"
    return (
        <div className="PostInfo" key={Posts.id}>
            <p>Posted {convertTime(Posts.timeStamp)}</p>
            <button onClick={updateForm} type="button">Update Post</button>
            <button onClick={deleteForm} type="button">Delete Post</button>
            <h1>{Posts.title}</h1>
            <p>{Posts.content}</p>
            {(Posts.image === null) ? <></> : <img src={Posts.image} />}
            <p>Upvotes: <button onClick={updateUpvotes}>{upvotes}</button></p>
            <div className="comments"> Comments:
                {comments.slice(1).map((dataPoint, index) => (
                    <p key={index} className="comment">{dataPoint}</p>
                ))}
            </div>
            <input
                type="text"
                placeholder="Add a comment"
                value={current}
                onChange={handleCommentChange}
                className="title"
            />
            <button onClick={updateComments} type="button">Add Comment</button>
        </div>
    );
};

export default Post;
