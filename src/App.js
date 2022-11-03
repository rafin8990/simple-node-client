import { useEffect, useState } from 'react';
import './App.css';
function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handleAddUser = (event) => {
    event.preventDefault()
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email }
    console.log(user)
    fetch('http://localhost:5000/users',{
      method:'POST',
      headers:{
        'content-type': 'application/json',
      },
      body: JSON.stringify(user)
    })
    .then(res=>res.json())
    .then(data=>{
      const newUsers=[...users, data];
      setUsers(newUsers)
      console.log(data)
    })
    .catch(error=>console.error(error));
    event.target.reset();

  }

  return (
    <div className="App">
      <h2>total users: {users.length}</h2>
      <form onSubmit={handleAddUser}>
        <input type='Text' name='name' placeholder='name' />
        <br />
        <input type='Email' name='email' placeholder='email' />
        <br />
        <br />
        <button type=' submit'>Add User</button>
      </form>

      <div>
        {
          users.map(user=> <p>{user?.email}</p>)
        }
      </div>
    </div>
  );
}

export default App;
