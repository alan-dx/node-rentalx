import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCars1675475266443 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cars',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'daily_rate',
            type: 'numeric',
          },
          {
            name: 'available',
            type: 'boolean',
            default: true,
          },
          {
            name: 'license_plate',
            type: 'varchar',
          },
          {
            name: 'fine_amount',
            type: 'numeric',
          },
          {
            name: 'brand',
            type: 'varchar',
          },
          {
            name: 'category_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'FKCategoryCar', // Nome representativo da relacao
            referencedTableName: 'categories', // Nome da tabela PAI (ou tabela referenciada)
            referencedColumnNames: ['id'], // Coluna da tabela referenciada que armazena o valor que foi salvo na FK
            columnNames: ['category_id'], // Nome da coluna na tabela FILHO que vai armazenar o valor da FK
            onDelete: 'SET NULL', // Defina a coluna para null quando caso a referencia seja removida
            onUpdate: 'SET NULL', // Defina a coluna para null quando caso a referencia seja removida
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cars');
  }
}
