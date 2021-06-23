/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import FavoriteRestoIdb from '../data/favoriteresto-idb';
import { createLikeButtonTemplate, createLikedButtonTemplate } from '../views/templates/template-creator';

const LikeButtonInitiator = {
  async init({ likeButtonContainer, restos }) {
    this._likeButtonContainer = likeButtonContainer;
    this._resto = restos.restaurant;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._resto;

    if (await this._isRestoExists(id)) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  },

  async _isRestoExists(id) {
    const restos = await FavoriteRestoIdb.getResto(id);
    return !!restos;
  },

  _renderLike() {
    this._likeButtonContainer.innerHTML = createLikeButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await FavoriteRestoIdb.putResto(this._resto);
      this._renderButton();
    });
  },

  _renderLiked() {
    this._likeButtonContainer.innerHTML = createLikedButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await FavoriteRestoIdb.deleteResto(this._resto.id);
      this._renderButton();
    });
  },
};

export default LikeButtonInitiator;
