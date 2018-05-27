class CreateQuoteDetails < ActiveRecord::Migration[5.2]
  def change
    create_table :quote_details do |t|
      t.string :category, null: false
      t.string :item_name, null: false
      t.integer :price, null: false
      t.integer :quantity, null: false
      t.references :quote, null: false, foreign_key: true

      t.timestamps
    end
  end
end
