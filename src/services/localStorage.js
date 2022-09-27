const USER = 'user';

const saveEmail = (email) => localStorage.setItem(USER, JSON.stringify(email));

// const readEmail = () => {
//   if (!JSON.parse(localStorage.getItem(EMAIL))) {
//     localStorage.setItem(EMAIL, JSON.stringify());
//   }
//   const email = JSON.parse(localStorage.getItem(EMAIL));
//   saveEmail(email);
// };

export default saveEmail;
