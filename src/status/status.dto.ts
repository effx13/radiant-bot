import { StringOption } from 'necord';
import { IsEnum } from 'class-validator';
import { Region } from 'valorant.ts';

export class StatusDto {
  @IsEnum(Region.Default)
  @StringOption({
    name: '지역',
    description: '서버 상태를 확인할 지역을 선택하세요.',
    autocomplete: true,
    required: true,
  })
  region: Region.Default = Region.Default.Korea;
}
