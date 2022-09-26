import { FC, useState } from "react";

import AnotherComponent from "app/components/AnotherComponent";

type HelloWorldProps = {
  readonly name: string;
};

const HelloWorld: FC<HelloWorldProps> = ({ name: initialName }) => {
  const [name, setName] = useState(initialName);
  return (
    <div>
      <h3>Hello, {name}!</h3>
      <hr />
      <form>
        <label htmlFor="name">
          Say hello to:
          <input
            id="name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </label>
      </form>
      <AnotherComponent />
    </div>
  );
};

export default HelloWorld;
