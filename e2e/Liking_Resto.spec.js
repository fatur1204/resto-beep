/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
const assert = require('assert');

Feature('Liking Resto');

Before((I) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurant', (I) => {
  I.seeElement('#query');
  I.see('Tidak ada resto untuk ditampilkan', '.resto-item__not__found');
});

Scenario('Liking one restaurant', async (I) => {
  I.see('Tidak ada resto untuk ditampilkan', '.resto-item__not__found');

  I.amOnPage('/');

  I.seeElement('.post-item__title a');

  const firstResto = locate('.post-item__title a').first();
  const firstRestoTitle = await I.grabTextFrom(firstResto);
  I.click(firstResto);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.post-item');

  const likedRestoTitle = await I.grabTextFrom('.post-item__title');

  assert.strictEqual(firstRestoTitle, likedRestoTitle);
});

Scenario('Unliking one restaurant', async (I) => {
  I.see('Tidak ada resto untuk ditampilkan', '.resto-item__not__found');

  // add like restaurant
  I.amOnPage('/');

  I.seeElement('.post-item__title a');

  const firstResto = locate('.post-item__title a').first();
  const firstRestoTitle = await I.grabTextFrom(firstResto);
  I.click(firstResto);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.post-item');

  const likedRestoTitle = await I.grabTextFrom('.post-item__title');

  assert.strictEqual(firstRestoTitle, likedRestoTitle);

  // unlike restaurant
  I.seeElement('.post-item__title a');
  const firstRestos = locate('.post-item__title a').first();
  I.click(firstRestos);

  // unlike restaurant
  I.seeElement('#likeButton');
  I.click('#likeButton');
  I.amOnPage('/');

  I.amOnPage('/#/favorite');
  I.see('Tidak ada resto untuk ditampilkan', '.resto-item__not__found');
});

Scenario('Customer Review', (I) => {
  I.see('Tidak ada resto untuk ditampilkan', '.resto-item__not__found');

  I.amOnPage('/');
  I.seeElement('.post-item__title a');

  I.click(locate('.post-item__title a').first());

  I.seeElement('.detail__overview');
  I.fillField('fname', 'Fathur Rahman');
  I.fillField('freview', 'Restaurant Sangat Bagus banget');

  I.seeElement('#btnPost');
  I.click('#btnPost');

  I.seeElement('.review-list');
  I.scrollTo(0, 800);
});

Scenario('searching Resto', async (I) => {
  I.see('Tidak ada resto untuk ditampilkan', '.resto-item__not__found');

  I.amOnPage('/');

  I.seeElement('.post-item__title a');

  const titles = [];

  for (let i = 1; i <= 3; i++) {
    I.click(locate('.post-item__title a').at(i));
    I.seeElement('#likeButton');
    I.click('#likeButton');
    titles.push(await I.grabTextFrom('.detail__title'));
    I.amOnPage('/');
  }

  I.amOnPage('/#/favorite');
  I.seeElement('#query');

  I.scrollTo(0, 800);

  const searchQuery = titles[1].substring(1, 3);
  const matchingResto = titles.filter((title) => title.indexOf(searchQuery) !== -1);

  I.fillField('#query', searchQuery);
  I.pressKey('Enter');

  const visibleLikedResto = await I.grabNumberOfVisibleElements('.post-item');
  assert.strictEqual(matchingResto.length, visibleLikedResto);

  matchingResto.forEach(async (title, index) => {
    const visibleTitle = await I.grabTextFrom(locate('.post-item__title').at(index + 1));
    assert.strictEqual(title, visibleTitle);
  });
});
