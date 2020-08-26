class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }
  getMe() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`); // если ошибка, отклоняем промис
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }
  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'GET',
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`); // если ошибка, отклоняем промис
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }
  createCards(data) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ name: data.name, link: data.link }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
  deleteCards(idCard) {
    return fetch(`${this.baseUrl}/cards/${idCard}`, {
      method: 'DELETE',
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`); // если ошибка, отклоняем промис
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }
  likeCards(idCard) {
    return fetch(`${this.baseUrl}/cards/likes/${idCard}`, {
      method: 'PUT',
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`); // если ошибка, отклоняем промис
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }
  unLikeCards(idCard) {
    return fetch(`${this.baseUrl}/cards/likes/${idCard}`, {
      method: 'DELETE',
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`); // если ошибка, отклоняем промис
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }
  changeAvatar(avatar) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({ avatar }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`); // если ошибка, отклоняем промис
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }
  changeUserInfo(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({ name: data.name, about: data.about }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`); // если ошибка, отклоняем промис
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }
}

export { Api };
