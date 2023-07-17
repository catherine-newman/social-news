import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://news-api-qn5t.onrender.com/api",
});

export const getArticles = async (page) => {
  const res = await newsApi.get(`/articles?p=${page}&total_count=true`);
  console.log(res.data);
  return res.data;
};
