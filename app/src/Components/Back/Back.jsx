import { useEffect, useState, useRef, useReducer } from 'react';
import Reducer from './Reducer';
import BackContext from './BackContext';
import Nav from './Nav';
import BooksCrud from './Books/Crud'
import CatsCrud from './Cats/Crud';
import ComsCrud from './Comments/Crud';
import OrdersCrud from './Orders/Crud';
import axios from 'axios';
import { authConfig } from '../../Functions/auth';

function Back({ show }) {
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [message, setMessage] = useState(null);

  const [createData, setCreateData] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [editData, setEditData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);

  const [books, dispachBooks] = useReducer(Reducer, []);

  const fileInput = useRef();
  const [image, setImage] = useState(null);

  const [cats, setCats] = useState(null);
  const [createCat, setCreateCat] = useState(null);
  const [deleteCat, setDeleteCat] = useState(null);

  const [users, setUsers] = useState(null);
  const [orders, setOrders] = useState(null);
  const [status, setStatus] = useState(0);

  const [sort, setSort] = useState('0');
  const [filter, setFilter] = useState(0);
  const [search, setSearch] = useState('');

  // Optional state
  const [comments, setComments] = useState(null);
  const [deleteCom, setDeleteCom] = useState(null);


  const sorting = (e) => {
    const sortOrder = e.target.value;
    setSort(sortOrder);
    const action = {
      type: sortOrder,
    };
    dispachBooks(action);
  };

  const showMessage = (mes) => {
    setMessage(mes);
    setTimeout(() => setMessage(null), 5000);
  };
  // ///////////AXIOS GET/CREATE/DELETE/UPDATE DATA///////////
  // Read
  useEffect(() => {
    let query;
    if (filter === 0 && !search) {
      query = '';
    } else if (filter) {
      query = 'sm-id=' + filter;
    } else if (search) {
      query = '?s=' + search;
    }

    axios
      .get('http://localhost:3003/knygos' + query, authConfig())
      .then((res) => {
        const action = {
          type: 'main_list',
          payload: res.data,
        };
        dispachBooks(action);
      });
  }, [lastUpdate, filter, search]);

  // Create
  useEffect(() => {
    if (null === createData) return;
    axios
      .post('http://localhost:3003/knygos', createData, authConfig())
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [createData]);

  // Delete
  useEffect(() => {
    if (null === deleteData) return;
    axios
      .delete('http://localhost:3003/knygos/' + deleteData.id, authConfig())
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [deleteData]);

  // Edit
  useEffect(() => {
    if (null === editData) return;
    axios
      .put('http://localhost:3003/knygos/' + editData.id, editData, authConfig())
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [editData]);

  // /////////////AXIOS CATS////////////////
  // READ Cats
  useEffect(() => {
    axios.get('http://localhost:3003/kategorijos', authConfig()).then((res) => {
      setCats(res.data);
    });
  }, [lastUpdate]);

  // Create Cats
  useEffect(() => {
    if (null === createCat) return;
    axios
      .post('http://localhost:3003/kategorijos', createCat, authConfig())
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [createCat]);

  // Delete Cats
  useEffect(() => {
    if (null === deleteCat) return;
    axios
      .delete('http://localhost:3003/kategorijos/' + deleteCat.id, authConfig())
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [deleteCat]);

  /////////////////////////COMMENTS/PHOTO/STATUS//////////////////////////////
  // READ COMMENTS
  useEffect(() => {
    axios.get('http://localhost:3003/komentarai', authConfig()).then((res) => {
      setComments(res.data);
    });
  }, [lastUpdate]);

  // DELETE COMMENT
  const handleDeleteCom = (id) => {
    axios
      .delete('http://localhost:3003/komentarai/' + id, authConfig())
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  };

  // READ ORDERS
  useEffect(() => {
    axios.get('http://localhost:3003/uzsakymai', authConfig()).then((res) => {
      setOrders(res.data);
    });
  }, [lastUpdate]);

  // Read USERS
  useEffect(() => {
    axios.get('http://localhost:3003/uzsakymai', authConfig()).then((res) => {
      setUsers(res.data);
    });
  }, [lastUpdate]);

  // Edit STATUS
  useEffect(() => {
    if (null === status) return;
    axios
      .put('http://localhost:3003/statusas/' + status.id, status, authConfig())
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [status]);

  return (
    <BackContext.Provider
      value={{
        books,
        cats,
        fileInput,
        image,
        setImage,
        setCreateData,
        setDeleteData,
        setCreateCat,
        setDeleteCat,
        modalData,
        setModalData,
        setEditData,
        sort,
        sorting,
        filter,
        setFilter,
        setSearch,
        message,
        status,
        setStatus,
        handleDeleteCom,
        comments,
        orders,
      }}
    >
      {show === 'admin' ? (
        <>
          <Nav />
          <div className='admin'>
            <div className='center'>
              <img
                src={require('../../img/admin-1.png')}
                alt='admin panel'
                style={{
                  maxWidth: '350px',
                  opacity: '0.5'
                }}
              />
            </div>
          </div>
        </>
      ) : show === 'books' ? (
        <BooksCrud />
      ) : show === 'cats' ? (
        <CatsCrud />
      ) : show === 'comments' ? (
        <ComsCrud />
      ) : show === 'orders' ? (
        <OrdersCrud />
      ) : null}
    </BackContext.Provider>
  );
}

export default Back;
