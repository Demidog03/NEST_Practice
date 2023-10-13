import {ApiProperty} from "@nestjs/swagger";

export class AssignRoleDto {
    @ApiProperty({example: 'ADMIN', description: 'Role to assign'})
    readonly value: string

    @ApiProperty({example: '2', description: 'Id of user'})
    readonly userId: number
}