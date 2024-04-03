import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { MsgInterface } from '../interfaces/mainMsg.interface';
import { MsgDto } from '../dto/msgDto.dto';
import { EmailService } from 'src/users/email.provider';

@Injectable()
export class MsgService {
  constructor(
    @Inject('MSG_MODEL') private readonly msgModule: Model<MsgInterface>,
    private readonly emailService: EmailService,
  ) {}

  async sendMsg(body: MsgDto) {
    try {
      const msg = new this.msgModule(body);
      await msg.save();
      await this.emailService.sendMail(
        process.env.USER,
        process.env.USER,
        'Trip Form Contact',

        `<div>
          <h1>${body.name}</h1>
          <hr/>
          <p>${body.msg}</p>
          <hr/>
          <div>

            <h5>${body.name},
            <br/>
            ${body.email}</h5>
          </div>
        </div>`,
      );
      return {
        statusCode: 200,
        message: 'Message sent successfully',
      };
    } catch (err) {
      return {
        statusCode: 404,
        message: err.message,
      };
    }
  }
  async getAllMsgs(): Promise<{ data: MsgDto[]; count: number }> {
    const messages = await this.msgModule.find().select('-__v');
    return {
      data: messages,
      count: messages.length,
    };
  }

  async clearMsg(): Promise<void> {
    await this.msgModule.deleteMany();
    // await message.save();
    return;
  }
}
