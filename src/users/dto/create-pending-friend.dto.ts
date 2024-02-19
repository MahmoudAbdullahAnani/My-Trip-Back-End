import { IsMongoId } from 'class-validator';

export class CreatePendingFriendDto {
  @IsMongoId({ message: 'id friend is not valid' })
  userReceiver: string;
}
