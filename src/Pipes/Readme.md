NestJS’da **pipe**lar — bu **ma’lumotlarni validatsiya qilish** va **transformatsiya qilish** uchun ishlatiladigan mexanizmdir.
Ular controller’ga kirayotgan request (so‘rov) ma’lumotlarini filtrlash, tekshirish yoki o‘zgartirish uchun ishlatiladi.

---

### 🧠 Pipe nima?

Pipe bu — ma’lumotni **controller yoki route handler’ga** bormasidan oldin **qayta ishlovchi (filterlovchi)** funksiya.

NestJS’da pipe 2 asosiy vazifani bajaradi:

1. **Validation (tekshirish)** — kiruvchi ma’lumot to‘g‘riligini tekshiradi.
2. **Transformation (o‘zgartirish)** — kiruvchi ma’lumot turini kerakli shaklga keltiradi (masalan, string → number).

---

### 🧩 Oddiy misol

#### 1. NumberPipe (transformatsiya)

```typescript
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('Raqam kiritilishi kerak!');
    }
    return val;
  }
}
```

Controller’da:

```typescript
@Get(':id')
getUser(@Param('id', new ParseIntPipe()) id: number) {
  return { id };
}
```

👉 Bu yerda `id` string holatda keladi (`"5"`), lekin pipe uni `number`ga aylantiradi (`5`).

---

### 🧾 2. ValidationPipe (validatsiya uchun tayyor pipe)

NestJS’da eng ko‘p ishlatiladigan pipe — bu **ValidationPipe**.

O‘rnatish:

```bash
npm install class-validator class-transformer
```

DTO (Data Transfer Object):

```typescript
import { IsString, IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3, 20)
  name: string;

  @IsEmail()
  email: string;
}
```

Controller’da:

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

👉 `whitelist: true` – DTO’da yo‘q bo‘lgan fieldlar avtomatik o‘chirib tashlanadi.

---

### 🌍 3. Global pipe o‘rnatish

Pipe’ni butun ilovaga qo‘llash uchun `main.ts` ichida yoziladi:

```typescript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(3000);
}
bootstrap();
```

---

### 🧱 Pipe’lar qayerda ishlaydi?

Pipe’lar quyidagi joylarda ishlatiladi:

| Joy        | Misol                          |
| ---------- | ------------------------------ |
| `@Param()` | `@Param('id', ParseIntPipe)`   |
| `@Body()`  | `@Body(new ValidationPipe())`  |
| `@Query()` | `@Query('page', ParseIntPipe)` |

---

Xullas, **Pipe** — bu ma’lumotni **tekshirish (validate)** va **o‘zgartirish (transform)** uchun ishlatiladigan kuchli vosita.
Ular sizning controller’laringizni “toza” va ishonchli qiladi 🚀

