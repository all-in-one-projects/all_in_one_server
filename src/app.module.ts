// https://docs.nestjs.cn/8/techniques?id=%e6%95%b0%e6%8d%ae%e5%ba%93
import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { APP_PIPE, APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { UsersModule, CommonModule, AccountModule } from './modules/index';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// import { AllExceptionsFilter } from './filters/any-exception/any-exception.filter';
import { ValidatePipe } from './pipe/index';
import { WrapperResponseInterceptor } from './interceptor/index';
import { ViewsModule } from './modules/views/views.module';

import { ExperienceOrderController } from './modules/experience-order/experience-order.controller';
import { ExperienceOrderModule } from './modules/experience-order/experience-order.module';

import { ExperienceCommentsController } from './modules/experience-comments/experience-comments.controller';
import { ExperienceCommentsModule } from './modules/experience-comments/experience-comments.module';

import { ExperienceSystemsController } from './modules/experience-systems/experience-systems.controller';
import { ExperienceSystemsModule } from './modules/experience-systems/experience-systems.module';

import config from './config/index';

const mysqlCfg = config.mysql;
@Module({
  imports: [
    TypeOrmModule.forRoot(mysqlCfg),
    CommonModule,
    UsersModule,
    AccountModule,
    ViewsModule,
    ExperienceOrderModule,
    ExperienceCommentsModule,
    ExperienceSystemsModule,
  ],
  controllers: [
    AppController,
    ExperienceOrderController,
    ExperienceSystemsController,
    ExperienceCommentsController,
  ],
  providers: [
    AppService,
    // {
    //   provide: APP_FILTER,
    //   useClass: AllExceptionsFilter,
    // },
    // {
    //   provide: APP_PIPE,
    //   useClass: ValidatePipe,
    // },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: WrapperResponseInterceptor,
    // },
  ],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
