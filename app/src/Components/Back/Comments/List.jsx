import { useContext } from 'react';
import Row from './Row';
import BackContext from '../BackContext';

function List() {
  const { comments } = useContext(BackContext);

  const comTotal = comments && comments.map(c => c.com_count).reduce((acc, total) => acc + total, 0);

  return (
    <>
      <div className='heading'>
        <h2>COMMENTS({comTotal && comTotal})</h2>
      </div>
      <div className='flex-card'>
        <div className='flex-row'>
        </div>
        {comments ? comments.map((c) => <Row key={c.id} row={c} />) : null}
      </div>
    </>
  );
}

export default List;
