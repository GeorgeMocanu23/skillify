import React from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { Card, CardContent, useMediaQuery } from '@mui/material'

function DateCalendarBasic() {
  const isSmallScreen = useMediaQuery('(max-width:600px)')

  return (
    <>
      <Card
        style={{
          //marginTop: isSmallScreen ? '5px' : '0',
          margin: '5px',
          borderRadius: '15px',
          maxWidth: isSmallScreen ? '100%' : '340px',
          maxHeight: isSmallScreen ? '100%' : '340px',
          //boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
        }}
        elevation={3}
      >
        <CardContent style={{ padding: '1px' }}>
          <LocalizationProvider dateAdapter= { AdapterDayjs } >
            <DateCalendar />
          </LocalizationProvider>
        </CardContent>
      </Card>
    </>
  )
}

export default DateCalendarBasic