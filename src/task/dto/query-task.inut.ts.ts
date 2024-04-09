import { IsOptional, IsInt, Min } from 'class-validator';

export class TaskQueryInput {
  @IsOptional()
  @IsInt()
  @Min(0)
  skip?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  take?: number;
}