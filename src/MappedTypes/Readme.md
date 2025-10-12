
## 🧩 `@nestjs/mapped-types` nima?

`@nestjs/mapped-types` — bu **NestJS DTO-larini (Data Transfer Object)** yaratishda **meros olish, qisman o‘zgartirish yoki kombinatsiya qilish** uchun ishlatiladigan yordamchi (helper) kutubxona.

U **TypeScript tiplarini manipulyatsiya qilish** uchun ishlab chiqilgan (`PartialType`, `PickType`, `OmitType`, `IntersectionType`, va boshqalar).

---

## 📦 O‘rnatish

```bash
npm install @nestjs/mapped-types
```

Agar siz `@nestjs/swagger` o‘rnatgan bo‘lsangiz — u holda bu paket **avtomatik o‘rnatilgan bo‘lishi ham mumkin**, chunki Swagger undan foydalanadi.

---

## 🧠 Asosiy funksiyalari

### 1. `PartialType()`
Biror DTO’dan **barcha fieldlarni optional** (ixtiyoriy) qilib olish uchun ishlatiladi.

#### Misol:

```ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
```

➡️ `UpdateUserDto` endi `CreateUserDto`ning barcha property-lariga ega,  
lekin ularning **hammasi ixtiyoriy (`?`)** bo‘lib qoladi.  
Bu — `PATCH` yoki `UPDATE` endpointlar uchun juda qulay.

---

### 2. `PickType()`
Biror DTO’dan **faqat kerakli maydonlarni tanlab olish** uchun ishlatiladi.

#### Misol:

```ts
import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class LoginDto extends PickType(CreateUserDto, ['email', 'password']) {}
```

➡️ `LoginDto` faqat `email` va `password` fieldlariga ega bo‘ladi.

---

### 3. `OmitType()`
Biror DTO’dan **ma’lum fieldlarni olib tashlash** uchun ishlatiladi.

#### Misol:

```ts
import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UserWithoutPasswordDto extends OmitType(CreateUserDto, ['password']) {}
```

➡️ Bu holda `UserWithoutPasswordDto` `CreateUserDto`ga o‘xshash, lekin `password` maydonisiz.

---

### 4. `IntersectionType()`
Ikki yoki undan ortiq DTO’larni **birlashmasi (combine)** sifatida yaratish uchun ishlatiladi.

#### Misol:

```ts
import { IntersectionType } from '@nestjs/mapped-types';
import { UserDto } from './user.dto';
import { ProfileDto } from './profile.dto';

export class UserProfileDto extends IntersectionType(UserDto, ProfileDto) {}
```

➡️ Endi `UserProfileDto` ikkala DTO’dagi barcha fieldlarga ega bo‘ladi.

---

### 5. `MappedType()`
Bu **boshqa yuqoridagi tiplarning bazasi** — odatda uni to‘g‘ridan-to‘g‘ri ishlatmaysiz.  
Lekin custom transformatsiyalar yaratishda foydali bo‘ladi.

---

## ⚙️ Real loyihada qo‘llanilishi

Masalan, `User` moduli uchun:

```ts
// create-user.dto.ts
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  name: string;
}
```

```ts
// update-user.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
```

Endi `UpdateUserDto` da:
```ts
{
  email?: string;
  password?: string;
  name?: string;
}
```
bo‘ladi — **hammasi optional**, ya’ni `PATCH` endpoint uchun ideal.

---

## 🧩 Qayerda ishlaydi?

Bu tiplardan odatda:
- `Controller` method argumentlarida (`@Body()` bilan),
- `Swagger` avtomatik dokumentatsiyasida,
- `ValidationPipe` bilan validatsiyada foydalaniladi.

---

## 💡 Bonus: Swagger integratsiyasi

Agar siz `@nestjs/swagger` ishlatayotgan bo‘lsangiz,  
`@nestjs/mapped-types` yordamida yaratilgan DTO’lar **avtomatik** Swagger’da ham to‘g‘ri chiqadi.

Masalan:

```ts
@ApiTags('users')
@Controller('users')
export class UsersController {
  @Patch(':id')
  update(@Body() dto: UpdateUserDto) {
    // Swagger avtomatik UpdateUserDto ni ko‘rsatadi
  }
}
```

---

## 🔍 Xulosa

| Funksiya | Vazifasi |
|-----------|-----------|
| `PartialType()` | Barcha fieldlarni optional qiladi |
| `PickType()` | Faqat kerakli fieldlarni tanlaydi |
| `OmitType()` | Keraksiz fieldlarni tashlab yuboradi |
| `IntersectionType()` | Bir nechta DTO’larni birlashtiradi |
| `MappedType()` | Custom transformatsiyalar uchun baza tipi |


## 🧩 1. `PartialType` dan keyin ba’zi fieldlarni **required** qilish

`PartialType()` barcha fieldlarni **optional** qilib yuboradi.
Lekin agar siz **ba’zilarini yana required** qilishni xohlasangiz, ularni **qo‘lda qayta e’lon qilish** kerak.

### 🔹 Misol:

```ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  // email maydoni required bo‘lsin
  @IsEmail()
  email: string;
}
```

➡️ Endi:

* `CreateUserDto` dagi barcha fieldlar optional bo‘ladi,
* lekin `email` qayta e’lon qilindi — **required** holatda.

---

## 🧩 2. `PickType` va `OmitType` bilan kombinatsiya qilish

Agar siz faqat **ba’zi fieldlarni tanlab**, ularni required holatda qoldirmoqchi bo‘lsangiz:

```ts
import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class ChangePasswordDto extends PickType(CreateUserDto, ['password']) {}
```

➡️ Bu holda faqat `password` required bo‘ladi,
chunki `PickType` asl DTO’dan aynan shu fieldni olib, ularning validatsiyasini saqlab qoladi.

---

## 🧩 3. PartialType + qo‘lda qayta required qilish (ko‘p maydon uchun)

Agar bir nechta maydonni required qilmoqchi bo‘lsangiz, TypeScript’ning `Required<>` tipidan ham foydalanish mumkin:

```ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) implements Required<Pick<CreateUserDto, 'email' | 'password'>> {
  email: string;
  password: string;
}
```

Bu variantda:

* Barcha maydonlar optional.
* `email` va `password` **majburiy**.

---

## 🧩 4. Swagger bilan ishlaganda

Agar siz `@nestjs/swagger` ishlatayotgan bo‘lsangiz, yuqoridagi qayta e’lon qilingan maydonlar Swagger’da **required** sifatida ko‘rsatiladi.
Masalan:

```ts
@ApiProperty({ required: true })
email: string;
```

Bu orqali Swagger’da maydonni **majburiy** qilib belgilaysiz, validatsiya esa `class-validator` orqali amalga oshiriladi.

---

## ✅ Yakuniy misol (to‘liq DTO’lar)

```ts
// create-user.dto.ts
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  name: string;
}
```

```ts
// update-user.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  // emailni required qilamiz
  @IsEmail()
  email: string;
}
```

✅ Natija:

* `name` va `password` — optional
* `email` — required

---

## 🧠 Xulosa jadvali

| Yondashuv                          | Tavsif                                          |
| ---------------------------------- | ----------------------------------------------- |
| `PartialType()`                    | Barcha maydonlarni optional qiladi              |
| Qo‘lda qayta e’lon qilish          | Ba’zi fieldlarni required qiladi                |
| `PickType()`                       | Faqat kerakli fieldlarni required holatda oladi |
| `@ApiProperty({ required: true })` | Swagger’da required belgisi qo‘shadi            |

