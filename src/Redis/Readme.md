

Bu yerda biz hech qanday `CacheModule` ishlatmaymiz — **Redis bilan to‘g‘ridan-to‘g‘ri bog‘lanamiz.**

---

## 📁 Fayl tuzilmasi

```
src/
 ┣ redis/
 ┃ ┣ redis.module.ts
 ┃ ┣ redis.service.ts
 ┃ ┗ redis.controller.ts
 ┗ app.module.ts
```

---

## ⚙️ 1️⃣ `redis.module.ts`

```ts
import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisController } from './redis.controller';

@Module({
  providers: [RedisService],
  controllers: [RedisController],
  exports: [RedisService],
})
export class RedisModule {}
```

Bu modul bizning Redis service va controller’ni birlashtiradi.

---

## 🧠 2️⃣ `redis.service.ts`

```ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: Redis;

  onModuleInit() {
    this.client = new Redis({
      host: 'localhost', // Redis server manzili
      port: 6379,        // standart port
    });
    console.log('✅ Redis client ulandi');
  }

  onModuleDestroy() {
    this.client.quit();
    console.log('🛑 Redis client yopildi');
  }

  async set(key: string, value: any, ttl?: number) {
    const data = JSON.stringify(value);
    if (ttl) {
      await this.client.set(key, data, 'EX', ttl); // TTL bilan
    } else {
      await this.client.set(key, data);
    }
    return `✅ Saqlandi: ${key}`;
  }

  async get(key: string) {
    const data = await this.client.get(key);
    return data ? JSON.parse(data) : null;
  }

  async del(key: string) {
    await this.client.del(key);
    return `❌ O‘chirildi: ${key}`;
  }
}
```

🧩 **Izoh:**

* `onModuleInit()` → modul ishga tushganda Redis’ga ulanadi
* `onModuleDestroy()` → Nest server to‘xtaganda Redis ulanishini yopadi
* `set()`, `get()`, `del()` → Redisdagi asosiy amallar

---

## 🎮 3️⃣ `redis.controller.ts`

```ts
import { Controller, Get, Param } from '@nestjs/common';
import { RedisService } from './redis.service';

@Controller('redis')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  @Get('set/:key/:value')
  async setData(@Param('key') key: string, @Param('value') value: string) {
    return await this.redisService.set(key, value, 60); // 60 sekund TTL
  }

  @Get('get/:key')
  async getData(@Param('key') key: string) {
    const result = await this.redisService.get(key);
    return result ?? '⛔ Maʼlumot topilmadi';
  }

  @Get('del/:key')
  async delData(@Param('key') key: string) {
    return await this.redisService.del(key);
  }
}
```

Bu controller orqali siz Redis bilan `GET` so‘rovlar orqali muloqot qilasiz.

---

## 🧩 4️⃣ `app.module.ts`

```ts
import { Module } from '@nestjs/common';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [RedisModule],
})
export class AppModule {}
```

---

## ▶️ 5️⃣ Ishga tushirish

Terminalda yozing:

```bash
npm install ioredis
npm run start:dev
```

---

## 🔍 6️⃣ Test qilish

### 1. Ma’lumot saqlash:

```
http://localhost:3000/redis/set/name/Jamshid
```

→ `✅ Saqlandi: name`

### 2. Ma’lumot o‘qish:

```
http://localhost:3000/redis/get/name
```

→ `"Jamshid"`

### 3. Ma’lumot o‘chirish:

```
http://localhost:3000/redis/del/name
```

→ `❌ O‘chirildi: name`

---

## 🧩 7️⃣ Qisqa xulosa

| Funksiya  | Tavsif                                 |
| --------- | -------------------------------------- |
| `ioredis` | Redis bilan to‘g‘ridan-to‘g‘ri ishlash |
| `set()`   | Ma’lumotni Redisda saqlash             |
| `get()`   | Ma’lumotni olish                       |
| `del()`   | Ma’lumotni o‘chirish                   |
| `ttl`     | Saqlanish muddati (sekundda)           |

---
### QO"SHIMCHA
## 🧱 1️⃣ Asosiy amallar

| Buyruq               | Maqsadi                               | Misol                                |
| -------------------- | ------------------------------------- | ------------------------------------ |
| `SET key value`      | Kalitga qiymat yozish                 | `await redis.set('name', 'Jamshid')` |
| `GET key`            | Kalitni o‘qish                        | `await redis.get('name')`            |
| `DEL key`            | Kalitni o‘chirish                     | `await redis.del('name')`            |
| `EXISTS key`         | Kalit mavjudligini tekshirish         | `await redis.exists('name')`         |
| `TTL key`            | Kalit qoldiq vaqtini olish (sekundda) | `await redis.ttl('name')`            |
| `EXPIRE key seconds` | Kalitga vaqt belgilash                | `await redis.expire('name', 60)`     |

---

## 🔁 2️⃣ Raqamli qiymatlar bilan ishlash

