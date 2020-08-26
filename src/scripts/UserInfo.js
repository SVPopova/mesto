class UserInfo {
  constructor({ nameProfile, aboutProfile, avatarProfile }) {
    this._name = nameProfile;
    this._about = aboutProfile;
    this._link = avatarProfile;
  }
  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      about: this._about.textContent,
      link: this._link.src,
    };
    return userInfo;
  }
  setUserInfo({ name, about }) {
    const userInfo = this.getUserInfo();

    userInfo.name = name;
    this._name.textContent = name;
    console.log(this._about);

    userInfo.about = about;
    this._about.textContent = about;
  }
  setUserAvatar({ link }) {
    const userInfo = this.getUserInfo();

    userInfo.link = link;
    this._link.src = link;
    console.log(link);
  }
}
export { UserInfo };
