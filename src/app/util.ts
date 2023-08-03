import axios from 'axios';
import { toast } from "react-toastify";
import { APIPayload } from './types';

const mainConfig = {
  headers: {
    'Content-Type': 'application/json'
  }
  
}

export const apiGet = async <T>({url, config, successMsg, errorMsg}: APIPayload) => {
  try {
    const res = await axios.get(url, {...mainConfig, ...config});

    if (successMsg !== '')
      toast.success(successMsg)
    return res.data as T
  } catch (err: any) {
    console.log('fetch api error =>', err);
    toast.error(errorMsg)
    return null;
  }
};

export const apiPost = async <T>({url, body, config, successMsg, errorMsg}: APIPayload) => {  
  try {
    const res = await axios.post(url, body, {...mainConfig, ...config});
    if (successMsg)
      toast.success(successMsg)
    return res.data as T
  } catch (err: any) {
    console.log('fetch api error =>', err.message);
    toast.error(errorMsg)
    return null;
  }
};

export function isAuthenticated(token: string | null) {
  return token === '123';
}

export function stringToColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
}

export function stringAvatar(a: string, b: string) {
  return `${a[0]}${b[0]}`
}