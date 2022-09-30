export const cepMask = (value: string | null = '') =>
  (value || '').replace(/\D/g, '').replace(/(\d{5})(\d{3})/g, '$1-$2');

export const phoneMask = (value: string | null = '') =>
  (value || '')
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{4,5})(\d{4})$/, '$1-$2');

export const cnpjMask = (value: string | null = '') =>
  (value || '')
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2');

export const cpfMask = (value: string | null = '') =>
  (value || '')
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');

export const documentoMask = (value: string) => {
  if (!value) {
    return '';
  }

  return value.length <= 14 ? cpfMask(value) : cnpjMask(value);
};

export const currencyMask = (value: string) => {
  if (!value) {
    return 'R$ 0,00';
  }

  value = value.replace('.', '').replace(',', '').replace(/\D/g, '');

  const result = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
  }).format(parseFloat(value) / 100);

  return 'R$ ' + result;
};
