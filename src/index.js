import { animalsService} from "./api";
import { createMarkup } from "./gallery";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
     formEl: document.querySelector('.search-form'),
     galleryEl: document.querySelector('.gallery'),
     buttonMore: document.querySelector('.load-more')
}

refs.formEl.addEventListener('submit', goSearch)

let simplelightbox = new SimpleLightbox('.gallery a');

let currentPage = 1;
let query = '';

async function goSearch (evt) {
    evt.preventDefault()
   
    query = evt.currentTarget.elements.searchQuery.value.trim();

if (query === "") {

    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    return
} 

   try {
    refs.galleryEl.innerHTML = '';

    currentPage = 1;

    const {hits, totalHits} = await animalsService(query);

       console.log(hits,totalHits) 
       if (totalHits) 
        Notiflix.Notify.success (`"Hooray! We found ${totalHits} images."`);
       
       if (hits.length === 0) {
           Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
           return
       } 
   
       const marcup = await createMarkup(hits);
       refs.galleryEl.innerHTML= marcup;
       simplelightbox.refresh();
       refs.buttonMore.hidden = false;

   }
   catch (err) {
            console.log(err);
        } finally {
                    evt.target.reset()
                }
}
                

    refs.buttonMore.addEventListener('click', onloadMore);
  
   async function onloadMore () {
       currentPage += 1  
       try {
            const {hits,totalHits} = await animalsService(query,currentPage)
             refs.galleryEl.innerHTML = createMarkup(hits)
             simplelightbox.refresh();
             if (totalHits <= currentPage*40) {
                refs.buttonMore.hidden = true
                Notiflix.Notify.failure('We are sorry, but you have reached the end of search results.');
            }
           
        }catch (err) {
            console.log(err)}
            
        }
        