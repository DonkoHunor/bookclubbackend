import { ConflictException, Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MembersService {
constructor(private readonly prisma: PrismaService){}

  create(createMemberDto: CreateMemberDto) {
    return this.prisma.members.create({
      data: {
        name: createMemberDto.name,
        gender: createMemberDto.gender,
        birth_date: new Date(createMemberDto.birth_date).toISOString()
      }
    });
  }

  async pay(member_id: number) {
    const thisMonth = new Date(Date.now()).getMonth();
    let payed = false;
    const payments = await this.prisma.payments.findMany();

    for (const item of payments) {
      if(item.paid_at.getMonth() === thisMonth && item.member_id === member_id){
        payed = true;
      }
    }

    if(payed){
      throw new ConflictException('Member already payed!');
    }
    else {
      return this.prisma.payments.create({
        data: {
          amount: 5000,
          member_id: member_id
        }
      });
    }
  }

  findAll() {
    return this.prisma.members.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} member`;
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    return `This action updates a #${id} member`;
  }

  remove(id: number) {
    return `This action removes a #${id} member`;
  }
}
