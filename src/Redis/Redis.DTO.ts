import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class RedisDTO {
    @IsNotEmpty()
    @IsString()
    key: string;

    @IsNotEmpty()
    value: any;

    @IsNotEmpty()
    @IsNumber()
    ttl: number;
}


export class GetRedisKey {

    @IsNotEmpty()
    @IsString()
    id: string;
}


export class DeleteRedisKey {

    @IsNotEmpty()
    @IsString()
    id: string;
}