import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../roles/roles.model';
import { UserRoles } from '../roles/user-roles.model';
import {User} from "../users/users.model";

interface PostCreationAttrs {
    title: string
    content: string
    userId: number
    image: string
}

@Table({tableName: 'posts'})
export class Post extends Model<Post, PostCreationAttrs> {
    @ApiProperty({example: 1, description: 'Unique ID'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example: 'Post title', description: 'Title of the post'})
    @Column({type: DataType.STRING})
    title: string

    @ApiProperty({example: 'Some content', description: 'Content of the post'})
    @Column({type: DataType.STRING})
    content: string

    @ApiProperty({example: 'Image name', description: 'Image name of the post'})
    @Column({type: DataType.STRING})
    image: string

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number

    @BelongsTo(() => User)
    author: User
}
