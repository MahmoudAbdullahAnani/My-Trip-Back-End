import { Controller, Get, Patch, Param, UseGuards } from '@nestjs/common';
import { UsersGuard } from 'src/users/guards/users.guard';
import { Roles } from 'src/users/guards/roles.decorator';
import { Request } from '@nestjs/common';
import { FriendsService } from 'src/users/services/friends/friends.service';
import { SearchFriendsService } from 'src/users/services/friends/search-friends.service';
@Controller('friends')
@UseGuards(UsersGuard)
export class FriendsController {
  constructor(private readonly FriendsService: FriendsService) {}
  // =========================================================================================================================================
  // @Desc can user show all friends on account
  // @Route GET /friends
  // @Access ['user']
  @Get()
  @Roles(['user'])
  findAll(@Request() req) {
    return this.FriendsService.findAll(req);
  }
  // =========================================================================================================================================
  // =========================================================================================================================================
  // @Desc can user show single friend on account
  // @Route GET /friends
  // @Access ['user']
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.FriendsService.findOne(id, req);
  }
  // =========================================================================================================================================
  // =========================================================================================================================================
  // @Desc can user delete single friend on account
  // @Route GET /friends
  // @Access ['user']
  @Patch(':id/:operation')
  update(
    @Param('id') id: string,
    @Param('operation') operation: string,
    @Request() req,
  ) {
    return this.FriendsService.update(id, operation, req);
  }
  // =========================================================================================================================================
}
@Controller('search-friends')
@UseGuards(UsersGuard)
export class SearchFriendsController {
  constructor(private readonly searchFriendsService: SearchFriendsService) {}
  // =========================================================================================================================================
  // @Desc can user search for users
  // @Route GET /search-friends
  // @Access ['admin', 'manger','user']
  @Get(':keyword')
  @Roles(['admin', 'manger',  'user'])
  findAll(@Request() req, @Param('keyword') keyword) {
    return this.searchFriendsService.findOne(keyword, req);
  }
}
