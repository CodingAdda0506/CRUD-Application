import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

const App = () => {

  const [foodName, setFoodName] = useState('');
  const [newFoodName, setNewFoodName] = useState('');
  const [daysSinceEaten, setDaysSinceEaten] = useState(0);
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:6969/display');
        const data = response.data;
        setList(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const Add = async () => {
    try {
      await axios.post("http://localhost:6969/", {
        foodName: foodName,
        daysSinceEaten: daysSinceEaten,
      });
      alert("Data Successfully Added");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  const Delete = async (id) => {
    try {
      await axios.delete(`http://localhost:6969/delete/${id}`);
      alert("Data Succesfully Deleted");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  const Update = async (id) => {
    try {
      await axios.put(`http://localhost:6969/update/${id}`, {
        id: id,
        newFoodName: newFoodName,
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='App'>
      <h2>CRUD App Using MERN</h2>

      <h3>Add Food</h3>
      <input type="text" onChange={(e) => setFoodName(e.target.value)} />
      <h3>Days Since Eaten</h3>
      <input type="number" onChange={(e) => setDaysSinceEaten(e.target.value)} />

      <button onClick={Add}>Add</button>

      <br />
      All Foods

      {list.map((value, key) => {
        return <div key={key}>
          <div className="container">
            <ul className="responsive-table">
              <li className="table-header">
                <div className="col col-1">Food Name</div>
                <div className="col col-2">Days Since Eaten</div>
              </li>
              <li className="table-row">
                <div className="col col-1" >{value.foodName}</div>
                <div className="col col-2" >{value.daysSinceEaten}</div>
              </li>
            </ul>

            <input type="text" placeholder='Replace Name' onChange={(e) => setNewFoodName(e.target.value)} />
            <button onClick={() => Update(value._id)}>Update</button>
            <button onClick={() => Delete(value._id)}>Delete</button>
          </div>
        </div>
      })}
    </div>
  )
}

export default App