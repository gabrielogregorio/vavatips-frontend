import React from 'react';
import { propsInterfaceTextArea } from '@/interfaces/textArea';
import GroupInput from '@/base/groupInput';
import LabelComponent from '@/base/label';

export default function TextArea({ title, setValue, value, name }: propsInterfaceTextArea) {
  return (
    <GroupInput>
      <LabelComponent name={name} text={title} aria-label="Escolha uma descrição" />

      <textarea
        className="w-full p-1.5 border-2 border-skin-secondary bg-skin-bgContainer outline-none rounded-lg resize-none text-skin-textColor"
        id={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </GroupInput>
  );
}
