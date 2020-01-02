FactoryBot.define do

  factory :message do
    body {Faker::Lorem.sentence}
    image {File.open("#{Rails.root}/public/uploads/message/image/IMG_1729.jpeg")}
    user
    group
  end

end