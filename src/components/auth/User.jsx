import React, { useState, useEffect } from 'react';
import { getUsers } from './api';

function Users() {
/*   const [users, setUsers] = useState([]);

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken');
    if (!jwtToken) {
      // JWT가 없을 경우 로그인 페이지로 이동
    } else {
      const fetchUsers = async () => {
        const response = await getUsers();
        setUsers(response.data);
      };
      fetchUsers();
    }
  }, []); */

  return (
    <ul>
{/*       {users.map((user) => (
        <li key={user.id}>{user.username}</li>
      ))} */}
    </ul>
  );
}

export default Users;