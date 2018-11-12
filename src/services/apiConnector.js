import axios from 'axios';

const BASE_URL = 'http://localhost:8090/api';

// Implementation of /login request
// Authentication and authorization of user
// Required fields - login, password
export async function login(login, password) {
  const url = BASE_URL + '/login';
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
    return {
      status_code: -1,
      error: 'Something went wrong... ' + err
    };
  }
}

// Implementation of /messages/list request
// Returns list (or part) of messages
// Required fields - token
// Optional fields - mode, amount, page
// TODO: Implement pagination using optional params
export async function getListOfMessages(token, mode=0, amount=undefined, page=undefined) {
  // Request url
  const url = BASE_URL + '/messages/list';
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
      params: { token, mode }
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
    return {
      status_code: -1,
      error: 'Something went wrong... ' + err
    };
  }
}

// Implementation of /admins/list
// Returns list (or part) of administrators
// Required fields - token
// Optional fields - mode, amount, page
// TODO: Implement pagination using optional params
export async function getListOfAdmins(token, mode=0, amount=undefined, page=undefined) {
  // Request url
  const url = BASE_URL + '/admins/list';
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
      params: { token, mode }
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
    return {
      status_code: -1,
      error: 'Something went wrong... ' + err
    };
  }
}

// Implementation of /rekognition/list
// Returns list (or part) of administrators
// Required fields - token
// Optional fields - mode, amount, page
// TODO: Implement pagination using optional params
export async function getListOfImages(token, mode=0, amount=undefined, page=undefined) {
  // Request url
  const url = BASE_URL + '/rekognition/list';
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
      params: { token, mode }
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
    return {
      status_code: -1,
      error: 'Something went wrong... ' + err
    };
  }
}

// Implementation of /logout
// Invalidates token on the server side
// Required fields - token
// Optional fields - none
export async function logout(token) {
  // Request URL
  const url = BASE_URL + '/logout';
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
    return {
      status_code: -1,
      error: 'Something went wrong... ' + err
    };
  }
}

// Implementation of /messages/chats_list request
// Returns list of chats with their ids
// Required fields - token
// Optional fields - none
export async function getListOfChats(token) {
  // Request url
  const url = BASE_URL + '/messages/chats_list';
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
    return {
      status_code: -1,
      error: 'Something went wrong... ' + err
    };
  }
}

// Implementation of /messages/info/id request
// Returns detailed information about message
// Required fields - token, id
// Optional fields - none
export async function getMessageInfo(token, id) {
  // Request url
  const url = BASE_URL + '/messages/info/' + id;
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
    return {
      status_code: -1,
      error: 'Something went wrong... ' + err
    };
  }
}

// Implementation of /messages/payload/id request
// Returns payload of the message
// Required fields - token, id
// Optional fields - none
export async function getMessagePayload(token, id) {
  // Request url
  const url = BASE_URL + '/messages/payload/' + id;
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
    return {
      status_code: -1,
      error: 'Something went wrong... ' + err
    };
  }
}

