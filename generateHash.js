import { hash } from 'bcrypt';

const password = 'password';  // Replace with your desired admin password

// Hash the password
hash(password, 10, (err, hashedPassword) => {
  if (err) throw err;
  console.log('Hashed Password:', hashedPassword);
});
