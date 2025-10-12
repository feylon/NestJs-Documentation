import { BODYDTO } from "./DTO";
import {OmitType, PartialType} from "@nestjs/mapped-types"

export class UpdateUserDTO extends  PartialType(OmitType(BODYDTO, ['password'])){}