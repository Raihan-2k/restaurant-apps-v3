import { itActsAsFavoriteRestoModel } from './contract/favoriteRestoContract';
import favoriteRestaurant from '../src/scripts/data/favorite-restaurant-idb';

// eslint-disable-next-line no-undef
describe('Favorite Restaurant Idb Contract Test Implementation', () => {
  // eslint-disable-next-line no-undef
  afterEach(async () => {
    (await favoriteRestaurant.getAllRestaurants()).forEach(async (restaurant) => {
      await favoriteRestaurant.deleteRestaurant(restaurant.id);
    });
  });

  itActsAsFavoriteRestoModel(favoriteRestaurant);
});
