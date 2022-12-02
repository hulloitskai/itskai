# typed: strict

class Thread::Mutex
  sig do
    type_parameters(:U).
      params(block: T.proc.returns(T.type_parameter(:U))).
      returns(T.type_parameter(:U))
  end
  def synchronize(&block)
  end
end
