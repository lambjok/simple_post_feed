import React, { useState } from 'react';

import CustomInput from './UI/input/CustomInput';
import CustomButton from './UI/button/CustomButton';

function PostForm({create}) {
  const [post, setPost] = useState({title: '', body: ''});

  const addNewPost = (e) => {
    e.preventDefault();
    const newPost = {
      ...post, id: Date.now()
    }
    create(newPost);
    setPost({title: '', body: ''})
  }

  return (
    <form>
      <CustomInput
        value={post.title}
        onChange={e => setPost({...post, title: e.target.value})}
        type='text' 
        placeholder='Post name' 
      />
      <CustomInput
        value={post.body}
        onChange={e => setPost({...post, body: e.target.value})}
        type='text' 
        placeholder='Post description' 
      />
      <CustomButton onClick={addNewPost}>Create post</CustomButton>
    </form>
  )
}

export default PostForm