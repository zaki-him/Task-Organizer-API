import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator"

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  title: string

  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(500)
  description: string

  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean
}