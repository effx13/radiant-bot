import { Injectable, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';
import { RiotApiService } from '../api/riot-api/riot-api.service';
import { StatusDto } from './status.dto';
import { StatusAutocompleteInterceptor } from './status.interceptor';

@Injectable()
export class StatusCommand {
  constructor(private readonly riotApiService: RiotApiService) {}

  @UseInterceptors(StatusAutocompleteInterceptor)
  @SlashCommand({
    name: '서버',
    description: '발로란트 서버 상태를 확인합니다.',
  })
  public async onStatus(
    @Context() [interaction]: SlashCommandContext,
    @Options(new ValidationPipe()) { region }: StatusDto,
  ) {
    const status = await this.riotApiService.getStatus({
      region,
    });
    return interaction.reply({ content: JSON.stringify(status.data) });
  }
}
