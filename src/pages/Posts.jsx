import React, { useState, useEffect, useMemo, useRef } from 'react';

import PostList from '../components/PostList';
import PostForm from '../components/PostForm';
import PostFilter from '../components/PostFilter';
import PostService from '../API/PostService';

import Pagination from '../components/UI/pagination/Pagination';

import CustomModal from '../components/UI/modal/CustomModal';
import CustomButton from '../components/UI/button/CustomButton';

import CustomLoader from '../components/UI/loader/CustomLoader';

import { getPageCount } from '../utils/pages';

import { usePosts } from '../hooks/usePosts';
import { useFetching } from '../hooks/useFetching';
import { useObserver } from '../hooks/useObserver';
import CustomSelect from '../components/UI/select/CustomSelect';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({sort: '', query: ''})
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const lastElement = useRef();

  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit));
  });

  const pagesArray = useMemo(() => {
    let pages = [];
    for (let i = 0; i < totalPages; i++) {
      pages.push(i + 1);
      console.log('counted');
    }
    return pages;
  }, [totalPages]);

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1);
  })

  useEffect(() => {
    fetchPosts();
  }, [page, limit]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false);
  };

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id));
  };

  const changePage = (page) => {
    setPage(page);
  }

  return (
    <div className='App'>
      <CustomButton style={{marginTop: '15px'}} onClick={() => setModal(true)}>
        Create new post
      </CustomButton>
      <CustomModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </CustomModal> 
      <hr style={{margin: '15px 0'}} />
      <PostFilter 
        filter={filter}
        setFilter={setFilter}
      />
      <CustomSelect 
        value={limit}
        onChange={value => setLimit(value)}
        defaultValue='Amount of posts on the page'
        options={[
          {value: 5, name: '5'},
          {value: 10, name: '10'},
          {value: 25, name: '25'},
          {value: -1, name: 'All'},
        ]}
      />
      {postError &&
        <h1>Error happend ${postError}</h1>
      }
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'List of Posts'}/>
      <div ref={lastElement} style={{height: 20}} />
      {isPostsLoading &&
        <div style={{display: 'flex', justifyContent: 'center', paddingTop: '50px'}}><CustomLoader /></div>
      }     
      {/* <Pagination page={page} changePage={changePage} totalPages={pagesArray} /> */}
    </div>
  );
};

export default Posts;