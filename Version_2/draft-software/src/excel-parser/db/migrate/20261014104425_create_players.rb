class CreatePlayers < ActiveRecord::Migration[8.1]
  def change
    create_table :players do |t|
      t.string :player_id
      t.string :name
      t.integer :salary

      t.timestamps
    end
  end
end
