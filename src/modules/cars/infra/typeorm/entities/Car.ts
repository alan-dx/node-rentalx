import {
  Column,
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { Category } from './Category';
import { Specification } from './Specification';

@Entity('cars') // Criando a entidade que vai representar a tabela cars
class Car {
  @PrimaryColumn() // Pk
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  daily_rate: number;

  @Column()
  available: boolean;

  @Column()
  license_plate: string;

  @Column()
  fine_amount: number;

  @Column()
  brand: string;

  @ManyToOne(() => Category) // Indicando o tipo de relacionamento
  @JoinColumn({ name: 'category_id' }) // Indicando qual coluna dessa tabela eh a FK
  category: Category; // Referenciando a Entity target (como a Entity eh a representante da tabela, a partir dela determina-se a tabela alvo)

  @Column()
  category_id: string;

  @ManyToMany(() => Specification) // Isso aqui constroi o relacionamento many to many >>>
  @JoinTable({
    name: 'specifications_cars',
    joinColumns: [{ name: 'car_id' }], // Nome da coluna (na tabela de relacionamentos) que armazena a FK que aponta para ESTE model (Car)
    inverseJoinColumns: [{ name: 'specification_id' }], // Nome da coluna (na tabela de relacionamentos) que armazena a FK que aponta para a outra tabela
  })
  specifications: Specification[];

  @CreateDateColumn() // Seta pra data atual por default
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
      this.available = true;
    }
  }
}

export { Car };
