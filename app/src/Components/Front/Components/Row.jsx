// import Comment from './Comment';
// import Rating from './Rating';
import { useContext } from 'react';
import FrontContext from '../FrontContext';
import ReviewModal from './ReviewModal';

function Row({ row }) {
  const { setReviewModal } = useContext(FrontContext);

  return (
    < div className="flex book">
      <div className='flex-col book frame'>
        <img
          className='pad'
          src={row.photo}
          alt='book'
        />
        <h2>{row.title}</h2>
        <h3>{row.author}</h3>
        <u>{row.cat}</u>
        <h3>Išleista: {row.published}</h3>
        <h3>Puslapiai: {row.pages}</h3>
        <h3>ISBN: {row.ISBN}</h3>
        <div className="flex-row short">
        </div>
        <div className='rateIt'>
          {/* <p className='heading'>{row.rating.toFixed(2)}</p> */}
          <svg><use href='#rating' /></svg>
          <div>
            <p className='heading '>{row.rate_sum ? (row.rate_sum / row.rates).toFixed(2) : '0.00'}</p>
            <i>Įvertino ({row.rates})</i>
          </div>
          <button className='order' onClick={() => setReviewModal(row)}>Įvertink ir tu!</button>
          <ReviewModal row={row} />
        </div>
      </div>
      <div className="flex">
      </div>
    </div>
  );
}

export default Row;
