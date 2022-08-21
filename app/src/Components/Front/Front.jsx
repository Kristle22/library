import { useEffect, useState, useReducer } from 'react';
import Reducer from './Reducer';
import FrontContext from './FrontContext';
import Crud from './Components/Crud';
import axios from 'axios';
import { authConfig } from '../../Functions/auth';

function Front({ show }) {
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [message, setMessage] = useState(null);

  const [books, dispachBooks] = useReducer(Reducer, []);
  const [cats, setCats] = useState(null);

  const [reviewModal, setReviewModal] = useState(null);

  const [orderModal, setOrderModal] = useState(null);
  const [orderCreate, setOrderCreate] = useState(null);

  // const [sort, setSort] = useState(0);
  const [filter, setFilter] = useState(0);
  const [search, setSearch] = useState('');

  const [rate, setRate] = useState(0);
  const [com, setCom] = useState('');
  const [createRates, setCreateRates] = useState(null);
  const [createCom, setCreateCom] = useState(null);

  const [comments, setComments] = useState(null);

  const [users, setUsers] = useState(null);
  const [orders, setOrders] = useState(null);

  const showMessage = (mes) => {
    setMessage(mes);
    setTimeout(() => setMessage(null), 5000);
  };

  // const sorting = (e) => {
  //   const sortOrder = e.target.value;
  //   setSort(sortOrder);
  //   const action = {
  //     type: sortOrder,
  //   };
  //   dispachBooks(action);
  // };

  // Read & queries FRONT
  useEffect(() => {
    let query;
    if (filter === 0 && !search) {

      query = '';
    } else if (filter) {
      query = '?cat-id=' + filter;
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

  // Simple Read FRONT cats
  useEffect(() => {
    axios.get('http://localhost:3003/kategorijos', authConfig()).then((res) => {
      setCats(res.data);
    });
  }, [lastUpdate]);

  // Simple Read FRONT coms
  useEffect(() => {
    axios.get('http://localhost:3003/komentarai', authConfig()).then((res) => {
      setComments(res.data);
    });
  }, [lastUpdate]);

  // CREATE Comments
  useEffect(() => {
    if (null === createCom) return;
    axios
      .post(
        'http://localhost:3003/komentarai',
        createCom,
        authConfig()
      )
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [createCom]);

  // CREATE RATING
  useEffect(() => {
    if (null === createRates) return;
    axios
      .put(
        'http://localhost:3003/reitingai/' + createRates.id,
        createRates,
        authConfig()
      )
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [createRates]);

  // CREATE Order
  useEffect(() => {
    if (null === orderCreate) return;
    axios
      .post(
        'http://localhost:3003/uzsakymai',
        orderCreate,
        authConfig()
      )
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [orderCreate]);

  // Read Orders
  useEffect(() => {
    axios.get('http://localhost:3003/uzsakymai', authConfig()).then((res) => {
      setOrders(res.data);
    });
  }, [lastUpdate]);

  // //////////////GET USER//////////////////
  // Read USERS
  useEffect(() => {
    axios.get('http://localhost:3003/users', authConfig()).then((res) => {
      setUsers(res.data);
    });
  }, [lastUpdate]);

  function getUser() {
    return localStorage.getItem('username');
  }

  function userId() {
    const userId = users.filter((user) => user.name === getUser())[0].id;
    return userId;
  }
  // console.log(getUser(), userId());

  return (
    <FrontContext.Provider
      value={{
        getUser,
        userId,
        books,
        cats,
        message,
        showMessage,
        setFilter,
        setSearch,
        // sorting,
        reviewModal,
        setReviewModal,
        orderModal,
        setOrderModal,
        setOrderCreate,
        rate,
        setRate,
        com,
        setCom,
        setCreateCom,
        setCreateRates,
        comments,
        orders,
      }}
    >
      {show === 'welcome' ? (
        <Crud />
      ) : null}
    </FrontContext.Provider>
  );
}

export default Front;
