import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Navbar } from '../components/layout/navbar';
import { navbarEnum } from '../core/enums/navbar';
import { modelNavbarAdmin, modelNavbarPublic } from '../core/schemas/navbar';

export default {
  title: 'layouts/Navbar',
  component: Navbar,
} as ComponentMeta<typeof Navbar>;

const Template: ComponentStory<typeof Navbar> = (args) => <Navbar {...args} />;

export const Admin = Template.bind({});
Admin.args = {
  selected: navbarEnum.Dashboard,
  modelNavbar: modelNavbarAdmin,
};

export const Public = Template.bind({});
Public.args = {
  selected: navbarEnum.Posts,
  modelNavbar: modelNavbarPublic,
};
