import { IsNumber, IsOptional, Max, Min } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class PaginationDTO {
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    @Max(100)
    @IsOptional()
    @Transform(({ value }) => (value ? Number(value) : 1)) // default: 1
    page: number = 1;

    @Type(() => Number)
    @IsNumber()
    @Min(1)
    @Max(100)
    @IsOptional()
    @Transform(({ value }) => (value ? Number(value) : 10)) // default: 10
    size: number = 10;
}
