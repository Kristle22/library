import { useContext } from 'react';
import Row from './Row';
import FrontContext from '../FrontContext';
// import SortBtns from '../SortBtns';
import Filter from '../Filter';
import Search from '../Search';
import ComRow from './ComRow';
import OrderList from './Order/OrderList';

function List() {
  const { books, comments, orders, userId } = useContext(FrontContext);

  return (
    <>
      <div className='front-logo'></div>
      <h1 className='cart-heading'>Mano užsakymai</h1>
      {
        orders && orders.map(o => o.user_id === userId() ? <OrderList key={o.id} row={o} /> : null)
      }
      <div className='flex-card front'>
        <div style={{ display: 'flex' }}>
          <Filter />
          {/* <SortBtns /> */}
          <Search />
        </div>
        <div className='order-7'>
          {/* <h4>Photo</h4>
          <h4>Title</h4>
          <h4>Category</h4>
          <h4>Author</h4>
          <h4>Published</h4>
          <h4>Pages</h4>
          <h4>ISBN</h4> */}
        </div>
        {books ? books.map((b) => <Row key={b.id} row={b} />) : null}
        <div className='com frame row'>
          <h2>Komentarai ({comments && comments.map(c => c.com_count).reduce((acc, total) => acc + total)})</h2>
          {comments ? comments.map(com => <ComRow key={com.id} row={com} />) : null}
        </div>
      </div>
    </>
  );
}

export default List;
