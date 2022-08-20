import { useContext } from 'react';
import BackContext from '../BackContext';

function Row({ row }) {
  const { setDeleteData, setModalData } = useContext(BackContext);
  const handleDelete = () => {
    setDeleteData(row);
  };
  const handleModal = () => {
    setModalData(row);
  };

  return (
    <>
      <div className='order-7 frame'>
        <img
          src={row.photo}
          alt='some_outfit'
        />
        <p>{row.title}</p>
        <p>{row.cat}</p>
        <p>{row.author}</p>
        <p>{Number(row.published)}</p>
        <p>{Number(row.pages)}</p>
        <p>{row.ISBN}</p>
      </div>
      <div className='btns row'>
        <button type='button' className='edt' onClick={handleModal}>
          <svg>
            <use href='#Edit' />
          </svg>
        </button>
        <button type='button' className='dlt' onClick={handleDelete}>
          <svg>
            <use href='#Delete' />
          </svg>
        </button>
      </div>
    </>
  );
}

export default Row;
