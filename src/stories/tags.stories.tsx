import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useMemo, useState } from 'react';
import { Tags } from '../components/widgets/tags';
import { ContextFilters } from '../core/contexts/filters';

export default {
  component: Tags,
  title: 'widgets/Tags',
} as ComponentMeta<typeof Tags>;

const Template: ComponentStory<typeof Tags> = (args) => {
  const [tags, setTags] = useState<string[]>(['Ascent', 'Raze', 'Atacante']);
  const [filters, setFilters] = useState<string[]>([]);

  const valueFilters = useMemo(() => ({ filters, setFilters, setTags, tags }), [tags, filters]);

  return (
    <ContextFilters.Provider value={valueFilters}>
      <Tags {...args} />
    </ContextFilters.Provider>
  );
};

export const Default = Template.bind({});
Default.args = {};
