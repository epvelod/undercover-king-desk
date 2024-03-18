import React from 'react';
import { useDispatch } from 'react-redux';
import { selection } from '../../redux/reducers';

export default function Piece({icon, pieceId, position}) {
  const dispatch = useDispatch();

  const handleSelection = () => {
    dispatch(selection({ pieceId, position }));
  };

  const key = `${pieceId}-${position}`;

  return (
    <div key={key} onClick={() => handleSelection()} >
        {icon}
    </div>
  );
}