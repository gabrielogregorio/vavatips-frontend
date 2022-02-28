import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Tags } from '../components/widgets/tags';
import { ContextFilters } from '../core/contexts/filters';
import { useMemo, useState } from 'react';

export default {
  title: 'widgets/Tags',
  component: Tags,
} as ComponentMeta<typeof Tags>;

const Template: ComponentStory<typeof Tags> = (args) => {
  const [tags, setTags] = useState<string[]>(['Ascent', 'Raze', 'Atacante']);
  const [filters, setFilters] = useState<string[]>([]);

  const valueFilters = useMemo(() => ({ tags, filters, setTags, setFilters }), [tags, filters]);

  return (
    <ContextFilters.Provider value={valueFilters}>
      <Tags {...args} />
    </ContextFilters.Provider>
  );
};

export const Default = Template.bind({});
Default.args = {};
