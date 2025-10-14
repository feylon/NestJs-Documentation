import { SetMetadata } from "@nestjs/common"

export const CustomDecorator = (roles: string[]) => {
    return SetMetadata("roles", roles);
}