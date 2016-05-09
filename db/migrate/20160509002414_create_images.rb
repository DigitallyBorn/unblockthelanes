class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.string :latitude
      t.string :longitude
      t.datetime :time
      t.references :email, index: true, foreign_key: true
    end
  end
end
