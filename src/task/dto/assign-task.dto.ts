import { IsArray, ArrayMinSize, IsDateString, IsInt, IsOptional, IsString, ValidateNested, ArrayNotEmpty, ArrayUnique } from 'class-validator';


export class AssignTaskDto {
  @IsString()
  taskId: number;

  @IsArray()
  @IsOptional()
  @ArrayNotEmpty()
  userIds?: number[];

}


