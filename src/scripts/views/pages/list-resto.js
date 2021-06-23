/* eslint-disable no-alert */
import RestoDbSource from '../../data/restodb-source';
import { createRestoItemTemplate } from '../templates/template-creator';

const ListItem = {
  async render() {
    return `
        <section class="content">
          <div class="latest">
            <h1 class="latest__label" tabindex="0">Explore Restaurant</h1>
            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>          
            <div class="posts">                       
            </div>
          </div>
        </section>
      `;
  },

  async afterRender() {
    const restos = await RestoDbSource.listItemResto();
    const restoContainer = document.querySelector('.posts');
    restos.forEach((resto) => {
      restoContainer.innerHTML += createRestoItemTemplate(resto);
    });

    import('lodash.filter')
      .then((module) => module.default)
      .then(restos)
      .catch((error) => alert(error));

    const Loading = document.querySelector('.lds-ring');
    Loading.remove();
  },
};

export default ListItem;