| Buyruq              | Maqsadi                   | Misol                              |
| ------------------- | ------------------------- | ---------------------------------- |
| `INCR key`          | Qiymatni 1 ga oshiradi    | `await redis.incr('counter')`      |
| `DECR key`          | Qiymatni 1 ga kamaytiradi | `await redis.decr('counter')`      |
| `INCRBY key number` | Ma’lum sondan oshiradi    | `await redis.incrby('counter', 5)` |
| `DECRBY key number` | Ma’lum sondan kamaytiradi | `await redis.decrby('counter', 3)` |

📦 **Masalan:**

```ts
await redis.set('views', 0);
await redis.incr('views');
await redis.get('views'); // → "1"
```

---

## 🧰 3️⃣ Ro‘yxatlar (List) bilan ishlash

Redis’da massivga o‘xshash “list” mavjud:

| Buyruq                  | Maqsadi                      | Misol                                 |
| ----------------------- | ---------------------------- | ------------------------------------- |
| `LPUSH key value`       | Boshiga qo‘shadi             | `await redis.lpush('tasks', 'todo1')` |
| `RPUSH key value`       | Oxiriga qo‘shadi             | `await redis.rpush('tasks', 'todo2')` |
| `LPOP key`              | Birinchi elementni o‘chiradi | `await redis.lpop('tasks')`           |
| `RPOP key`              | Oxirgi elementni o‘chiradi   | `await redis.rpop('tasks')`           |
| `LRANGE key start stop` | Elementlar oralig‘ini oladi  | `await redis.lrange('tasks', 0, -1)`  |

📦 **Masalan:**

```ts
await redis.rpush('tasks', 'code', 'sleep', 'eat');
const list = await redis.lrange('tasks', 0, -1); 
console.log(list); // ['code', 'sleep', 'eat']
```

---

## 🧩 4️⃣ To‘plamlar (Set) bilan ishlash

| Buyruq                | Maqsadi                         | Misol                                   |
| --------------------- | ------------------------------- | --------------------------------------- |
| `SADD key value`      | To‘plamga element qo‘shish      | `await redis.sadd('users', 'Jamshid')`  |
| `SREM key value`      | Elementni o‘chirish             | `await redis.srem('users', 'Jamshid')`  |
| `SMEMBERS key`        | To‘plamni o‘qish                | `await redis.smembers('users')`         |
| `SISMEMBER key value` | Element mavjudligini tekshirish | `await redis.sismember('users', 'Ali')` |

📦 **Masalan:**

```ts
await redis.sadd('users', 'Ali', 'Jamshid', 'Sardor');
const all = await redis.smembers('users');
console.log(all); // ['Ali', 'Jamshid', 'Sardor']
```

---

## 🧱 5️⃣ Hashlar (obyektga o‘xshash ma’lumotlar)

| Buyruq                 | Maqsadi                    | Misol                                           |
| ---------------------- | -------------------------- | ----------------------------------------------- |
| `HSET key field value` | Obyektga qiymat qo‘shish   | `await redis.hset('user:1', 'name', 'Jamshid')` |
| `HGET key field`       | Obyektdan qiymat olish     | `await redis.hget('user:1', 'name')`            |
| `HGETALL key`          | Butun obyektni olish       | `await redis.hgetall('user:1')`                 |
| `HDEL key field`       | Obyekt maydonini o‘chirish | `await redis.hdel('user:1', 'name')`            |

📦 **Masalan:**

```ts
await redis.hset('user:1', 'name', 'Jamshid', 'age', '25');
const user = await redis.hgetall('user:1');
console.log(user); // { name: 'Jamshid', age: '25' }
```

---

## 🕐 6️⃣ Vaqt bilan ishlash

```ts
await redis.set('session', 'abc123', 'EX', 30); // 30 sekunddan so‘ng o‘chadi
```

---

## 🔒 7️⃣ Transaction (atomik amallar)

Bir nechta amallarni ketma-ket bajarish uchun:

```ts
const result = await redis
  .multi()
  .set('user', 'Jamshid')
  .incr('counter')
  .exec();
console.log(result);
```

---

## 💡 8️⃣ Publish / Subscribe (real-time xabarlar)

Redis’da siz **xabar yuborish va tinglash** tizimini ham ishlatishingiz mumkin:

```ts
// publisher
await redis.publish('news', 'Yangi post chiqdi');

// subscriber
redis.subscribe('news');
redis.on('message', (channel, message) => {
  console.log(`📢 ${channel}: ${message}`);
});
```

---

## 🎯 Xulosa

| Kategoriya         | Misollar              |
| ------------------ | --------------------- |
| Oddiy kalit-qiymat | SET, GET, DEL, EXISTS |
| Raqamli hisoblash  | INCR, DECR            |
| Ro‘yxat (List)     | LPUSH, RPUSH, LRANGE  |
| To‘plam (Set)      | SADD, SMEMBERS        |
| Hash (Object)      | HSET, HGETALL         |
| Real-time          | PUBLISH, SUBSCRIBE    |
| TTL va vaqt        | EXPIRE, TTL           |
| Transaction        | MULTI, EXEC           |

---


