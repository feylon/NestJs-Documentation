Zo‘r! 🔥 Juda yaxshi yo‘nalishda ketyapsiz, Jamshid 😎
Keling, **`class-validator`** ni **0 dan** — oddiy tushunchadan tortib, **amaliy ishlatishgacha** o‘rgatamiz.
Men buni **bosqichma-bosqich**, oddiy tilda, real misollar bilan tushuntiraman 👇

---

# 🧱 1. `class-validator` nima?

`class-validator` — bu **Node.js va TypeScript** uchun yozilgan **validatsiya kutubxonasi** bo‘lib,
u sizga **class (masalan DTO)** ichida fieldlarga **qoidalar (rules)** qo‘yish imkonini beradi.

Ya’ni, foydalanuvchi noto‘g‘ri ma’lumot yuborsa — bu kutubxona **xatolik chiqaradi.**

NestJS esa bu kutubxonani **`ValidationPipe`** orqali avtomatik ishlatadi.

---

# ⚙️ 2. O‘rnatish

Avvalo kerakli kutubxonalarni o‘rnatamiz:

```bash
npm install class-validator class-transformer
```

Bu ikkisi birga ishlaydi:

* `class-validator` — validatsiya (tekshirish) uchun
* `class-transformer` — ma’lumotlarni class obyektlariga aylantirish uchun

---

# 🧩 3. Oddiy misol — DTO yaratish

Masalan, bizda `CreateUserDto` bor:

```typescript
// create-user.dto.ts
import { IsString, IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3, 20)
  name: string;

  @IsEmail()
  email: string;

  @Length(6, 32)
  password: string;
}
```

🧠 Bu yerda:

* `@IsString()` — qiymat string bo‘lishi kerak
* `@IsEmail()` — email formatda bo‘lishi kerak
* `@Length(6, 32)` — belgilar soni 6 dan 32 gacha bo‘lishi kerak

---

# 🚀 4. Controller’da ishlatish

Endi bu DTO’ni controller’da tekshiramiz.

```typescript
import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  createUser(@Body() body: CreateUserDto) {
    return body;
  }
}
```

### Nima bo‘ladi:

✅ To‘g‘ri ma’lumot yuborilsa → controller ishlaydi
❌ Noto‘g‘ri ma’lumot yuborilsa → NestJS 400 (`Bad Request`) qaytaradi

---

# 🌍 5. Global validation o‘rnatish (barcha joyda ishlasin)

`main.ts` faylida quyidagicha yoziladi:

```typescript
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
```

🧠 Parametrlar:

| Parametr                     | Tavsif                                                              |
| ---------------------------- | ------------------------------------------------------------------- |
| `whitelist: true`            | DTO’da yo‘q fieldlar avtomatik olib tashlanadi                      |
| `forbidNonWhitelisted: true` | DTO’da yo‘q fieldlar bo‘lsa → xato chiqaradi                        |
| `transform: true`            | `class-transformer` yordamida ma’lumotlarni to‘g‘ri tipga o‘tkazadi |

---

# 🔤 6. Eng ko‘p ishlatiladigan `class-validator` dekoratorlari

| Dekorator           | Tavsif                                           | Misol                |
| ------------------- | ------------------------------------------------ | -------------------- |
| `@IsString()`       | Qiymat string bo‘lishi kerak                     | `"Hello"` ✅          |
| `@IsNumber()`       | Qiymat raqam bo‘lishi kerak                      | `42` ✅               |
| `@IsEmail()`        | Email formatda bo‘lishi kerak                    | `"test@gmail.com"` ✅ |
| `@IsBoolean()`      | `true` yoki `false` bo‘lishi kerak               | ✅                    |
| `@IsOptional()`     | Bu field majburiy emas                           | ❌ bo‘lishi mumkin    |
| `@IsEnum(Enum)`     | Qiymat faqat ko‘rsatilgan enumdan bo‘lishi kerak | `"admin"`, `"user"`  |
| `@IsArray()`        | Array bo‘lishi kerak                             | `[1,2,3]` ✅          |
| `@ArrayMinSize(1)`  | Kamida bitta element bo‘lsin                     | ✅                    |
| `@Length(min, max)` | Belgilar soni oralig‘i                           |                      |
| `@Min()` / `@Max()` | Raqamlar chegarasi                               | `@Min(18)`           |
| `@Matches(regex)`   | Regex orqali moslik                              | `@Matches(/^[A-Z]/)` |

---

# 🧠 7. `@IsOptional()` bilan shartli validatsiya

Ba’zida sizda field majburiy emas, lekin agar yuborilsa — to‘g‘ri formatda bo‘lishi kerak bo‘ladi.

```typescript
export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
```

👉 Endi `name` yoki `email` yuborilmasa ham bo‘ladi.
Ammo yuborilsa — u holda validatsiya tekshiriladi.

---

# 🧩 8. `class-transformer` bilan birga ishlatish

Agar siz query yoki paramda kelgan qiymatlarni **number**ga avtomatik o‘girmoqchi bo‘lsangiz:

```typescript
import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class PaginationDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit: number;
}
```

👉 `@Type(() => Number)` — bu `page` va `limit` string bo‘lsa ham numberga aylantiradi.

---

# ⚡ 9. Validation xatoliklari qanday ko‘rinadi?

Agar siz noto‘g‘ri ma’lumot yuborsangiz, masalan:

```json
{
  "name": 123,
  "email": "not_email"
}
```

NestJS sizga quyidagi xatolikni qaytaradi:

```json
{
  "statusCode": 400,
  "message": [
    "name must be a string",
    "email must be an email"
  ],
  "error": "Bad Request"
}
```

---

# 💡 10. Custom xabar yozish (`message`)

```typescript
@IsEmail({}, { message: 'Email formati noto‘g‘ri kiritilgan!' })
email: string;
```

Natija:

```json
{
  "message": ["Email formati noto‘g‘ri kiritilgan!"]
}
```

---

# 🧾 11. Xulosa

| Tushuncha                | Ma’nosi                                           |
| ------------------------ | ------------------------------------------------- |
| `class-validator`        | Ma’lumotlarni DTO ichida tekshiruvchi kutubxona   |
| `class-transformer`      | Stringlarni kerakli tiplarga aylantiradi          |
| `ValidationPipe`         | NestJS’da validatsiya mexanizmini ishga tushiradi |
| `@IsOptional()`          | Field majburiy emas                               |
| `whitelist`, `transform` | ValidationPipe’ning foydali opsiyalari            |

---

# 🎯 Yakuniy xulosa:

> `class-validator` — bu sizning ilovangizda **ma’lumotlar tozaligini (data integrity)** ta’minlaydigan eng kuchli vosita.
> NestJS esa uni `ValidationPipe` orqali juda qulay tarzda integratsiya qiladi.

---

Xohlaysizmi, men sizga **real amaliy loyiha misoli** qilib (masalan, `User` CRUD) `class-validator` va `ValidationPipe`’ni to‘liq ishlatgan kod yozib beray?
