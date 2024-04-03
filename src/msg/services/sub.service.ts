import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SubInterface } from '../interfaces/mainMsg.interface';
import { Model } from 'mongoose';
import { SubEmailDto, SubMsgDto } from '../dto/msgDto.dto';
import { EmailService } from 'src/users/email.provider';

@Injectable()
export class SubService {
  constructor(
    @Inject('SUB_MODEL') private readonly subModule: Model<SubInterface>,
    private readonly emailService: EmailService,
  ) {}

  async subEmail(body: SubEmailDto) {
    const subEmail = await this.subModule.create({
      name: body.name,
      email: body.email,
      msgs: [],
    });
    return {
      statusCode: 200,
      message: 'Subscribed successfully',
      data: subEmail,
    };
  }
  async subMsg(body: SubMsgDto) {
    const emailReceiver = await this.subModule.findOne({
      email: body.email,
    });
    if (!emailReceiver) {
      throw new NotFoundException('Email not found');
    }

    // Send Message Here
    try {
      await this.emailService.sendMail(
        process.env.USER,
        body.email,
        'Trip',

        `<div>
          <h1>${body.msgTitle}</h1>
          <hr/>
          <p>${body.msgContent}</p>
          <hr/>
          <div>

            <h5>Trip,
            <br/>
            mahmoud18957321@gmail.com</h5>
          </div>
        </div>`,
      );
      emailReceiver.msgs.push({
        title: body.msgTitle,
        content: body.msgContent,
      });
      const subEmail = await emailReceiver.save();
      return {
        statusCode: 200,
        message: 'Subscribed successfully',
        data: subEmail,
      };
    } catch (err) {
      return {
        statusCode: 404,
        message: err.message,
      };
    }
  }
}
