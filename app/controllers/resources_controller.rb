class ResourcesController < ApplicationController
  def index
    @images = Image.all
  end
end