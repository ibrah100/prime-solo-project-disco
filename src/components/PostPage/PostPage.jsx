import {useSelector, useDispatch} from 'react-redux';
import { useState } from "react";
import { useHistory } from "react-router-dom";



function PostPage() {
    const postData = useSelector((store) => store.postData);
    const [postInput, setPostInput] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();



    console.log("post data:", postData);


    const handlePost = (event) => {
        event.preventDefault();

        postData.post_text = postInput;


        console.log("full user post data", postData);

        dispatch({
            type: 'SAGA_POST_SONG',
            payload: postData
        })

        history.push("/search");
    
      }

    return (
        <div>
            <form onSubmit={handlePost}>
            <input
            placeholder="make a post"
            type="text"
            value={postInput}
            onChange={(event) => setPostInput(event.target.value)}
            />
            <button>POST</button>
            </form>
            <p>Song Name: {postData.song_name}</p>
            <p>Artist Name: {postData.artist_name}</p>
            <img src={postData.song_image}></img>
        </div>
    );
}

export default PostPage;
