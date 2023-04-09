import React, { useState } from 'react';
import { DatePicker } from '@mui/lab';
import { TextField } from '@mui/material';

const DateField = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <DatePicker
      label="Basic date field"
      value={selectedDate}
      onChange={handleDateChange}
      renderInput={(params) => <TextField {...params} />}
    />
  );
};

export default DateField;
