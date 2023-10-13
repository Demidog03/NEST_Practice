import {ApiProperty} from "@nestjs/swagger";

export class CreatePostDto {
    @ApiProperty({example: 'Post title', description: 'Title of the post'})
    readonly title: string
    @ApiProperty({example: 'Post content', description: 'Content of the post'})
    readonly content: string
    @ApiProperty({example: 2, description: 'Id of the author user'})
    readonly userId: number
}