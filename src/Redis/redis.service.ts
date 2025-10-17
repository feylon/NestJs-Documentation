import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import Redis from "ioredis"
import { RedisDTO } from "./Redis.DTO";

@Injectable()
export class RedisService implements OnModuleDestroy, OnModuleInit {
    private client: Redis
    onModuleInit() {
        this.client = new Redis({
            host: "localhost",
            port: 6379
        });
        console.log("Ulanish amalga oshdi")
    }


    onModuleDestroy() {
        this.client.quit();
        console.log("Ulanish tugatildi")
    }


    async set(body: RedisDTO) {
        const {key, value, ttl } = body;
        await this.client.set(key, JSON.stringify(value), 'EX', ttl);
        return 'saqlandi'
    }

    async get(key: string) {
        const value = await this.client.get(key);
        return value ? JSON.parse(value) : null;
    }


    async deleteRedisSection(key: string) {
        await this.client.del(key)
        return { message: "Ma'lumot o'chirildi" }
    }
}