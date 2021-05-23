const md5 = require('md5');
//globally recognized avatar
const gravatar = (email) => {
  const hash = md5(email);
  return `https://www.gravatar.com/avatar/${hash}.jpg?d=identicon`;
};
module.exports = gravatar;
