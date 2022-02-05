import React from 'react';
import { propsInterfaceTextArea } from '@/interfaces/textArea';
import GroupInput from './groupInput';

export default function TextArea({ title, setValue, value, name }: propsInterfaceTextArea) {
  return (
    <GroupInput>
      <label aria-label="Escolha uma descrição" htmlFor={name}>
        {title}
      </label>
      <textarea id={name} value={value} onChange={(e) => setValue(e.target.value)} />
    </GroupInput>
  );
}
