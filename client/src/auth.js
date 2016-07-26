export function auth() {
  return fetch('http://localhost:3000/user')
    .then(res => {
      if (!res.ok) {
        throw Error(res.statusText);
      }
      return res.json();
      //if uid then check if current uid === logged in uid
      //if null reroute to login
     })
    .then(json => this.props.loginUser(json))
    .catch(err => console.log(err));
}
