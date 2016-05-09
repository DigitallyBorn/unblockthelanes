class AddAttachmentToEmails < ActiveRecord::Migration
  def self.up
    add_attachment :emails, :attachment
  end

  def self.down
    remove_attachment :emails, :attachment
  end
end
