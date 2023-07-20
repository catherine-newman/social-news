import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://news-api-qn5t.onrender.com/api",
});

export const getArticles = async (topic, page, sortby, order) => {
  const params = {
    p: page,
    total_count: true,
    sort_by: sortby,
    order: order,
  };
  if (topic) {
    params.topic = topic;
  }
  const res = await newsApi.get(`/articles`, {
    params: params,
  });
  return res.data;
};

export const getArticle = async (article_id) => {
  const res = await newsApi.get(`/articles/${article_id}`);
  return res.data.article;
};

export const getComments = async (article_id) => {
  const res = await newsApi.get(`/articles/${article_id}/comments`);
  return res.data.comments;
};

export const patchArticle = async (article_id, vote) => {
  const res = await newsApi.patch(`/articles/${article_id}`, {
    inc_votes: vote,
  });
  return res.data.article;
};

export const postComment = async (article_id, username, comment) => {
  const res = await newsApi.post(`/articles/${article_id}/comments`, {
    username: username,
    body: comment,
  });
  return res.data.comment;
};

export const getTopics = async () => {
  const res = await newsApi.get(`/topics`);
  return res.data.topics;
};

export const getUsers = async () => {
  const res = await newsApi.get(`/users`);
  return res.data.users;
};

export const deleteComment = async (comment_id) => {
  await newsApi.delete(`/comments/${comment_id}`);
};
