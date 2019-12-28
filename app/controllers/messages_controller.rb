class MessagesController < ApplicationController
  def index
  end

  def create
  end

  private

  def create_message
    params.require(:message).permit(:body, :image)
  end
end
