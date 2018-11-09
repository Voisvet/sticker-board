import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

// --------------------------------------------------
//
//  Main component
//
// --------------------------------------------------

const PeriodsList = (props) => {
  let periodsList =  props.periods.map(period => {
    let text = convertToText(period);
    return (
      <ListItem key={text}>
        <ListItemText primary={text} />
      </ListItem>
    );
  });

  return <List>{periodsList}</List>;
};

// --------------------------------------------------
//
//  Other supporting stuff
//
// --------------------------------------------------

const months = [
  undefined, 'January', 'February',
  'March', 'April', 'May', 'June',
  'July', 'August', 'September',
  'October', 'November', 'December'
];

const days_of_week = [
  undefined, 'Monday', 'Tuesday', 'Wednesday',
  'Thursday', 'Friday', 'Saturday', 'Sunday'
];

function convertToText(period) {
  let text = 'Every '
  if (days_of_week[period.day_of_week]) {
    text = text + days_of_week[period.day_of_week] + ' ';
  } else {
    text = text + period.day + ' ';
  }
  if (months[period.month]) {
    text = text + 'of ' + months[period.month] + ' ';
  } else {
    text = text + 'of every month ';
  }
  text = text + 'at ' + period.hour + ':';
  if (period.minute < 10) {
    text = text + '0' + period.minute;
  } else {
    text = text + period.minute;
  }

  return text;
}

// --------------------------------------------------
//
//  Export section
//
// --------------------------------------------------

export default PeriodsList;
