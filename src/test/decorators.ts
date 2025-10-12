import { SetMetadata } from "@nestjs/common"

export const AllowAnonyms = ()=>{
    return SetMetadata('isPublic', true)
}