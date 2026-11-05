const xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:3000/trilhas');
xhr.addEventListener('load', () => {
  if (xhr.status === 200) console.log(JSON.parse(xhr.responseText));
});
xhr.send();
