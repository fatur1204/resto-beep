/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
import UrlParser from '../../routes/url-parser';
import RestoDbSource from '../../data/restodb-source';
import { createRestoDetailTemplate, createLikeButtonTemplate } from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';

const Detail = {
  async render() {
    return `        
        <section class="content">
            <div class="latest_detail">
                <h1 class="latest__label" tabindex="0">Detail Restaurant</h1>
                <div class="lds-ring"><div></div><div></div><div></div><div></div></div>          
                <div id="posts" class="detail"></div>                
                </div>
            </div>
            <div id="likeButtonContainer"></div>
        </section>        
      `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restos = await RestoDbSource.detailItemResto(url.id);
    const restoContainer = document.querySelector('#posts');
    restoContainer.innerHTML = createRestoDetailTemplate(restos.restaurant);

    const restoCategory = document.querySelector('#categori-data');
    restos.restaurant.categories.forEach((categori) => {
      restoCategory.innerHTML += `<p>${categori.name}</p>`;
    });

    const restoFoodMenus = document.querySelector('#food-menu');
    restos.restaurant.menus.foods.forEach((foods) => {
      restoFoodMenus.innerHTML += `<p>${foods.name}</p>`;
    });

    const restoFoodDrink = document.querySelector('#drink-menu');
    restos.restaurant.menus.drinks.forEach((drinks) => {
      restoFoodDrink.innerHTML += `<p>${drinks.name}</p>`;
    });

    const restoCustomerReview = document.querySelector('#customer-review');
    if (restos.restaurant.customerReviews.length > 0) {
      restos.restaurant.customerReviews.forEach((customer) => {
        restoCustomerReview.innerHTML += `
                <style>
                    .review-list {  
                        background-color: #f9f9f9;
                        border: 1px solid #dedede;
                        border-radius: 0.25em;
                        color: #888;
                        content: 'Post author';
                        display: block;
                        font-size: 0.7rem;
                        margin-left: 0px;
                        padding: 0.2rem 0.45rem;
                        vertical-align: middle;
                        margin-bottom: 10px;
                    }
                </style>
                <div class="review-list">
                <p>Name: ${customer.name} Date: ${customer.date}</p>
                <p>Message: ${customer.review}</p>
                </div>                
                `;
      });
    } else {
      restoCustomerReview.innerHTML = `
                <style>
                    .review-list {  
                        background-color: #f9f9f9;
                        border: 1px solid #dedede;
                        border-radius: 0.25em;
                        color: #888;
                        content: 'Post author';
                        display: block;
                        font-size: 0.7rem;
                        margin-left: 0px;
                        padding: 0.2rem 0.45rem;
                        vertical-align: middle;
                        margin-bottom: 10px;
                    }
                </style>
                <div class="review-list">
                <p>Data Review Not Found!</p>                
                </div>                
                `;
    }

    const likeButtonContainer = document.querySelector('#likeButtonContainer');
    likeButtonContainer.innerHTML = createLikeButtonTemplate();

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restos,
    });

    const btnPost = document.querySelector('#btnPost');
    function subMitReview() {
      const fName = document.querySelector('#fname').value;
      const fReview = document.querySelector('#freview').value;
      if (fName.length === 0) {
        alert('Please insert your name!');
        document.getElementById('fname').focus();
      } else if (fReview.length === 0) {
        alert('Please insert Review!');
        document.getElementById('freview').focus();
      } else {
        const datapost = {
          id: url.id,
          name: fName,
          review: fReview,
        };

        fetch('https://dicoding-restaurant-api.el.r.appspot.com/review', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': '12345',
          },
          body: JSON.stringify(datapost),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('create review');
            location.reload();
          });
      }
    }
    btnPost.addEventListener('click', subMitReview);

    const Loading = document.querySelector('.lds-ring');
    Loading.remove();
  },
};

export default Detail;
