import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://news-api-qn5t.onrender.com/api",
});

export const getArticles = async (page) => {
  const res = await newsApi.get(`/articles?p=${page}&total_count=true`);
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
