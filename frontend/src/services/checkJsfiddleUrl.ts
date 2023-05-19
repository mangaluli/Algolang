import axios from "axios";

const api: string = process.env.REACT_APP_API + '/check-url' || '';

export async function checkJsfiddleUrl(url:string) {
  const regex = /^(?:https?:\/\/)?(?:www\.)?jsfiddle\.net\/[a-zA-Z0-9_]+\/[a-z0-9-]+$/i;
  if(!regex.test(url)) {
    return false;
  }

  try{
    const res = await axios.post(api, {url}); 
    console.log(res.data)
    return res;
  } catch(error) {
    console.log(error)
    return false;
  }
}
