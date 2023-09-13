import { Module } from '@nestjs/common';
import { GatewayIntentBits } from 'discord.js';
import { StatusCommand } from './status.command';
import { ApiModule } from '../api/api.module';

@Module({
  imports: [ApiModule],
  providers: [StatusCommand],
})
export class StatusModule {}