// Implementation of /messages/payload/id DELETE request
// Deletes the message with specified id
// Required fields - token, id
// Optional fields - none
export async function deleteMessage(token, id) {
  // Request url
  const url = BASE_URL + '/messages/info/' + id;
  //Check token
  if (typeof(token) != 'string' || token.length <= 0) {
    return {
      status_code: -1,
      error: 'What are you doing? Token is missing.'
    };
  }

  try {
    // Send request
    const response = await axios.delete(url, {
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
    return {
      status_code: -1,
      error: 'Something went wrong... ' + err
    };
  }
}

// Implementation of /admins/create
// Creates new administrator
// Required fields - token, id
// Optional fields - none
export async function createAdmin(token, admin) {
  // Request url
  const url = BASE_URL + '/admins/create/';
  //Check token
  if (typeof(token) != 'string' || token.length <= 0) {
    return {
      status_code: -1,
      error: 'What are you doing? Token is missing.'
    };
  }

  try {
    // Send request
    const response = await axios.post(url, {...admin} ,{
      params: { token },
      headers: {'Content-Type': 'application/json'}
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
    return {
      status_code: -1,
      error: 'Something went wrong... ' + err
    };
  }
}

// Implementation of /admins/info/id DELETE request
// Deletes the admin with specified id
// Required fields - token, id
// Optional fields - none
export async function deleteAdmin(token, id) {
  // Request url
  const url = BASE_URL + '/admins/info/' + id;
  //Check token
  if (typeof(token) != 'string' || token.length <= 0) {
    return {
      status_code: -1,
      error: 'What are you doing? Token is missing.'
    };
  }

  try {
    // Send request
    const response = await axios.delete(url, {
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
    return {
      status_code: -1,
      error: 'Something went wrong... ' + err
    };
  }
}

// Implementation of /admins/create
// Creates new administrator
// Required fields - token, id, admin info
// Optional fields - none
export async function editAdmin(token, id, admin) {
  // Request url
  const url = BASE_URL + '/admins/info/' + id;
  //Check token
  if (typeof(token) != 'string' || token.length <= 0) {
    return {
      status_code: -1,
      error: 'What are you doing? Token is missing.'
    };
  }
  try {
    // Send request
    const response = await axios.put(url, {...admin} ,{
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
    return {
      status_code: -1,
      error: 'Something went wrong... ' + err
    };
  }
}

// Implementation of /messages/stickers/recent request
// Returns list of stickers
// Required fields - token
// Optional fields - none
export async function getListOfRecentlyUsedStickers(token) {
  // Request url
  const url = BACKEND_URL + '/messages/stickers/recent';
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
    return {
      status_code: -1,
      error: 'Something went wrong... ' + err
    };
  }
}

// Implementation of /messages/stickers/preview/{id} request
// Returns sticker with specified id
// Required fields - token, id
// Oprional fields - none
export async function getStickerWithId(token, id) {
  // Request url
  const url = BACKEND_URL + '/messages/stickers/preview/' + id;
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
    return {
      status_code: -1,
      error: 'Something went wrong... ' + err
    };
  }
}

// Implementation of /messages/create request
// Create new message on the server
// Required fields - token, id
// Oprional fields - none
export async function createMessage(token, type, date, periods, chats) {
  // Request url
  const url = BACKEND_URL + '/messages/create';
  //Check token
  if (typeof(token) != 'string' || token.length <= 0) {
    return {
      status_code: -1,
      error: 'What are you doing? Token is missing.'
    };
  }

  try {
    // Send request
    let response = {};
    if (type === 'scheduled') {
      response = await axios.post(url, {
        type, date, chats
      }, {
        params: { token },
        headers: {'Content-Type': 'application/json'}
      });
    } else {
      response = await axios.post(url, {
        type, periods, chats
      }, {
        params: { token },
        headers: {'Content-Type': 'application/json'}
      });
    }

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
    return {
      status_code: -1,
      error: 'Something went wrong... ' + err
    };
  }
}

// Implementation of /messages/create request
// Create new message on the server
// Required fields - token, id
// Oprional fields - none
export async function updatePayload(token, id, payload_type, payload, file_name='') {
  // Request url
  const url = BACKEND_URL + '/messages/payload/' + id;
  //Check token
  if (typeof(token) != 'string' || token.length <= 0) {
    return {
      status_code: -1,
      error: 'What are you doing? Token is missing.'
    };
  }

  try {
    // Send request
    let response = {};
    if (payload_type === 'file') {
      // Send file
      response = await axios.put(url, {
        payload_type, payload, file_name
      }, {
        params: { token }
      });
    } else {
      // Send other kinds of payload
      response = await axios.put(url, {
        payload_type, payload
      }, {
        params: { token }
      });
    }

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
    return {
      status_code: -1,
      error: 'Something went wrong... ' + err
    };
  }
}
