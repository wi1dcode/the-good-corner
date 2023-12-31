import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Ad from "./Ad.entity";

@Entity()
class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Ad, (a) => a.category)
  ads: Ad[];
}
export default Category;