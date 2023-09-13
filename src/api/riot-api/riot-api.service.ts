import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Locale, Region, RiotApi } from 'valorant.ts';

@Injectable()
export class RiotApiService {
  constructor(private readonly configService: ConfigService) {}

  private readonly apiKey = this.configService.get<string>('RIOT_API_KEY');

  private getRiotApiClient({ region }: { region: Region.Identify }) {
    return new RiotApi({
      apiKey: this.apiKey,
      region,
    });
  }

  public getAccountByPuuid({
    region,
    puuid,
  }: {
    region: Region.Identify;
    puuid: string;
  }) {
    return this.getRiotApiClient({ region }).AccountV1.byPuuid(puuid);
  }

  public getAccountByRiotId({
    region,
    gameName,
    tagLine,
  }: {
    region: Region.Identify;
    gameName: string;
    tagLine: string;
  }) {
    return this.getRiotApiClient({ region }).AccountV1.byRiotId(
      gameName,
      tagLine,
    );
  }

  public getAccountByAccessToken({
    region,
    authorization,
  }: {
    region: Region.Identify;
    authorization: string;
  }) {
    return this.getRiotApiClient({ region }).AccountV1.byAccessToken(
      authorization,
    );
  }

  public getContent({ region }: { region: Region.Identify }) {
    return this.getRiotApiClient({ region }).ContentV1.contents(
      Locale.Default.Korean_South_Korea,
    );
  }

  public getMatchById({ region, matchId }) {
    return this.getRiotApiClient({ region }).MatchV1.byMatchId(matchId);
  }

  public getMatchesByPuuid({ region, puuid }) {
    return this.getRiotApiClient({ region }).MatchV1.listByPuuid(puuid);
  }

  public getRecentMatchesByQueue({ region, queueId }) {
    return this.getRiotApiClient({ region }).MatchV1.recentByQueue(queueId);
  }

  public getLeaderboardsByAct({
    region,
    actId,
    size = 200,
    startIndex = 0,
  }: {
    region: Region.Identify;
    actId: string;
    size?: number;
    startIndex?: number;
  }) {
    return this.getRiotApiClient({ region }).RankedV1.leaderboardsByAct(
      actId,
      size,
      startIndex,
    );
  }

  public getStatus({ region }: { region: Region.Identify }) {
    return this.getRiotApiClient({ region }).StatusV1.platformData();
  }
}
