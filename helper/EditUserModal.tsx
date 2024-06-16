import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button as DialogButton,
} from '@mui/material'
import separateWords from '../lib/separate-words'

function EditUserModal({ open, handleClose, userData }) {
  const [editedData, setEditedData] = useState(userData)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSaveChanges = () => {
    console.log(editedData);
    handleClose();
  }

  const renderField = (key, value) => {
    if (Array.isArray(value)) {
      return (
        <div key={key}>
          <strong>
            {separateWords(key.charAt(0).toUpperCase() + key.slice(1))}:
          </strong>
          {value.map((item, index) => {
            if (typeof item === 'object') {
              return (
                <div key={index}>
                  {Object.entries(item).map(([nestedKey, nestedValue]) => (
                    <TextField
                      key={nestedKey}
                      label={
                        `${separateWords(nestedKey.charAt(0).toUpperCase() +
                          nestedKey.slice(1))}`
                      }
                      name={`${key}_${index}_${nestedKey}`}
                      value={nestedValue}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                    />
                  ))}
                </div>
              )
            } else {
              return (
                <TextField
                  key={index}
                  label={
                    `${separateWords(key.charAt(0).toUpperCase() +
                      key.slice(1))} ${index + 1}`
                  }
                  name={`${key}_${index}`}
                  value={item}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
              )
            }
          })}
        </div>
      )
    } else if (typeof value === 'object') {
      return (
        <div key={key}>
          <strong>
            {separateWords(key.charAt(0).toUpperCase() + key.slice(1))}:
          </strong>
          {Object.entries(value).map(([nestedKey, nestedValue]) => (
            <TextField
              key={nestedKey}
              label={
                `${separateWords(nestedKey.charAt(0).toUpperCase() +
                  nestedKey.slice(1))}`
              }
              name={`${key}_${nestedKey}`}
              value={nestedValue}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
          ))}
        </div>
      )
    } else {
      return (
        <TextField
          key={key}
          label={separateWords(key.charAt(0).toUpperCase() + key.slice(1))}
          name={key}
          value={value}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
      )
    }
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Your Account Info</DialogTitle>
      <DialogContent>
        {Object.entries(editedData).map(([key, value]) => renderField(key, value))}
      </DialogContent>
      <DialogActions>
        <DialogButton onClick={handleClose} color="error">
          Cancel
        </DialogButton>
        <DialogButton onClick={handleSaveChanges} color="success">
          Save Changes
        </DialogButton>
      </DialogActions>
    </Dialog>
  )
}

export default EditUserModal