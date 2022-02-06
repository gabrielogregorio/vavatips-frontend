import React from 'react';
import { propsInterfaceTextArea } from '@/interfaces/textArea';
import GroupInput from './groupInput';
import LabelComponent from './label';

// width: 100%;
//     padding: 5px;
//     border: 2px solid var(--secondary);
//     color: var(--text-color-bold);
//     background-color: var(--background-secondary);
//     outline: none;
//     border-radius: 10px;
//     resize: none;

export default function TextArea({ title, setValue, value, name }: propsInterfaceTextArea) {
  return (
    <GroupInput>
      <LabelComponent name={name} text={title} aria-label="Escolha uma descrição" />

      <textarea
        className="w-full p-1.5 border-2 border-skin-secondary bg-skin-backgroundSecondary outline-none rounded-lg resize-none text-skin-textColor"
        id={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </GroupInput>
  );
}
