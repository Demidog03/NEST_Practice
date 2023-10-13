import {ApiProperty} from "@nestjs/swagger";

export class BanUserDto {
    @ApiProperty({example: '2', description: 'Id of user'})
    readonly userId: number

    @ApiProperty({example: 'ADMIN', description: 'Ban reason'})
    readonly reason: string
}