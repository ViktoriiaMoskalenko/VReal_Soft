import React from 'react';
import { useTranslation } from 'react-i18next';

const DateDisplay = () => {
  const { t } = useTranslation();

  const months = [
    t('months.january'),
    t('months.february'),
    t('months.march'),
    t('months.april'),
    t('months.may'),
    t('months.june'),
    t('months.july'),
    t('months.august'),
    t('months.september'),
    t('months.october'),
    t('months.november'),
    t('months.december'),
  ];

  const days = [
    t('days.sunday'),
    t('days.monday'),
    t('days.tuesday'),
    t('days.wednesday'),
    t('days.thursday'),
    t('days.friday'),
    t('days.saturday'),
  ];

  const currentDate = new Date();
  const date = `${days[currentDate.getDay()]}, ${currentDate.getDate()} ${
    months[currentDate.getMonth()]
  }`;

  return <span>{date}</span>;
};

export default DateDisplay;
