import connection from '../config/axiosConnection';

const create = (data) => {
  return connection.post('', data);
};

const update = (id, data) => {
  return connection.put(`/${id}`, data);
};

const remove = (id) => {
  return connection.delete(`/${id}`);
};

const find = () => {
  return connection.get();
};

const filterByName = (filter) => {
  return connection.get(`/filter?value=${filter}`);
};

const filterByDate = (period) => {
  return connection.get(`?period=${period}`);
};

export {
  create, 
  update,
  remove,
  filterByDate, 
  filterByName,
  find
};