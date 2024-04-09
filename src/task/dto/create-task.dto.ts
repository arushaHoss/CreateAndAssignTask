import { IsArray, ArrayMinSize, IsDateString, IsInt, IsOptional, IsString, ValidateNested, ArrayNotEmpty, ArrayUnique } from 'class-validator';


export class CreateTaskDto {
  @IsString()
  description: string;

  @IsDateString()
  @IsOptional()
  due_date?: string;

  @IsArray()
  @IsOptional()
  @ArrayNotEmpty()
  userIds?: number[];

  @IsString()
  @IsOptional()
  status?: string;

}


