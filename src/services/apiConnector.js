import axios from 'axios';

// Implementation of /login request
// Authentication and authorization of user
// Required fields - login, password
export async function login(login, password) {
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
export async function getListOfMessages(token, mode=0, amount=undefined, page=undefined) {
  // Request url
  const url = BACKEND_URL + '/messages/list';
  //Check token
  if (typeof(token) != 'string' || token.length <= 0) {
    return {
      status_code: -1,
      error: 'What are you doing? Token is missing.'
    };
  }

  try {
    // Send request
    const response = await axios.get(url, {
      params: { token }
    });

    // Check response and return data
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

// Implementation of /admins/list
// Returns list (or part) of administrators
// Required fields - token
// Optional fields - mode, amount, page
// TODO: Implement pagination using optional params
export async function getListOfAdmins(token, mode=0, amount=undefined, page=undefined) {
  // Request url
  const url = BACKEND_URL + '/admins/list';
  // Check token
  if (typeof(token) != 'string' || token.length <= 0) {
    return {
      status_code: -1,
      error: 'What are you doing? Token is missing.'
    };
  }

  try {
    // Send request
    const response = await axios.get(url, {
      params: { token }
    });

    // Check response and return data
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

// Implementation of /rekognition/list
// Returns list (or part) of administrators
// Required fields - token
// Optional fields - mode, amount, page
// TODO: Implement pagination using optional params
export async function getListOfImages(token, mode=0, amount=undefined, page=undefined) {
  // Request url
  const url = BACKEND_URL + '/rekognition/list';
  // Check token
  if (typeof(token) != 'string' || token.length <= 0) {
    return {
      status_code: -1,
      error: 'What are you doing? Token is missing.'
    };
  }

  try {
    // Send request
    const response = await axios.get(url, {
      params: { token }
    });

    // Check response and return data
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

// Implementation of /logout
// Invalidates token on the server side
// Required fields - token
// Optional fields - none
export async function logout(token) {
  // Request URL
  const url = BACKEND_URL + '/logout';
  // Check token
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

    // Check response and return data
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

// Implementation of /messages/chats_list request
// Returns list of chats with their ids
// Required fields - token
// Optional fields - none
export async function getListOfChats(token) {
  // Request url
  const url = BACKEND_URL + '/messages/chats_list';
  //Check token
  if (typeof(token) != 'string' || token.length <= 0) {
    return {
      status_code: -1,
      error: 'What are you doing? Token is missing.'
    };
  }

  try {
    // Send request
    const response = await axios.get(url, {
      params: { token }
    });

    // Check response and return data
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
