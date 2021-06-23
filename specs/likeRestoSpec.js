/* eslint-disable no-dupe-keys */
/* eslint-disable no-undef */
import LikeButtonInitiator from '../src/scripts/utils/like-button-initiator';
import FavoriteRestoIdb from '../src/scripts/data/favoriteresto-idb';

describe('Liking A Restaurant', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(() => {
    addLikeButtonContainer();
  });

  it('should show the like button when the restaurant has not been liked before', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restos: {
        restaurant: {
          id: 'rqdv5juczeskfw1e867',
        },
      },
    });

    expect(document.querySelector('[aria-label="like this resto"]'))
      .toBeTruthy();
  });

  it('should not show the unlike button when the restaurant has not been liked before', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restos: {
        restaurant: {
          id: 'rqdv5juczeskfw1e867',
        },
      },
    });

    expect(document.querySelector('[aria-label="unlike this resto"]'))
      .toBeFalsy();
  });

  it('should be able to like the restaurant', async () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restos: {
        restaurant: {
          id: 'rqdv5juczeskfw1e867',
        },
      },
    });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    const resto = await FavoriteRestoIdb.getResto('rqdv5juczeskfw1e867');

    expect(resto).toEqual({ id: 'rqdv5juczeskfw1e867' });

    FavoriteRestoIdb.deleteResto('rqdv5juczeskfw1e867');
  });

  it('should not add a restaurant again when its already liked', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restos: {
        restaurant: {
          id: 'rqdv5juczeskfw1e867',
        },
      },
    });

    await FavoriteRestoIdb.putResto({ id: 'rqdv5juczeskfw1e867' });
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    expect(await FavoriteRestoIdb.getAllResto()).toEqual([{ id: 'rqdv5juczeskfw1e867' }]);

    FavoriteRestoIdb.deleteResto('rqdv5juczeskfw1e867');
  });

  xit('should not add a restaurant when it has no id', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restos: {
        restaurant: {},
      },
    });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    expect(await FavoriteRestoIdb.getAllResto()).toEqual([]);
  });
});
