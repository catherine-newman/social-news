import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://news-api-qn5t.onrender.com/api",
});

export const getArticles = async () => {
  const res = await newsApi.get(`/articles`);
  return res.data.articles;
};
