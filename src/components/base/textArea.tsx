import React from 'react';
import { propsInterfaceTextArea } from '@/interfaces/textArea';

export default function TextArea({ title, setValue, value, name }: propsInterfaceTextArea) {
  return (
    <div className="groupInput">
      <div className="groupInputSelect">
        <label aria-label="Escolha uma descrição" htmlFor={name}>
          {title}
        </label>
        <textarea id={name} value={value} onChange={(e) => setValue(e.target.value)} />
      </div>
    </div>
  );
}
