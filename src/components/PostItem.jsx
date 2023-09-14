import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import CustomButton from './UI/button/CustomButton';

const PostItem = (props) => {
  const router = useNavigate();
  return (
    <div className='post'>
      <div className='post__content'>
        <strong>{props.post.id}. {props.post.title}</strong>
        <div>{props.post.body}</div>
      </div>
      <div className='post__btns'>
        <CustomButton onClick={() => router(`/posts/${props.post.id}`)}>Open</CustomButton>
        <CustomButton onClick={() => props.remove(props.post)}>Delete</CustomButton>
      </div>
    </div>
  )
}

export default PostItem