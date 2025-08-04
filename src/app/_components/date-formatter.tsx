'use client';

import dayjs from 'dayjs';

type Props = {
  dateString: string;
};

const DateFormatter = ({ dateString }: Props) => {
  const date = dayjs(dateString);
  return <time dateTime={dateString}>{date.format('MMMM D, YYYY')}</time>;
};

export default DateFormatter;