class ImageMailer < ApplicationMailer
  def success_email(email)
    @email = email
    mail(to: @email, subject: 'success')
  end
  
  def fail_email(email)
    @email = email
    mail(to: @email, subject: 'fail')
  end
end
