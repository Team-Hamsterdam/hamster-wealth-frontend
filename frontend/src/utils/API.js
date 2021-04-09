export default class API {
  /** @param {String} url */
  constructor() {
    this.url = `http://localhost:4500`;
  }

  /** @param {String} path */
  /** @param {Object} body */
  postAPIRequestBody(path, body) {
    return fetch(`${this.url}/${path}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }

  /** @param {String} path */
  /** @param {Object} body */
  /** @param {String} token */
  postAPIRequestToken(path, token) {
    return fetch(`${this.url}/${path}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
  }

  /** @param {String} path */
  /** @param {Object} body */
  /** @param {String} token */
  postAPIRequestBodyToken(path, body, token) {
    return fetch(`${this.url}/${path}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(body),
    });
  }

  /** @param {String} path */
  /** @param {Object} query */
  /** @param {String} token */
  getAPIRequestTokenQuery(path, query, token) {
    return fetch(`${this.url}/${path}/?` + new URLSearchParams(query), {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
  }

  // Gets user data from given token
  /** @param {String} token */
  getAPIUserData(token) {
    return fetch(`${this.url}/user/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        return responseData;
      })
      .catch((error) => console.warn(error));
  }

  /** @param {String} path */
  /** @param {Object} query */
  /** @param {String} token */
  putAPIRequestTokenQuery(path, query, token) {
    return fetch(`${this.url}/${path}/?` + new URLSearchParams(query), {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
  }

  /** @param {String} path */
  /** @param {Object} query */
  /** @param {Object} body */
  /** @param {String} token */
  putAPIRequestTokenBodyQuery(path, query, body, token) {
    return fetch(`${this.url}/${path}/?` + new URLSearchParams(query), {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(body),
    });
  }

  /** @param {String} path */
  /** @param {Object} body */
  /** @param {String} token */
  putAPIRequestTokenBody(path, body, token) {
    return fetch(`${this.url}/${path}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(body),
    });
  }

  /** @param {String} path */
  /** @param {Object} query */
  /** @param {String} token */
  deleteAPIRequestTokenQuery(path, query, token) {
    return fetch(`${this.url}/${path}/?` + new URLSearchParams(query), {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
  }
}
