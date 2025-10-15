## 🧩 1. Decorator nima?

**Decorator** — bu **funksiya** bo‘lib, u **class**, **property**, **method**, yoki **parameter** ustida ishlaydi va unga **qo‘shimcha meta-ma’lumot** yoki **xulq** (behavior) qo‘shadi.

NestJS TypeScript’ning decorator tizimidan foydalanadi.
Masalan, quyidagilar — **NestJS’ning built-in decoratorlari**:

```ts
@Controller('users')
@Get(':id')
@Post()
@Body()
@Param('id')
@UseGuards(AuthGuard)
```

Bularning barchasi aslida oddiy **function decoratorlar** bo‘lib, NestJS ularni **metadata** sifatida saqlaydi.

---

## ⚙️ 2. Custom decorator nima?

**Custom decorator** — bu siz o‘zingiz yozadigan decorator.
U **NestJS**dagi `@SetMetadata()` yoki boshqa mexanizmlar orqali yaratiladi.

---

## 🧠 3. Eng oddiy custom decorator

Masalan, biz har bir route uchun **"role"** nomli metadata o‘rnatmoqchimiz:

### 🔹 `role.decorator.ts`

```ts
import { SetMetadata } from '@nestjs/common';

// 'roles' — metadata key
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
```

Bu `@Roles('admin')` deb yozish imkonini beradi.

---

## 🧩 4. Uni qanday ishlatamiz?

### 🔹 `user.controller.ts`

```ts
import { Controller, Get } from '@nestjs/common';
import { Roles } from './role.decorator';

@Controller('users')
export class UserController {
  @Get()
  @Roles('admin', 'superadmin')
  findAll() {
    return 'All users (only for admins)';
  }
}
```

---

## 🔐 5. Custom decorator’dan foydalanish uchun Guard

Endi biz shu **roles** metadatalarni olishimiz va **tekshirishimiz** kerak.
Buning uchun **Reflector** dan foydalanamiz.

### 🔹 `roles.guard.ts`

```ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Controllerdagi metadata'ni olish
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Masalan, user.role = 'admin'
    return roles.includes(user.role);
  }
}
```

### 🔹 Guard’ni qo‘llash:

```ts
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from './roles.guard';

@Controller('users')
@UseGuards(RolesGuard)
export class UserController {
  @Get()
  @Roles('admin')
  findAll() {
    return 'Adminlar uchun';
  }
}
```

---

## 🧱 6. Parametrlar uchun custom decorator

Siz **request**dagi qiymatlarni olish uchun ham custom decorator yozishingiz mumkin.
Masalan, `@User()` dekoratori orqali `req.user` ni olish:

### 🔹 `user.decorator.ts`

```ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user?.[data] : user;
  },
);
```

### 🔹 Foydalanish:

```ts
@Get('profile')
getProfile(@User() user) {
  return user; // butun user obyekt
}

@Get('profile/username')
getUsername(@User('username') username) {
  return username; // faqat username qiymati
}
```

---

## 🧩 7. Custom decorator turlari

| Turi                    | Qayerda ishlatiladi  | Misol                            |
| ----------------------- | -------------------- | -------------------------------- |
| **Class Decorator**     | Controller, Service  | `@Controller()`, `@Injectable()` |
| **Method Decorator**    | Route yoki Method    | `@Get()`, `@Post()`, `@Roles()`  |
| **Property Decorator**  | Class ichidagi field | `@InjectRepository()`            |
| **Parameter Decorator** | Function parametri   | `@Body()`, `@Param()`, `@User()` |

---

## ⚡️ 8. `@SetMetadata()` vs `createParamDecorator()`

| Funksiya                 | Maqsad                                                              |
| ------------------------ | ------------------------------------------------------------------- |
| `SetMetadata()`          | Static metadata saqlash uchun (masalan, `@Roles('admin')`)          |
| `createParamDecorator()` | Request context’dan dinamik qiymat olish uchun (masalan, `@User()`) |

---

## 🧠 9. Amaliy ishlatilish joylari

* **Auth / Role guardlarida** → `@Roles()`
* **Custom request extractor** → `@User()`, `@Ip()`
* **Multitenancy** → `@Tenant()`
* **Logging** → `@Loggable()`
* **Validation layer** uchun meta belgilash

---

## ✅ Xulosa

| Narsa                    | Ma’nosi                                                              |
| ------------------------ | -------------------------------------------------------------------- |
| **Custom decorator**     | Siz o‘zingiz yozadigan maxsus decorator                              |
| **SetMetadata**          | Metadata qo‘shish uchun ishlatiladi                                  |
| **Reflector**            | Metadata’ni olish uchun ishlatiladi                                  |
| **createParamDecorator** | Request context bilan ishlovchi decorator yaratish uchun ishlatiladi |

