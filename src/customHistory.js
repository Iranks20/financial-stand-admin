import { createHashHistory } from 'history';

const history = createHashHistory({
  hashType: 'slash', // Use "slash" to remove the leading "#/" from the URL
});

export default history;
