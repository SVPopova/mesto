class UserInfo {
  constructor({ _id = '', nameProfile, aboutProfile, avatarProfile }) {
    this._name = nameProfile;
    this._about = aboutProfile;
    this._avatar = avatarProfile;
    this._id = _id;
  }
  getUserInfo() {
    const userInfo = {
      id: this._id,
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src,
    };
    return userInfo;
  }
  setUserInfo({ _id, name, about, avatar }) {
    const userInfo = this.getUserInfo();
    if (_id) {
      this._id = _id;
    }
    if (name) {
      userInfo.name = name;
      this._name.textContent = name;
    }
    if (about) {
      userInfo.about = about;
      this._about.textContent = about;
    }
    if (avatar) {
      userInfo.avatar = avatar;
      this._avatar.src = avatar;
    }
  }
  // setUserAvatar({  }) {
  //   const userInfo = this.getUserInfo();

  // }
}
export { UserInfo };
