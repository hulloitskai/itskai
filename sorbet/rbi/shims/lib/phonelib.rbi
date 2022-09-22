# typed: ignore

module Phonelib
  sig do
    params(phone: String, passed_country: T.nilable(T.any(String, Symbol)))
      .returns(Phone)
  end
  def self.parse(phone, passed_country = T.unsafe(nil)); end
end
