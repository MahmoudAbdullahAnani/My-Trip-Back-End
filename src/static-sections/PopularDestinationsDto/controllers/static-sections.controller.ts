import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { StaticSectionsService } from '../services/static-sections.service';
import { Roles } from 'src/users/guards/roles.decorator';
import { UsersGuard } from 'src/users/guards/users.guard';
import { createPopularDestinationsDto } from '../dto/staticSections.dto';
import { updatePopularDestinationsDto } from '../dto/updateStaticSections.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from 'src/upload/services/upload.service';

@Controller('static-sections')
@UseGuards(UsersGuard)
export class StaticSectionsController {
  constructor(
    private readonly staticSectionsService: StaticSectionsService,
    private readonly uploadService: UploadService,
  ) {}

  // ! This is Routs For Static Sections PopularDestinations --> Post, Update, Delete, GetAll
  // ============================================================ \\
  // @Desc admin and manger can create PopularDestinations
  // @Route Patch /static-sections/popular-destinations
  // @Access ['admin', 'manger']
  @Roles(['admin', 'manger'])
  @Post('/popular-destinations')
  @UseInterceptors(FileInterceptor('img'))
  async createPopularDestinations(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    body: createPopularDestinationsDto,
    @UploadedFile(
      new ParseFilePipe({
        // validators: [
        //   new MaxFileSizeValidator({ maxSize: 1000 }),
        //   new FileTypeValidator({ fileType: 'image/jpeg' }),
        // ],
      }),
    )
    img: Express.Multer.File,
  ) {
    const result = await this.uploadService.publicUploadFile(img);

    return this.staticSectionsService.createPopularDestinations({
      ...body,
      img: result.url,
    });
  }

  // ============================================================ \\
  // @Desc admin and manger can update PopularDestinations
  // @Route Patch /static-sections/popular-destinations/:PopularDestinationsId
  // @Access ['admin', 'manger']
  @Patch('/popular-destinations/:PopularDestinationsId')
  @Roles(['admin', 'manger'])
  @UseInterceptors(FileInterceptor('img'))
  async updatePopularDestinations(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    body: updatePopularDestinationsDto,
    @Param('PopularDestinationsId') id: string,
    @UploadedFile(
      new ParseFilePipe({
        // validators: [
        //   new MaxFileSizeValidator({ maxSize: 1000 }),
        //   new FileTypeValidator({ fileType: 'image/jpeg' }),
        // ],
      }),
    )
    img: Express.Multer.File,
  ) {
    const result = await this.uploadService.publicUploadFile(img);

    return this.staticSectionsService.updatePopularDestinations(
      {
        ...body,
        img: result.url,
      },
      id,
    );
  }

  // ============================================================ \\
  // @Desc admin and manger can update PopularDestinations
  // @Route Patch /static-sections/popular-destinations/:PopularDestinationsId
  // @Access ['admin', 'manger']
  @Delete('/popular-destinations/:PopularDestinationsId')
  @Roles(['admin', 'manger'])
  deletePopularDestinations(@Param('PopularDestinationsId') id: string) {
    return this.staticSectionsService.deletePopularDestinations(id);
  }
  // ============================================================ \\
  // @Desc any user can get popular-destinations data
  // @Route Patch /static-sections/popular-destinations
  @Get('/popular-destinations')
  getAllPopularDestinations() {
    return this.staticSectionsService.getAllPopularDestinations();
  }
}
