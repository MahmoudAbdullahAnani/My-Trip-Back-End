import { PartialType } from '@nestjs/mapped-types';
import { CreatePendingFriendDto } from './create-pending-friend.dto';

export class UpdatePendingFriendDto extends PartialType(CreatePendingFriendDto) {}
