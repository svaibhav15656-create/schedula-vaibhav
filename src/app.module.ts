import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, UsersModule],
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';
import { User } from './users/entities/user.entity';
import { DoctorProfile } from './doctor/entities/doctor-profile.entity';
import { PatientProfile } from './patient/entities/patient-profile.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST', 'localhost'),
        port: config.get<number>('DB_PORT', 5432),
        username: config.get<string>('DB_USERNAME', 'postgres'),
        password: config.get<string>('DB_PASSWORD', 'postgres'),
        database: config.get<string>('DB_NAME', 'schedula'),
        entities: [User, DoctorProfile, PatientProfile],
        migrations: [__dirname + '/database/migrations/*{.ts,.js}'],
        synchronize: false,
        migrationsRun: false,
      }),
    }),
    AuthModule,
    UsersModule,
    DoctorModule,
    PatientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
