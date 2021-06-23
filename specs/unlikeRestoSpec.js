/* eslint-disable no-undef */
import LikeButtonInitiator from '../src/scripts/utils/like-button-initiator';
import FavoriteRestoIdb from '../src/scripts/data/favoriteresto-idb';

const addLikeButtonContainer = () => {
  document.body.innerHTML = '<div id="likeButtonContainer"></div>';
};

describe('Unliking A Restaurant', () => {
  beforeEach(async () => {
    addLikeButtonContainer();
    await FavoriteRestoIdb.putResto({ id: 'rqdv5juczeskfw1e867' });
  });

  afterEach(async () => {
    await FavoriteRestoIdb.deleteResto('rqdv5juczeskfw1e867');
  });

  it('should display unlike widget when the restaurant has been liked', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restos: {
        restaurant: {
          id: 'rqdv5juczeskfw1e867',
        },
      },
    });

    expect(document.querySelector('[aria-label="unlike this resto"]'))
      .toBeTruthy();
  });

  it('should not display like widget when the restaurant has been liked', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restos: {
        restaurant: {
          id: 'rqdv5juczeskfw1e867',
        },
      },
    });

    expect(document.querySelector('[aria-label="like this resto"]'))
      .toBeFalsy();
  });

  it('should be able to remove liked restaurant from the list', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restos: {
        restaurant: {
          id: 'rqdv5juczeskfw1e867',
        },
      },
    });

    document.querySelector('[aria-label="unlike this resto"]').dispatchEvent(new Event('click'));

    expect(await FavoriteRestoIdb.getAllResto()).toEqual([]);
  });

  it('should not throw error if the unliked restaurant is not in the list', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restos: {
        restaurant: {
          id: 'rqdv5juczeskfw1e867',
        },
      },
    });

    await FavoriteRestoIdb.deleteResto('rqdv5juczeskfw1e867');

    document.querySelector('[aria-label="unlike this resto"]').dispatchEvent(new Event('click'));

    expect(await FavoriteRestoIdb.getAllResto()).toEqual([]);
  });
});
