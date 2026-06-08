import {
  IsString,
  IsNumber,
  IsOptional,
  IsObject,
  Min,
  Max,
  IsNotEmpty,
  IsIn,
} from 'class-validator';

export class CreatePatientProfileDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsNumber()
  @Min(0)
  @Max(150)
  age: number;

  @IsString()
  @IsIn(['Male', 'Female', 'Other'])
  gender: string;

  @IsString()
  @IsNotEmpty()
  contactNumber: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsObject()
  @IsOptional()
  basicHealthInfo?: Record<string, any>;
}
