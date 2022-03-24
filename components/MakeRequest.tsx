import React, { useState } from 'react';

const MakeRequest = () => {
  const [res, setRes] = useState<string>('');

  const getRes = async () => {
    const data = await fetch('/api/hello');
    const json = await data.json();
    setRes(JSON.stringify(json));
  };
  return (
    <div>
      <div>date: {res}</div>
      <button onClick={getRes}>Get data</button>
    </div>
  );
};

export default MakeRequest;
