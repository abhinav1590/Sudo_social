import React,{useEffect, useState } from "react";
import axios from "axios";

const Comments = ({postId}) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/posts/${postId}/comments`);
                setComments(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchComments();
    }
    , [postId]);

    return (
        <div>
            <h1>Comments</h1>
            {comments.map(comment => (
                <div key={comment.id}>
                    <h2>{comment.content}</h2>
                </div>
            ))}
        </div>
    );
};

export default Comments;

// Path: src/index.js