import { useContext } from 'react';
import Row from './Row';
import BackContext from '../BackContext';
// import Search from '../Search';
// import Filter from '../Filter';
// import SortBtns from '../SortBtns';

function List() {
  const { books } = useContext(BackContext);

  return (
    <>
      <div className='heading' style={{ marginTop: '30px' }}>
        <h2>List of Books</h2>
      </div>
      <div className='flex-card'>
        <div className="flex-nw sb">
          {/* <Search /> */}
          {/* <Filter /> */}
          {/* <SortBtns /> */}
        </div>
        <div className='order-7 short'>
          <h4>Photo</h4>
          <h4>Title</h4>
          <h4>Category</h4>
          <h4>Author</h4>
          <h4>Published</h4>
          <h4>Pages</h4>
          <h4>ISBN</h4>
        </div>
        {books ? books.map((b) => <Row key={b.id} row={b} />) : null}
      </div>
    </>
  );
}

export default List;
