import * as bcrypt from 'bcrypt';
import { cryptoConfig } from '../config/crypto';

export const doCrypto = async (content: string) => {
  const salt = await bcrypt.genSalt(cryptoConfig.saltRounds);

  return bcrypt.hash(content, salt);
};

export const compare = bcrypt.compare;
