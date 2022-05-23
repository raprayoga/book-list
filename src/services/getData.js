import Axios from "axios";
import url from "constants/url";

export default function searchBooks(keyword){
  return Axios.get(`${url.SEARCH_URL}${keyword}`);
}

export function showDetail(id){
  return Axios.get(`${url.DETAIL_URL}${id}`);
}