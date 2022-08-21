import { useContext } from 'react';
import Row from './Row';
import BackContext from '../BackContext';

function List() {
  const { comments } = useContext(BackContext);

  // const comTotal = comments && comments.map(c => c.status === 1 ? c.com_count : 0).reduce((acc, total) => acc + total, 0);

  const comTotal = comments && comments.map(c => c.com_count).reduce((acc, total) => acc + total, 0);

  return (
    <>
      <div className='heading'>
        <h2>COMMENTS({comTotal && comTotal})</h2>
      </div>
      <div className='flex-card'>
        <div className='flex-row'>
          {/* <h2>Admin Comments({comTotal && comTotal}):</h2> */}
        </div>
        {comments ? comments.map((c) => <Row key={c.id} row={c} />) : null}
      </div>
    </>
  );
}

export default List;
