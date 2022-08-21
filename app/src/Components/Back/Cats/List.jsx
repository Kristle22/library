import Row from './Row';
import { useContext } from 'react';
import BackContext from '../BackContext';

function List() {
  const { cats } = useContext(BackContext);
  return (
    <>
      <div
        className='flex-card'
        style={{
          maxWidth: '500px',
          minWidth: '200px',
          margin: '10px  0 0 50px ',
        }}
      >
        <div className='heading' style={{ margin: '30px 0 0 0' }}>
          <h2>All Books' Categories</h2>
        </div>
        <ul className='frame flex-row'>
          {cats
            ? cats.map((c) => <Row key={c.id} row={c} />)
            : null}
        </ul>
      </div>
    </>
  );
}

export default List;
