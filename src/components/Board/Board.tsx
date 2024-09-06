import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { selectColumns } from '../../redux/reducers/selectors';
import Column from '../Column/Column';

const BoardContainer = styled.div`
  margin-left: 0;
  margin-right: 0;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 15px;
`;

const Board: React.FC = () => {
  const columns = useSelector(selectColumns);

  return (      
      <BoardContainer>
        {columns.map(({ columnId, columnTitle }) => {
          if (columnId && columnTitle) {
            return <Column key={columnId} columnTitle={columnTitle} columnId={columnId} />;
          }
        })}
      </BoardContainer>
  );
};

export default Board;
