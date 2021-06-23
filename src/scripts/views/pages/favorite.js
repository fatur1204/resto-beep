/* eslint-disable no-new */
import FavoriteRestoIdb from '../../data/favoriteresto-idb';
import FavoriteRestoSearchView from './liked-resto/favorite-resto-search-view';
import FavoriteRestoSearchPresenter from './liked-resto/favorite-resto-search-presenter';
import FavoriteRestoShowPresenter from './liked-resto/favorite-resto-show-presenter';

const view = new FavoriteRestoSearchView();

const ListItem = {
  async render() {
    return view.getTemplate();
  },

  async afterRender() {
    new FavoriteRestoShowPresenter({ view, favoriteRestos: FavoriteRestoIdb });
    new FavoriteRestoSearchPresenter({ view, favoriteRestos: FavoriteRestoIdb });

    const Loading = document.querySelector('.lds-ring');
    Loading.remove();
  },
};

export default ListItem;
