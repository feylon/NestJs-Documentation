import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';


@Injectable()
export class CustomPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        
        if (isNaN(parseFloat(value))) throw new BadRequestException("Raqam kiritilishi kerak");
        if (value < 0 || value > 10) throw new BadRequestException('Son oralig`i [0, 10] bo`lishi kerak')
        return value;

    }
}
