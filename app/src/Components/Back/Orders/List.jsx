import { useContext } from 'react';
import BackContext from '../BackContext';
import Order from './Order';

function List() {
  const { orders } = useContext(BackContext);
  console.log('ORDERS', orders);

  return (
    <>
      <div className='heading'>
        <h2>List of Orders:</h2>
      </div>
      {/* <Search /> */}
      <div className='flex-card'>
        <div className="container flex-row">
          <div className='flex-row order-7 padX'>
            <h5>Order ID</h5>
            <h5>Order Date</h5>
            <h5>Return Date</h5>
            <h5>Name</h5>
            <h5>Email</h5>
            <h5>Book Photo</h5>
            <h5>Book Info</h5>
          </div>
        </div>
        {orders &&
          orders.map((order) => <Order key={order.id} order={order} />)}
      </div>
    </>
  );
}

export default List;
