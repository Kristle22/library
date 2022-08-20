import { useContext, useState } from 'react';
import FrontContext from './FrontContext';

function Filter() {
  const { setFilter, cats } = useContext(FrontContext);
  const [color, setColor] = useState(0);

  const filtering = (e) => {
    setColor(e.target.value);
    setFilter(Number(e.target.value));
  };

  return (
    <>
      <select
        className='sorting'
        value={color}
        onChange={filtering}
        style={{ maxWidth: '160px' }}
      >
        <option value='0'>Choose Category</option>
        {cats &&
          cats.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.title}
            </option>
          ))}
      </select>
    </>
  );
}

export default Filter;
