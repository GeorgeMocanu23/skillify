import React from 'react';
import { CardContent, Typography } from '@mui/material';

function MessageCard({ content, backgroundColor }:
  { content: string; backgroundColor: string }) {
  return (
    <CardContent
      style={{
        background: backgroundColor,
        padding: '8px',
        marginBottom: '8px'
      }}
    >
      <Typography variant='body1'>{content}</Typography>
    </CardContent>
  );
}

export default MessageCard;