import ReactOnRails from 'react-on-rails';

import HomePage from '../views/home/components/HomePage.tsx';
import ResumeEducationSection from '../views/resume/components/ResumeEducationSection.tsx';
import ResumePage from '../views/resume/components/ResumePage.tsx';
import ResumeSkillsSection from '../views/resume/components/ResumeSkillsSection.tsx';
import ResumeWorkSection from '../views/resume/components/ResumeWorkSection.tsx';
import ApolloProvider from '../views/shared/components/ApolloProvider.tsx';
import AppHeader from '../views/shared/components/AppHeader.tsx';
import AppLayout from '../views/shared/components/AppLayout.tsx';
import AppProviders from '../views/shared/components/AppProviders.tsx';
import MantineProvider from '../views/shared/components/MantineProvider.tsx';
import PageHeader from '../views/shared/components/PageHeader.tsx';
import ResumeButton from '../views/shared/components/ResumeButton.tsx';
import TestFeed from '../views/shared/components/TestFeed.tsx';
import TestForm from '../views/shared/components/TestForm.tsx';
import WebsiteBadge from '../views/shared/components/WebsiteBadge.tsx';
import TestPage from '../views/test/components/TestPage.tsx';
import WorkPage from '../views/work/components/WorkPage.tsx';

ReactOnRails.register({HomePage,
ResumeEducationSection,
ResumePage,
ResumeSkillsSection,
ResumeWorkSection,
ApolloProvider,
AppHeader,
AppLayout,
AppProviders,
MantineProvider,
PageHeader,
ResumeButton,
TestFeed,
TestForm,
WebsiteBadge,
TestPage,
WorkPage});
