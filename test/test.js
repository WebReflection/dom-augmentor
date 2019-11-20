require('basichtml').init();
const {
  augmentor,
  useEffect,
  useRef,
  useState
} = require('../cjs');

const NoEffect = () => augmentor(text => {
  const [i, increment] = useState(0);
  const {current: button} = useRef(createButton());
  button.textContent = `${text} ${i}`;
  button.onclick = () => increment(i + 1);
  return button;
});

NoEffect()('nope');

const Button = () => augmentor(text => {
  useEffect(
    () => {
      console.log('connected');
      return () => console.log('disconnected');
    },
    []
  );
  const [i, increment] = useState(0);
  const {current: button} = useRef(createButton());
  button.textContent = `${text} ${i}`;
  button.onclick = () => increment(i + 1);
  return button;
});

const Unknown = () => augmentor(text => {
  useEffect(
    () => {
      console.log('connected');
      return () => console.log('disconnected');
    },
    []
  );
  const [i, increment] = useState(0);
  return {
    valueOf: () => createButton()
  };
});

const Nope = () => augmentor(text => {
  useEffect(
    () => {
      console.log('connected');
      return () => console.log('disconnected');
    },
    []
  );
  return {};
});

const Maybe = () => augmentor(text => {
  useEffect(
    () => {
      console.log('connected');
      return () => console.log('disconnected');
    }
  );
  return {};
});

const Never = () => augmentor(text => {
  useEffect(
    () => {
      console.log('connected');
      return () => console.log('disconnected');
    },
    [1]
  );
  return {};
});

const Many = () => augmentor(text => {
  useEffect(
    () => {
      console.log('connected');
      return () => console.log('disconnected');
    },
    []
  );
  const fragment = document.createDocumentFragment();
  fragment.appendChild(document.createTextNode());
  fragment.appendChild(createButton()).textContent = text;
  return fragment;
});

const Thrower = () => augmentor(() => {
  useEffect(
    () => {
      console.log('connected');
      return () => console.log('disconnected');
    },
    []
  );
  return document.createDocumentFragment();
});

const button = Button()('hello');
const unknown = Unknown()('darkness');

Nope()();

Maybe()();
Never()();


document.body.appendChild(button);
document.body.appendChild(unknown);
document.body.appendChild(Many()('test'));

button.click();
button.dispatchEvent(event('connected'));
button.dispatchEvent(event('disconnected'));

try {
  Thrower()();
  console.assert(false);
} catch(ok) {
  console.log('all good');
}

function createButton() {
  return document.createElement('button');
}

function event(type) {
  const e = document.createEvent('Event');
  e.initEvent(type, false, false);
  return e;
}
