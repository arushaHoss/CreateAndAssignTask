import { IsArray, ArrayMinSize, IsDateString, IsInt, IsOptional, IsString, ValidateNested, ArrayNotEmpty, ArrayUnique } from 'class-validator';


export class UpdateTaskDto {
  
  @IsInt()
  id!: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  @IsOptional()
  due_date?: string;

  @IsString()
  @IsOptional()
  status?: string;

}


