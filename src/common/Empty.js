import React from 'react';

export const Empty = () => {
  return (
    <div className="text-center" style={{height: 'calc(100vh - 120px)', minHeight: 380}}>
      <h3>Nothing to display</h3>
      <div><img src="/nothing2do.png" alt="Empty container" style={{height: 300}}/></div>
    </div>
  );
}