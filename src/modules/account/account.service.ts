import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountEntity } from './entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private accountRepository: Repository<AccountEntity>,
  ) {}

  create(createAccountDto: CreateAccountDto) {
    return this.accountRepository.save(createAccountDto).then(({ id }) => {
      return {
        id,
      };
    });
  }

  findAll(pager: {
    page: number;
    size: number;
  }): Promise<{ list: AccountEntity[]; count: number }> {
    return this.accountRepository
      .findAndCount({
        skip: pager.page - 1,
        take: pager.size,
      })
      .then(([list, count]) => {
        return {
          list,
          count: 1,
        };
      });
  }

  findOne(id: number) {
    return this.accountRepository.findOne(id).then((res) => {
      return res;
    });
  }

  findByEmail(email: string) {
    return this.accountRepository
      .find({
        email: email,
      })
      .then((res) => {
        return res;
      });
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
    return this.accountRepository.update(id, updateAccountDto).then((res) => {
      if (res) {
      }
    });
  }

  remove(id: number) {
    return this.accountRepository.delete(+id).then(({ affected }) => {
      if (affected) {
        return 'delete ok!';
      } else {
        return 'delete failed!';
      }
    });
  }
}
