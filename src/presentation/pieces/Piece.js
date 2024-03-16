import React, { useState } from 'react';

export default function Piece({icon, behavior}) {
  return (
    <div onClick={() => behavior.onClick()}>
        {icon}
    </div>
  );
}