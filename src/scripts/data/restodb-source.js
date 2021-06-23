import API_ENDPOINT from '../globals/api-endpoint';

class RestoDbSource {
  static async listItemResto() {
    const response = await fetch(API_ENDPOINT.LIST_RESTO);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async detailItemResto(id) {
    const response = await fetch(API_ENDPOINT.DETAILS(id));
    return response.json();
  }
}

export default RestoDbSource;
