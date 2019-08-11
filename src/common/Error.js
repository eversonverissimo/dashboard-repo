import React from 'react';

export const Error = () => {
  return (
    <div className="text-center" style={{minHeight: 300}}>
      <h3>Something went wrong</h3>
      <div><img src="/sad.png" alt="Sad Face" /></div>
    </div>
  );
}