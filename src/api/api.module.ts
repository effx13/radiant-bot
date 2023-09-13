import { Module } from '@nestjs/common';
import { RiotApiModule } from './riot-api/riot-api.module';
import { ValorantApiModule } from './valorant-api/valrorant-api.module';
import { WebClientModule } from './web-client/web-client.module';

@Module({
  imports: [RiotApiModule, ValorantApiModule, WebClientModule],
  exports: [RiotApiModule, ValorantApiModule, WebClientModule],
})
export class ApiModule {}
