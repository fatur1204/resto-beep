import CONFIG from '../../globals/config';

const createRestoItemTemplate = (resto) => `
    <article class="post-item container">
    <img class="lazyload post-item__thumbnail" tabindex="0"
            data-src="${`${CONFIG.BASE_IMAGE_URL}medium/${resto.pictureId}`}"
            alt="restauran_image">
    <div class="post-item__content">  
        <p class="post-item__date" tabindex="0"><a class="post-item__date__author city-description">Kota, ${resto.city}</a></p>     
        <p class="post-item__date___rating" tabindex="0">Rating ★ <a class="post-item__date__author_rating">${resto.rating}</a></p>     
        <h1 class="post-item__title"><a href="${`/#/detail/${resto.id}`}" tabindex="0" >${resto.name}</a></h1>
        <p class="post-item__description" tabindex="0">${resto.description}</p>
    </div>
    </article>
  `;

const createRestoDetailTemplate = (resto) => `
  <h2 class="detail__title">${resto.name}</h2>   
  <img class="lazyload detail__poster" data-src="${`${CONFIG.BASE_IMAGE_URL}large/${resto.pictureId}`}" alt="${resto.name}" />
  <div class="detail__info">
    <h3>Information</h3> 
        <h4>City</h4>
        <p>${resto.city}</p>          
        <h4>Address</h4>
        <p>${resto.address}</p>   
        <h4>Category Menu</h4>
        <p id="categori-data" class="categori"></p>
        <h4>Food Menu</h4>
        <p id="food-menu" class="categori"></p>

  </div>
  <div class="detail__overview">
    <h4>Drink Menu</h4> 
    <p id="drink-menu" class="categori review review-border-menu"></p>
    <h4>Rating ★</h4>
    <p>${resto.rating}</p>
    <h3 class="review">Overview</h3>
    <p>${resto.description}</p>
    <h3 class="review">Customer Review</h3>
    <p id="customer-review" class="review-border"></p>
  </div>

  <div class="detail__overview">
    <h3 class="review">New Review</h3>
    <div class="container-review">
      <div class="row">
        <div class="col-25">
          <label for="fname" class="review_comment">Your Name</label>
        </div>
        <div class="col-75">
          <input class="review_comment" type="text" id="fname" name="fname" placeholder="Your name..">
        </div>
      </div>
      
      <div class="row">
        <div class="col-25">
          <label for="subject" class="review_comment">Review</label>
        </div>
        <div class="col-75">
          <textarea id="freview" name="freview" placeholder="Write Review.." style="height:200px"></textarea>
        </div>
      </div>
      <div class="row">
        <input type="submit" class="review_comment" value="Submit" id="btnPost">
      </div>
    </div>
  </div>
`;

const createLikeButtonTemplate = () => `
  <button aria-label="like this resto" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this resto" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;
export { createRestoItemTemplate, createRestoDetailTemplate, createLikeButtonTemplate, createLikedButtonTemplate };
