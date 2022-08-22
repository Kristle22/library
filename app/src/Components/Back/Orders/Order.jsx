import { useContext } from 'react';
import BackContext from '../BackContext';

function Order({ order }) {
  const { setDeleteOrder, setStatus } = useContext(BackContext);

  function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const returnDate = addDays(Date.parse(order.order_date), 30).toJSON();

  const orderId = order.id;
  const handleConfirm = () => {
    setStatus({ id: orderId, returnDate });
  };
  console.log(returnDate);
  const handleDelete = () => {
    setDeleteOrder({ id: orderId });
  };
  // console.log('ORDER', order);

  return (
    <div className='container flex-row'>
      <div className='container frame-full order-7'>
        <p>{order.id}</p>
        <p>
          {order.order_date
            .slice(0, -5)
            .replace('T', ' ')}
        </p>
        <p>
          {JSON.stringify(order.return_date)
            .slice(1, -6)
            .replace('T', ' ')}
        </p>
        <p className='prc'>{order.name}</p>
        <p>{order.email}</p>
        <img className='img-box' src={order.photo} alt='book' />
        <div>
          <h5>{order.title}</h5>
          <i>{order.author}</i>
          <p>{order.ISBN}</p>
        </div>
      </div>
      <div className='btns order'>
        {order.status === 1 ? (
          <button type='button' className='edt book' onClick={handleConfirm}>
            CONFIRMED
          </button>
        ) : (
          <button type='button' className='edt book pending' onClick={handleConfirm}>
            NOT CONFIRMED
          </button>
        )}
        <button type='button' className='dlt book' onClick={handleDelete}>
          REM-OVE
        </button>
      </div>
    </div>
  );
}

export default Order;
