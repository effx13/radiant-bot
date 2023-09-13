import { Module } from '@nestjs/common';
import { GatewayIntentBits } from 'discord.js';
import { NecordModule } from 'necord';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    NecordModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        token: configService.get('DISCORD_BOT_TOKEN'),
        intents: [GatewayIntentBits.Guilds],
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [],
})
export class AppModule {}
