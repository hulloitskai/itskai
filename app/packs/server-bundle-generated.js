import ReactOnRails from 'react-on-rails';

import HomePage from '../views/home/components/HomePage.tsx';
import ApolloProvider from '../views/shared/components/ApolloProvider.tsx';
import MantineProvider from '../views/shared/components/MantineProvider.tsx';
import Providers from '../views/shared/components/Providers.tsx';
import TestFeed from '../views/shared/components/TestFeed.tsx';
import TestForm from '../views/shared/components/TestForm.tsx';

ReactOnRails.register({HomePage,
ApolloProvider,
MantineProvider,
Providers,
TestFeed,
TestForm});
