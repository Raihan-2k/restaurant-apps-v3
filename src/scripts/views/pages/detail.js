import RestaurantSource from '../../data/restaurant-source';
import UrlParser from '../../routes/url-parser';
import {
  createRestoDetailTemplate,
  createLikeRestoButtonTemplate,
  RestoDrinksTemplate,
  RestoFoodsTemplate,
  RestoReviewTemplate,
} from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-presenter';
import favoriteRestaurant from '../../data/favorite-restaurant-idb';

const Detail = {
  async render() {
    return `
    <div class="hero"></div>
    <h2 class="explore__title">Detail of Restaurant</h2>
    <div class="restaurant__detail" id="restaurant"></div>
    <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantSource.detailRestaurant(url.id);
    const restaurantContainer = document.querySelector('#restaurant');
    const likeButtonContainer = document.querySelector('#likeButtonContainer');

    restaurantContainer.innerHTML = createRestoDetailTemplate(restaurant);
    likeButtonContainer.innerHTML = createLikeRestoButtonTemplate();

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteResto: favoriteRestaurant,
      restaurant: {
        id: restaurant.id,
        city: restaurant.city,
        pictureId: restaurant.pictureId,
        rating: restaurant.rating,
        name: restaurant.name,
        description: restaurant.description,
      },
    });
    const foods = await RestaurantSource.detailRestaurantFood(url.id);
    const foodContainer = document.querySelector('#food');
    foods.forEach((food) => {
      foodContainer.innerHTML += RestoFoodsTemplate(food);
    });
    const drinks = await RestaurantSource.detailRestaurantDrink(url.id);
    const drinkContainer = document.querySelector('#drink');
    drinks.forEach((drink) => {
      drinkContainer.innerHTML += RestoDrinksTemplate(drink);
    });
    const reviews = await RestaurantSource.customerReviews(url.id);
    const reviewContainer = document.querySelector('#review');
    reviews.forEach((review) => {
      reviewContainer.innerHTML += RestoReviewTemplate(review);
    });

    const nameinput = document.querySelector('#input-name');
    const reviewinput = document.querySelector('#input-review');
    const reviewsubmit = document.querySelector('#add');
    reviewsubmit.addEventListener('click', async (event) => {
      const review = {
        id: restaurant.id,
        name: nameinput.value,
        review: reviewinput.value,
      };
      if (nameinput.value === '' || reviewinput.value === '') {
        // alert('Required name and review!!');
        alert.fire({
          position: 'center',
          icon: 'error',
          title: 'Required name and review!!',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        event.preventDefault();
        alert.fire({
          title: `Do you want to review ${restaurant.name}?`,
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Yes',
        }).then(async (result) => {
          if (result.isConfirmed) {
            alert.fire('Thanks for review!', '', 'success').then(
              await RestaurantSource.addReview(review).then(() => {
                location.reload();
              }),
            );
          }
        });
      }
    });
  },
};

export default Detail;
