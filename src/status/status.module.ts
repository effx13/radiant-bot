import { Module } from '@nestjs/common';
import { GatewayIntentBits } from 'discord.js';
import { StatusCommands } from './status.commands';

@Module({
  imports: [],
  providers: [StatusCommands],
})
export class StatusModule {}
