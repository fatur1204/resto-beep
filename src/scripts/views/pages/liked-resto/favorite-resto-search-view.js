/* eslint-disable class-methods-use-this */
import { createRestoItemTemplate } from '../../templates/template-creator';

class FavoriteRestoSearchView {
  getTemplate() {
    return `
        <section class="content">          
        <input id="query" type="text">
          <div class="latest">
            <h1 class="latest__label" tabindex="0">Favorite Restaurant</h1>
            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>                      
            <div class="posts" id="posts">                       
            </div>
          </div>
        </section>
      `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showRestos(restos) {
    this.showFavoriteRestos(restos);
  }

  showFavoriteRestos(restos = []) {
    let html;
    if (restos.length) {
      html = restos.reduce((carry, resto) => carry.concat(createRestoItemTemplate(resto)), '');
    } else {
      html = this._getEmptyRestoTemplate();
    }

    document.getElementById('posts').innerHTML = html;

    document.getElementById('posts').dispatchEvent(new Event('posts:updated'));
  }

  _getEmptyRestoTemplate() {
    return '<div class="resto-item__not__found">Tidak ada resto untuk ditampilkan</div>';
  }
}

export default FavoriteRestoSearchView;
