class AddTimeStampToFriendshipTables < ActiveRecord::Migration[5.2]
  def change
    add_column :friendship_requests, :created_at, :datetime, null: false
    add_column :friendship_requests, :updated_at, :datetime, null: false

    add_column :friendships, :created_at, :datetime, null: false
    add_column :friendships, :updated_at, :datetime, null: false
  end
end
