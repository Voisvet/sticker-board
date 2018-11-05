import axios from 'axios';

class ApiConnector {
  async login(login, password) {
    const url = BACKEND_URL + '/login';
    try {
      const response = await axios.get(url, {
        params: { login, password }
      });
      if (response.status == 200) {
        return response.data;
      }
    } catch (err) {
      console.error(err);
    }
  }
}

export default new ApiConnector();
