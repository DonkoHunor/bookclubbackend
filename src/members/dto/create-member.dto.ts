import { IsDate, IsDateString, IsEnum, IsOptional, IsString } from "class-validator"

export enum Gender {
    M,
    F
}

export class CreateMemberDto {
    @IsString()
    name: string

    @IsOptional()
    @IsEnum(Gender)
    gender: 'M' | 'F' | null
    
    @IsDateString()    
    birth_date: string
}
