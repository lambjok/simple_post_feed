import axios from 'axios';

const getAll = async (limit = 10, page = 1) => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
    params: {
      _limit: limit,
      _page: page,
    }
  });
  return response;
}

const getById = async (id) => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts/' + id);
  return response;
}

const getCommentsByPostId = async (id) => {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
  return response;
}

export default { getAll, getById, getCommentsByPostId };