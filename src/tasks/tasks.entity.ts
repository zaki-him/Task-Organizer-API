import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity() // An entity is a class that represent a table in DB
export class Task {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column({ nullable: true }) // nullable = true <=> description is optional
  description: string

  @Column({ default: false })
  isCompleted: boolean
}