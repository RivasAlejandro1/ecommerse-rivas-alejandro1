import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";




@Entity({ name: "files"})
export class Files {
    @PrimaryGeneratedColumn()
    id : string;

    @Column()
    name: string;

    @Column()
    mymeType: string;

    @Column({ type: "bytea"})
    data: Buffer;
    
}