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
  console.log(res.data.article);
  return res.data.article;
};
