import { SetMetadata } from "@nestjs/common"

export const MyDecorator = (roles: string[]) => {
    return SetMetadata("roles", roles);
}