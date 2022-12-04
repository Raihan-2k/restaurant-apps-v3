import API_ENDPOINT from '../globals/api-endpoint';

class RestaurantSource {
  static async RestaurantPage() {
    const response = await fetch(API_ENDPOINT.RESTAURANTS_PAGE);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async detailRestaurant(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    const responseJson = await response.json();
    return responseJson.restaurant;
  }

  static async addReview(review) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(review),
    };

    const response = await fetch(API_ENDPOINT.ADD_REVIEW, options);
    const responseJson = await response.json();
    return responseJson;
  }
}

export default RestaurantSource;
