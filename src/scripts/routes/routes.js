import RestaurantPage from '../views/pages/restaurant-page';
import favorite from '../views/pages/favorite';
import Detail from '../views/pages/detail';

const routes = {
  '/': RestaurantPage, // default page
  '/restaurant-page': RestaurantPage,
  '/favorite': favorite,
  '/detail/:id': Detail,
};

export default routes;
