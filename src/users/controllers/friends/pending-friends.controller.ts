import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { PendingFriendsService } from '../../services/friends/pending-friends.service';
import { CreatePendingFriendDto } from '../../dto/create-pending-friend.dto';
import { UsersGuard } from 'src/users/guards/users.guard';
import { Roles } from 'src/users/guards/roles.decorator';
import { Request } from '@nestjs/common';
@Controller('pending-friends')
@UseGuards(UsersGuard)
export class PendingFriendsController {
  constructor(private readonly pendingFriendsService: PendingFriendsService) {}
  // =========================================================================================================================================
  // @Desc can user add friends in pending-friends
  // @Route POST /pending-friends
  // @Access ['user']
  @Post()
  @Roles(['user'])
  create(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    createPendingFriendDto: CreatePendingFriendDto,
    @Request() req,
  ) {
    return this.pendingFriendsService.create(createPendingFriendDto, req);
  }
  // =========================================================================================================================================
  // =========================================================================================================================================
  // @Desc can user show all friends in pending-friends on your account
  // @Route GET /pending-friends
  // @Access ['user']
  @Get()
  @Roles(['user'])
  findAll(@Request() req) {
    return this.pendingFriendsService.findAll(req);
  }
  // =========================================================================================================================================
  // =========================================================================================================================================
  // @Desc can any user show all friends in pending-friends on your account
  // @Route GET /pending-friends
  // @Access ['user']
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.pendingFriendsService.findOne(id, req);
  }
  // =========================================================================================================================================
  // =========================================================================================================================================
  // @Desc can any user show all friends in pending-friends on your account
  // @Route GET /pending-friends
  // @Access ['user']
  @Patch(':id/:operation')
  update(
    @Param('id') id: string,
    @Param('operation') operation: string,
    @Request() req,
  ) {
    return this.pendingFriendsService.update(id, operation, req);
  }
  // =========================================================================================================================================
}
