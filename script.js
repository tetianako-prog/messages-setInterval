const message = document.querySelector('.shown-message');
const list = document.querySelector('.list');
const input = document.querySelector('.input');
const addForm = document.querySelector('.add-form');
const block = document.querySelector('.block');

const messagesArr = [
  { id: 1, text: 'message 1', enable: true },
  { id: 2, text: 'message 2', enable: true },
  { id: 3, text: 'message 3', enable: true },
  { id: 4, text: 'message 4', enable: true },
  { id: 5, text: 'message 5', enable: true },
  { id: 6, text: 'message 6', enable: true },
  { id: 7, text: 'message 7', enable: true },
];

function createMarkup() {
  const markup = messagesArr
    .map(item => {
      return `<li data-id="${item.id}" data-enable="${item.enable}">${item.text}</li>`;
    })
    .join('');
  return markup;
}

function renderList() {
  const markup = createMarkup();
  list.insertAdjacentHTML('beforeend', markup);
}
renderList();

function showMessage() {
  let i = 0;
  let messages = [];
  let len = messagesArr.length;
  go();
  setInterval(go, 4000);
  function go() {
    messages = messagesArr.filter(item => item.enable);
    if (messages.length === 0) {
      return;
    }
    if (messages.length < len && i !== 0) {
      i--;
    }
    len = messages.length;
    message.dataset.messageId = messages[i].id;
    message.textContent = messages[i].text;
    setTimeout(() => {
      message.textContent = '';
    }, 3000);

    if (i == messages.length - 1) {
      i = 0;
    } else {
      i++;
    }
  }
}

showMessage();

addForm.addEventListener('submit', e => {
  e.preventDefault();
  let id = messagesArr.length + 1;
  const element = `<li data-id="${id}" data-enable="true">${input.value}</li>`;
  messagesArr.push({ id, text: input.value, enable: true });
  list.insertAdjacentHTML('beforeend', element);

  input.value = '';
});

block.addEventListener('click', () => {
  const id = message.dataset.messageId;
  const liEl = document.querySelector(`[data-id="${id}"]`);
  liEl.dataset.enable = false;
  const spanRef = liEl.querySelector('.blocked');
  if (!spanRef) {
    liEl.insertAdjacentHTML('beforeend', '<span class="blocked">&#215;</span>');
    liEl.style.color = 'red';
  }
  messagesArr.forEach(item => {
    if (item.id == id) {
      item.enable = false;
    }
  });
});
