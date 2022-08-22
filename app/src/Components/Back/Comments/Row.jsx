import { useContext } from 'react';
import BackContext from '../BackContext';
// import StatusBtns from './StatusBtns';

function Row({ row }) {
  const { handleDeleteCom } = useContext(BackContext);

  return (
    <div className=' com flex-col'>
      <img
        className='img-box pad'
        src={row.photo ? row.photo : null}
        alt='coat of arms'
      />
      <div className="flex-nw line-w">
        <h2 className='heading-sm'>
          {row.title}
        </h2>
        <h4>
          {row.author}
        </h4>
      </div>
      <h3>Comments({row.com_count})</h3>
      <ul>
        {row.coms && row.coms.slice(0, -5).split('-^-^-,').map((c, i) => <div className='flex-nw'><li key={i} className='flex-col'>{c.split('#').map(el => <i>{el}</i>)}</li>
          <button type='button' className='dlt' style={{ marginBottom: '25px' }} onClick={() => handleDeleteCom(row.coms_id.split(',')[i])}>
            <svg><use href='#Delete' /> </svg>
          </button></div>)}
      </ul>
      {/* <StatusBtns row={row} /> */}
    </div >
  );
}

export default Row;
