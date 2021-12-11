import isEthereumAddress from 'validator/lib/isEthereumAddress';

export const isInvalidAddress = (address: string) => !!address && !isEthereumAddress(address.toLowerCase());
