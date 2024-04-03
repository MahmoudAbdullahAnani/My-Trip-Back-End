import { Document } from 'mongoose';
export interface SubInterface extends Document {
  readonly name: string;
  readonly email: string;
  readonly msgs: { title: string; content: string }[];
}
export interface MsgInterface extends Document {
  readonly name: string;
  readonly email: string;
  readonly msg: string;
}
