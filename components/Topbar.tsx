import React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

function Topbar({ tasksItems }) {

  return (
    <>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={tasksItems.map((option) => option.title)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search task..."
            InputProps={{
              ...params.InputProps,
              type: 'search',
              style: {
                borderRadius: '15px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
              }
            }}
          />
        )}
      />
    </>
  )
}

export default Topbar