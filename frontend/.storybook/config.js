import { configure, setAddon, addDecorator } from '@storybook/react';
import JSXAddon from 'storybook-addon-jsx';
import StoryRouter from 'storybook-react-router';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/assets/css/main.css';

addDecorator(StoryRouter());
setAddon(JSXAddon);
configure(require.context('../src', true, /\.stories\.tsx$/), module);