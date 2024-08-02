"use client"

import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { message, Select } from 'antd';
import { postData } from '@/actions/postData';

export default function Home() {
  const [data, setData] = useState({});
  const [response, setResponse] = useState({});
  const [filter, setFilter] = useState({});

  const options = [
    { label: "Numbers", value: "numbers" },
    { label: "Highest Alphabet", value: "highest_alphabet" }
  ];

  console.log(response);

  const handleChange = (e) => {
    setFilter(e);
  };

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(data);
      const response = await postData(parsedData);
      if (response) {
        message.success("Data processed");
        console.log(response);
        setResponse(response?.data);
      }
    } catch (err) {
      message.error(err?.response?.data?.error || err);
    };
  };

  return (
    <div className='min-h-screen flex flex-col justify-center items-center'>
      <div className='w-[400px] space-y-8'>
        <TextField
          id="outlined-basic"
          label="API Input"
          variant="outlined"
          className='w-full'
          onChange={(e) => setData(e.target.value)}
        />
        <button
          className='w-full py-2 rounded-md bg-blue-400 hover:bg-blue-500 transition-colors duration-200'
          onClick={handleSubmit}
        >
          Submit
        </button>
        <Select
          mode="multiple"
          className='h-12'
          allowClear
          style={{
            width: '100%',
          }}
          placeholder="Multi Filter"
          onChange={handleChange}
          options={options}
        />
        {response?.length > 0 && (
          <div>
            <p>Filtered Response</p>
            <p>{response[filter]}</p>
          </div>
        )}
      </div>
    </div>
  );
}
