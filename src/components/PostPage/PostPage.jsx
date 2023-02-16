import {useSelector, useDispatch} from 'react-redux';
import { useState } from "react";


function PostPage() {
    const postData = useSelector((store) => store.postData);
    const [postInput, setPostInput] = useState('');
    const dispatch = useDispatch();

    let userPost = {
        user_id: postData.user_id,
        song_id: postData.song_id,
        post_text: postInput
    }


    const handlePost = (event) => {
        event.preventDefault();

        console.log('handle post data:', userPost);
        
        // dispatch({
        //   type: 'SAGA_CREATE_POST',
        //   payload: userPost
        // })
    
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
        </div>
    );
}

export default PostPage;
