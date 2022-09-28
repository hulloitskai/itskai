import ReactOnRails from 'react-on-rails';

import IndexHelloWorldPage from '../views/hello_world/components/IndexHelloWorldPage.tsx';
import AnotherComponent from '../views/shared/components/AnotherComponent.tsx';
import InputIcon from '../views/shared/components/InputIcon.tsx';
import Layout from '../views/shared/components/Layout.tsx';
import MantineProvider from '../views/shared/components/MantineProvider.tsx';

ReactOnRails.register({IndexHelloWorldPage,
AnotherComponent,
InputIcon,
Layout,
MantineProvider});
