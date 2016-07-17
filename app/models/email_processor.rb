class EmailProcessor
  def initialize(email)
    @email = email
  end
  def process
    puts 'email!!! ' + @email.from
    new_email = Email.new
    new_email.body = @email.body
    new_email.email = @email.from
    new_email.subject = @email.subject
    if new_email.save
      image_successful = false
      @email.attachments.each do |attachment|
        image = Image.new
        image.email_id = new_email.id
        image.file = attachment
        if (image.save)
          image_successful = true
        end
      end
      if image_successful
        ImageMailer.success_email(@email.from).deliver_later
      else
        ImageMailer.fail_email(@email.from).deliver_later
      end
    end
  end
end