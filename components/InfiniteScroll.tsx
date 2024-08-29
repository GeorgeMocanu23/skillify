import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { useSession } from "next-auth/react";

function InfiniteScroll() {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const [renderedContext, setRenderedContext] = useState('task');
  const [elements, setElements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [randomUserIds, setRandomUserIds] = useState([]);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  if (!userId) {
    return <Typography>Unauthorized</Typography>;
  }

  const fetchPost = useCallback(async (userId) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/profile/${renderedContext}?userId=${session.user.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (!data.error && data[renderedContext].length > 0) {
        const visibleElements = data[renderedContext].filter(item => item.visibility === 'PUBLIC');
        setElements(prevElements => [...prevElements, ...visibleElements]);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }, [renderedContext]);

  useEffect(() => {
    const newRandomUserId = randomUserIds[randomUserIds.length - 1];
    fetchPost(newRandomUserId);
  }, [fetchPost, randomUserIds]);

  const handleIntersection = (entries) => {
    if (entries[0].isIntersecting && !isLoading) {
      const newRandomUserId = Math.floor(Math.random() * 10) + 1;
      setRandomUserIds(prevIds => [...prevIds, newRandomUserId]);
    }
  };

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    });

    const marker = document.getElementById('scroll-marker');
    if (marker) {
      observer.observe(marker);
    }

    observerRef.current = observer;

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [elements, isLoading]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        minHeight: '100vh',
        overflowY: 'auto', // Enable scrolling within this container
      }}
    >
      {elements.map((element, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '10px',
            padding: '10px',
            border: '1px solid black',
            borderRadius: '5px',
            width: '100%',
            maxWidth: '600px', // Add a max width to prevent overly wide elements
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          <Typography variant="h5">Title: {element.title}</Typography>
          <Typography variant="body2">Description: {element.description}</Typography>
          <Typography variant="body2">Status: {element.status}</Typography>
          <Typography variant="body2">Start date: {element.startDate}</Typography>
          <Typography variant="body2">End date: {element.endDate}</Typography>
          <Typography variant="body2">Priority: {element.priority}</Typography>
          <Typography variant="body2">Importance: {element.importance}</Typography>
          <Typography variant="body2">Visibility: {element.visibility}</Typography>
          <Typography variant="body2">User id: {element.userId}</Typography>
          <Typography variant="body2">Element id: {element.id}</Typography>
        </Box>
      ))}
      <div id="scroll-marker" style={{ height: '1px' }}></div>
      {isLoading && <Typography>Loading...</Typography>}
    </Box>
  );
}

export default InfiniteScroll;
