/* eslint-disable no-undef */
import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import '../styles/responsive.css';
import App from './views/app';
import swRegister from './utils/sw-register';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const app = new App({
  button: document.querySelector('#menu'),
  drawer: document.querySelector('#drawer'),
  content: document.querySelector('main'),
});

const hero = document.querySelector('.hero');
hero.addEventListener('click', () => {
  drawer.classList.remove('open');
});

window.addEventListener('hashchange', () => {
  app.renderPage();
  app._drawer.classList.remove('open');
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});
