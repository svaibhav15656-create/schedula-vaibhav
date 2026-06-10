import {
  IsString,
  IsNumber,
  IsOptional,
  IsObject,
  Min,
  IsNotEmpty,
} from 'class-validator';

export class CreateDoctorProfileDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  specialization: string;

  @IsNumber()
  @Min(0)
  experience: number;

  @IsString()
  @IsNotEmpty()
  qualification: string;

  @IsNumber()
  @Min(0)
  consultationFee: number;

  @IsObject()
  @IsOptional()
  availabilityHours?: Record<string, any>;

  @IsString()
  @IsOptional()
  profileDetails?: string;
}
