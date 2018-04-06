const apiUrl = 'http://localhost:9000';
const headers = new Headers({ 'Content-Type': 'application/json' });

export const sendEmail = (message) => {
  return fetch(`${apiUrl}/mail`, {
    body: JSON.stringify(message),
    method: 'POST',
    mode: 'cors',
    headers: headers
  });
}

export const saveUser = (emailAddress) => {
  return fetch(`${apiUrl}/users`, {
    method: 'POST',
    mode: 'cors',
    headers: headers,
    body: JSON.stringify(emailAddress)
  });
}
