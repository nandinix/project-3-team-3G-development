import './managerPage.css';
import React, { useState, useEffect } from 'react';
import { executeQuery } from './db';


function MyBox({name, size}) {
  return (
    <div style={{ width: size, height: size, margin: '20px', backgroundColor: 'lightgrey' }}>
      <center>
        <h2 style={{ fontFamily: 'Arial, sans-serif' }}>{name}</h2>
        
      </center>
    </div>
  );
}


function TestBox({ name, size}) {
  const [actualName, setActualName] = useState('');

  //Working sql query. dbServer must be run in order to establish a connection
  useEffect(() => {
    async function fetchMenuItem() {

      const query = 'SELECT name FROM menu_items WHERE menu_item_id = $1;';
      const params = [name];  // Use 'name' as menu_item_id
      try{
        const result = await executeQuery(query, params);
        setActualName(result[0].name); //result[row#].COLUMN
      } catch (error) {

        setActualName('error');
      }
  }

    fetchMenuItem();
  }, [name]);

  return (
    <div style={{ width: size, height: size, margin: '20px', backgroundColor: 'lightgrey' }}>
      <center>
        <h2 style={{ fontFamily: 'Arial, sans-serif' }}>{actualName}</h2>
      </center>
    </div>
  );
}

export default function ManagerPage() {
  return (
    <div className="full-background" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <MyBox name="Employee Manager" size='400px'/>
      <MyBox name="Data Dashboard" size='400px'/>
      <MyBox name="Inventory Manager" size='400px'/>
      <TestBox name="1" size='200px'/>
      <TestBox name="2" size='200px'/>
    </div>
    
  );
}