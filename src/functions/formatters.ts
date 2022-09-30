const currencyFormat = (value: number | undefined) => {
  if (!value) {
    return 'R$ 0,00';
  }

  return new Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    style: 'currency',
  }).format(value);
};

const dateFormat = (value: string | null | undefined) =>
  value
    ? new Intl.DateTimeFormat('pt-BR', {
        timeZone: 'UTC',
      }).format(new Date(value))
    : '';

const dateFormatWithHours = (value: string | null | undefined) =>
  value
    ? new Intl.DateTimeFormat('pt-BR', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      }).format(new Date(value))
    : '';

const fromDateTimeLocal = (dateStr: string) => {
  if (!dateStr) {
    return null;
  }

  const date = new Date(dateStr);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
};

const toDateTimeLocal = (date: Date | null) => {
  if (!date) {
    return '';
  }

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000)
    .toISOString()
    .slice(0, 16);
};

export {
  currencyFormat,
  dateFormat,
  dateFormatWithHours,
  fromDateTimeLocal,
  toDateTimeLocal,
};
