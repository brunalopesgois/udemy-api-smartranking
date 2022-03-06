import { Document } from 'mongoose';
import { ResultInterface } from './../../shared/interfaces/challenges/result.interface';

export class Result extends Document implements ResultInterface {
  matchSet: string;

  constructor(result: Partial<Result>) {
    super(result);
  }
}
