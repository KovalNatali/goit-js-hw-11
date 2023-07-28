import axios from "axios";

const API_KEY = "38386717-8fe577dd1ca73c2d4057f199b";
const BASE_URL = 'https://pixabay.com/api/';




export async function animalsService(query, currentPage = 1) {
    const params = new URLSearchParams({
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: currentPage,
      per_page: 40,
    });
  
        const {data} = await axios.get(`${BASE_URL}?${params}`);
      
        return data;
   
}




