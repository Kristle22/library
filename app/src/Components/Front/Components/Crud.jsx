import Nav from '../Nav';
import List from './List';
import Message from '../Message';
// import Comment from './Comment';

function Crud() {
  return (
    <>
      <div className='container'>
        <Nav />
        <List />
        <Message />
        {/* <Comment /> */}
      </div>
    </>
  );
}

export default Crud;
