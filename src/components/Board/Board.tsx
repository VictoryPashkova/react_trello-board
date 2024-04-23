import React from 'react';
import { useSelector } from 'react-redux';

import { selectColumns } from '../../redux/reducers/selectors';
import Column from '../Column/Column';

const Board: React.FC = () => {
  const columns = useSelector(selectColumns);

  return (
    <div className="board">
      {columns.map(({ columnId, columnTitle }) => {
        if (columnId && columnTitle) {
          return <Column key={columnId} columnTitle={columnTitle} columnId={columnId} />;
        }
      })}
    </div>
  );
};

export default Board;
