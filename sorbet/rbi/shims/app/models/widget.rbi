# typed: strong

class Widget
  sig do
    returns(
      T.nilable(
        T.any(TextWidgetVariant, ListWidgetVariant, ItineraryWidgetVariant),
      ),
    )
  end
  def variant; end
end
