import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Likes = ({postId}) => {
    const [likes, setLikes] = useState(0);

    useEffect(() => {
        const fetchLikes = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/posts/${postId}/likes`);
                setLikes(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchLikes();
    }
    , [postId]);

    return (
        <div>
            <h1>Likes</h1>
            {Array.isArray(Likes) && likes.map(like => (
                <div key={like.id}>
                    <h2>{like.content}</h2>
                </div>
            ))}
        </div>
    );
};

export default Likes;

// Path: src/index.js