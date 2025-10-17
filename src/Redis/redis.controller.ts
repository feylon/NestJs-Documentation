import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { RedisService } from "./redis.service";
import { DeleteRedisKey, GetRedisKey, RedisDTO } from "./Redis.DTO";

@Controller('redis')
export class RedisController {
    constructor(private readonly redisService: RedisService) {

    }

    @Post()
    createRedisSection(@Body() body: RedisDTO) {
        return this.redisService.set(body)
    }

    @Get("/:id")
    getValueKey(@Param() param: GetRedisKey) {
        return this.redisService.get(param.id)
    }

    @Delete('/:id')
    deleteFunction(@Param() param: DeleteRedisKey) {
        return this.redisService.deleteRedisSection(param.id)
    }
}