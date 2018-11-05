import axios from 'axios';

class ApiConnector {

  // Implementation of /login request
  // Authentication and authorization of user
  // Required fields - login, password
  async login(login, password) {
    const url = BACKEND_URL + '/login';
    try {
      const response = await axios.get(url, {
        params: { login, password }
      });
      if (response.status == 200) {
        return response.data;
      } else {
        return {
          status_code: -1,
          error: 'Something went wrong... Server returned code '
                  + response.status
        };
      }
    } catch (err) {
      console.error(err);
    }
  }

  // Implementation of /messages/list request
  // Returns list (or part) of messages
  // Required fields - token
  // Optional fields - mode, amount, page
  // TODO: Implement pagination using optional params
  async getListOfMessages(token, mode, amount, page) {
    const url = BACKEND_URL + '/messages/list';
    if (typeof(token) != 'string' || token.length <= 0) {
      return {
        status_code: -1,
        error: 'What are you doing? Token is missing.'
      };
    }
    try {
      const response = await axios.get(url, {
        params: { token }
      });
      if (response.status == 200) {
        return response.data;
      } else {
        return {
          status_code: -1,
          error: 'Something went wrong... Server returned code '
                  + response.status
        };
      }
    } catch (err) {
      console.error(err);
    }
  }
}

export default new ApiConnector();
