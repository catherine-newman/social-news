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
