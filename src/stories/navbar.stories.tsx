import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Navbar } from '../components/layout/navbar';
import { navbarEnum } from '../core/enums/navbar';
import { modelNavbarAdmin, modelNavbarPublic } from '../core/schemas/navbar';

export default {
  component: Navbar,
  title: 'layouts/Navbar',
} as ComponentMeta<typeof Navbar>;

const Template: ComponentStory<typeof Navbar> = (args) => <Navbar {...args} />;

export const Admin = Template.bind({});
Admin.args = {
  modelNavbar: modelNavbarAdmin,
  selected: navbarEnum.Dashboard,
};

export const Public = Template.bind({});
Public.args = {
  modelNavbar: modelNavbarPublic,
  selected: navbarEnum.Posts,
};
