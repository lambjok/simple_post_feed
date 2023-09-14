import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useFetching } from '../hooks/useFetching';

import PostService from '../API/PostService';
import Loader from '../components/UI/loader/CustomLoader';

function PostIdPage() {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(id);
    setPost(response.data);
  });
  const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
    const response = await PostService.getCommentsByPostId(id);
    setComments(response.data);
  })

  useEffect(() => {
    fetchPostById(params.id);
    fetchComments(params.id);
  }, []);

  return (
    <div>
      <h1 style={{textAlign: 'center', marginTop: 50, fontSize: 32}}>
        It's a post page with ID = {params.id}!
      </h1>
      {isLoading
        ? <Loader/>
        : <h2 style={{textAlign: 'center', marginTop: 50}}>{post.id}. {post.title} {params.id}</h2>
      }
      <h1 style={{textAlign: 'center', marginTop: 35, fontSize: 32}}>
        Comments:
      </h1>
      {isComLoading
        ? <Loader/>
        : <div >
            {comments.map((com, i) => 
              <div
                className='comments__container' 
                key={i}
              >
                <h4 className='comments__name'>{com.email}</h4>
                <p className='comments__body'>{com.body}</p>
              </div>
            )}
          </div>
      }      
    </div>
  )
}

export default PostIdPage