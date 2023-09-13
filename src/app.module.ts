import { Module } from '@nestjs/common';
import { GatewayIntentBits } from 'discord.js';
import { NecordModule } from 'necord';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as process from 'process';
import { AppService } from './app.service';
import { StatusModule } from './status/status.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    NecordModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        token: configService.get('DISCORD_BOT_TOKEN'),
        intents: [
          GatewayIntentBits.Guilds,
          GatewayIntentBits.GuildMessages,
          GatewayIntentBits.GuildMessageReactions,
          GatewayIntentBits.MessageContent,
        ],
        development:
          process.env.NODE_ENV === 'development'
            ? configService.get('DISCORD_DEVELOPMENT_GUILD_ID')
            : false,
      }),
      inject: [ConfigService],
    }),
    StatusModule,
  ],
  providers: [AppService],
})
export class AppModule {}
