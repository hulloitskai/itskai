# typed: strong

class Spoom::Poset
  E = type_member { { upper: Object } }

  class Element
    E = type_member { { upper: Object } }
  end
end
