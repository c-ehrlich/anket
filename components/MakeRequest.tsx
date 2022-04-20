import { useSession } from 'next-auth/react';
import React, { useState } from 'react';

const MakeRequest = () => {
  const [res, setRes] = useState<string>('');
  const [product, setProduct] = useState<string>('');
  const [survey, setSurvey] = useState<string>('');
  const {data: session, status} = useSession();

  const getRes = async () => {
    const data = await fetch('/api/hello');
    const json = await data.json();
    setRes(JSON.stringify(json));
  };

  const makeProduct = async () => {
    const data = await fetch('/api/product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: 'Test Product 123', creatorId: session?.user?.id }),

      credentials: 'same-origin',
    });
    const json = await data.json();
    setProduct(JSON.stringify(json));
  };

  const makeSurvey = async () => {
    const data = await fetch('/api/survey', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: 'Test Survey', description: 'Test Description', authorId: session?.user?.id }),

      credentials: 'same-origin',
    });
    const json = await data.json();
    setSurvey(JSON.stringify(json));
  }

  return (
    <div>
      <div>date: {res}</div>
      <button onClick={getRes}>Get data</button>
      <div>product res: {product}</div>
      <button onClick={makeProduct}>Make product</button>
      <div>survey res: {survey}</div>
      <button onClick={makeSurvey}>Make survey</button>
    </div>
  );
};

export default MakeRequest;
