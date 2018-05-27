class CreateQuotes < ActiveRecord::Migration[5.2]
  def change
    create_table :quotes do |t|
      t.string :name, null: false
      t.date :quoted_at, null: false
      t.string :contact, null: false

      t.timestamps
    end
  end
end
