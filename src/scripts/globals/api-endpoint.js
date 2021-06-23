import CONFIG from './config';

const API_ENDPOINT = {
  LIST_RESTO: `${CONFIG.BASE_URL}/list/`,
  DETAILS: (id) => `${CONFIG.BASE_URL}/detail/${id}`,
};

export default API_ENDPOINT;
