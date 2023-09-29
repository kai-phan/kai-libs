import React from 'react';

export type ItemProps = React.LiHTMLAttributes<HTMLLIElement>;

export const Item: React.FC<ItemProps> = (props) => {
  return <li {...props} />;
};
